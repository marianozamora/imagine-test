import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FormCompany = ({data}:any) => {
	const schema = yup
		.object({
			address: yup.string(),
			name: yup.string().required(),
			phone: yup.string(),
			nit: yup.string().required(),
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
	const {type} =  router.query;


	useEffect(() => {
		let defaultValues = {} as any;
		if (type==="edit" && data) {
			defaultValues.address = data.address;
			defaultValues.name = data.name;
			defaultValues.phone = data.phone;
			defaultValues.nit = data.nit;
		}

		reset({ ...defaultValues });
	}, [data]);

	const sendData =  async (data:any) => {
		const sendData = await fetch("/api/companies", {
			method: type === 'edit' ? "PUT" : "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await sendData.json();
		router.push("/");


	};
	return (
		<>
			<form onSubmit={handleSubmit((data) => sendData(data))}>
				<div className="grid  gap-6 w-full mb-8">
					<div className="col-span-6 sm:col-span-6">
						<FormField error={errors.nit?.message} label="NIT">
							<Input {...register("nit")} disabled={type==='edit'} />
						</FormField>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<FormField error={errors.name?.message} label="Nombre">
							<Input {...register("name")} />
						</FormField>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<FormField
							error={errors.address?.message}
							label="Direccion"
						>
							<Input {...register("address")} />
						</FormField>
					</div>
					<div className="col-span-6 sm:col-span-6">
						<FormField
							error={errors.phone?.message}
							label="Telefono"
						>
							<Input {...register("phone")} type="number" />
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

export default FormCompany;
