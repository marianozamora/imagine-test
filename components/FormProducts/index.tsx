import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const FormProducts = ({data}:any) => {
	const schema = yup
		.object({
			description: yup.string(),
			name: yup.string().required(),
			quantity: yup.number(),
			price: yup.number().required(),
		})
		.required();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm({
		resolver: yupResolver(schema),

		// mode: "all",
	});

	const router = useRouter();
	const { type, id } = router.query;
	const [companyID, setCompanyID] = useState(id);

	useEffect(() => {
		setCompanyID(id as string);
	}, [companyID]);



	useEffect(() => {
		let defaultValues = {} as any;
		if (type==="edit" && data) {
			defaultValues.description = data.description;
			defaultValues.name = data.name;
			defaultValues.quantity = data.quantity;
			defaultValues.price = data.price;
		}

		reset({ ...defaultValues });
	}, [data]);

	const sendData = async (data: any) => {
		const { inventoryId, productId } = router.query;

		const urlValidation = productId ? `/api/products/${productId}?inventoryId=${inventoryId}` : `/api/products/?inventoryId=${inventoryId}`;

		const sendData = await fetch(urlValidation, {
			method: type === 'edit' ? "PUT" : "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await sendData.json();

		if (response.error) {
			return;
		}
		router.push(`/company/${router.query.id}`);



	};
	return (
		<>
			<form onSubmit={handleSubmit((data) => sendData(data))}>
				<div className="grid  gap-6 w-full mb-8">
					<div className="col-span-6 sm:col-span-6">
						<FormField error={errors.name?.message} label="Nombre">
							<Input {...register("name")} />
						</FormField>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<FormField error={errors.quantity?.message} label="Cantidad">
							<Input {...register("quantity")}
								type="number"
							/>

						</FormField>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<FormField
							error={errors.description?.message}
							label="Descripción"
						>
							<Input {...register("description")} />
						</FormField>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<FormField
							error={errors.price?.message}
							label="Precio"
						>
							<Input {...register("price")} type="number" />
						</FormField>
					</div>
				</div>
				<Button
					isDisabled={Object.keys(errors).length > 0}
					type="submit"
					colorScheme="blue"
				>
					{type === 'edit' ? "Actualizar" : "Crear"}
				</Button>
			</form>
		</>
	);
};

export default FormProducts;
