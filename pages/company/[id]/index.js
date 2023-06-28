import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardGeneral from "../../../components/Card";
import {
	Alert,
	AlertIcon,
	Button, Input, Heading, SimpleGrid
} from "@chakra-ui/react";
import { FormField } from "../../../components/FormField";
import { DownloadButton, PDFDownload } from "../../../utils/SendEmail";
import { textToCapitalize } from "../../../utils/customFn";
import { getSession, useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import * as yup from "yup";

const validateEmail = (email) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

const DetailCompany = () => {
	const router = useRouter();
	const [company, setCompany] = useState({});

	const [showAlert, setShowAlert] = useState(false);

	const { data: session } = useSession();

	const { id } = router.query;
	useEffect(() => {
		if (!id) return;
		const getCompany = async () => {
			const response = await fetch(`/api/companies/${id}`);
			const data = await response.json();
			setCompany(data.company);
		};
		getCompany();
	}, [id]);

	const schema = yup.object().shape({
		emailToSend: yup
			.string()
			.required("Email is required")
			.test("email", "Email is not valid", (value) => {
				return validateEmail(value);
			}),
	});

	useEffect(() => {
		if (showAlert) {
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
		}
	}, [showAlert]);



	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			emailToSend: "mariano@maaar.io",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async () => {
		const values = getValues();
		debugger;
		const mixData = Object.assign(
			{},
			{
				data: company.inventory.product,
				name: company.name,
			},
			{ email: values.emailToSend }
		);
		const data = await fetch("/api/mail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(mixData),
		});

		const response = await data.json();
		setShowAlert(true);
		setValue("emailToSend", "");
	};

	return (
		<div>
			<h1 className="mt-10">Detail Company</h1>
			{company && (
				<Heading className="mb-4">
					{textToCapitalize(company.name || "")}
				</Heading>
			)}

			{session?.role === "ADMIN" ? (
				<Button
					className="mr-4"
					onClick={() => {
						router.push(
							`/company/${id}/product/form?type=create&&inventoryId=${company.inventory.id}`
						);
					}}
				>
					Agregar Producto
				</Button>
			) : null}

			{company.inventory &&
				company.inventory.product &&
				company.inventory.product.length > 0 && (
					<PDFDownload
						name={company.name || ""}
						data={company.inventory.product || []}
					></PDFDownload>
				)}

			{company.inventory &&
				company.inventory.product &&
				company.inventory.product.length > 0 && (
					<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
						<FormField
							error={errors.emailToSend?.message}
							label="Send Email to"
						>
							<Input {...register("emailToSend")} />
						</FormField>

						{getValues().emailToSend && (
							<Button
								className="mt-4"
								isDisabled={errors.emailToSend?.message}
								type="submit"
							>
								Send Inventory
							</Button>
						)}
					</form>
				)}

			<SimpleGrid
				spacing={4}
				templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
			>
				{company &&
					company.inventory &&
					company.inventory.product.map((product) => (
						<CardGeneral
							key={product.id}
							data={product}
							methods={{
								delete: async (id) => {
									const response = await fetch(
										`/api/products/${id}`,
										{
											method: "DELETE",
										}
									);
									const data = await response.json();
									router.reload();
								},
								update: async (id) => {
									router.push(
										`/company/${company.nit}/product/form?type=edit&&productId=${product.id}&&inventoryId=${company.inventory.id}`
									);
								},
							}}
						/>
					))}
			</SimpleGrid>
			{showAlert && (
				<Alert
					position={"fixed"}
					width={'30%'}
					bottom={5}
					right={5}
					className="fixed bottom-0 right-0"
					status="success">
							<AlertIcon />
							Email sent successfully
						</Alert>
							)}

		</div>
	);
};

export default DetailCompany;

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
};
