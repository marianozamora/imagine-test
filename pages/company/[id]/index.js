import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardGeneral from "../../../components/Card";
import { Button, Input, Heading, SimpleGrid } from "@chakra-ui/react";
import { FormField } from "../../../components/FormField";
import { DownloadButton, PDFDownload } from "../../../utils/SendEmail";
import { textToCapitalize } from "../../../utils/customFn";
import { getSession } from "next-auth/react";

const DetailCompany = () => {
	const router = useRouter();
	const [company, setCompany] = useState({});
	const [inventory, setInventory] = useState({});
	const [values, setValues] = useState({
		email: "",
	});

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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<div>
			<h1 className="mt-10">Detail Company</h1>
			{
				company && (
					<Heading className="mb-4">
				{textToCapitalize(company.name || "")}
			</Heading>

				)
			}


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
			{	company.inventory &&
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
					<form
					onSubmit={async (event) => {
						event.preventDefault();
						const mixData = Object.assign(
							{},
							{
								data: company.inventory.product,
								name: company.name,
							},
							values
						);
						const data = await fetch("/api/mail", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(mixData),
						});

						const response = await data.json();
					}}
				>
					<FormField>
						<label htmlFor="name">Send Inventory via Email</label>
						<Input
							type="text"
							id="email"
							name="email"
							className="mt-3 mb-3 block w-full"
							placeholder="Email"
							onChange={handleChange}
							value={values.email}
						/>
					</FormField>
					<Button type="submit">Send Inventory</Button>
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
		</div>
	);
};

export default DetailCompany;

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
}
