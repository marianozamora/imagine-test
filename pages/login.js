import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
} from "@chakra-ui/react";

import { FormField } from "../components/FormField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {

	const schema = yup.object().shape({
		username: yup.string().required(),
		// email: yup.string().email().required(),
		password: yup.string().required(),
	});

	const { getValues, register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	const router = useRouter();



	const sendLogin = async () => {
		const dataToSend = getValues();
		const data = await signIn("credentials", {
			redirect: false,
			username: dataToSend.username,
			password: dataToSend.password,
		});
		console.log(data);

		router.push("/");


	}
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			minHeight="100vh"
			padding={4}
		>
			<Box width="sm">
				<Heading as="h2" size="xl" textAlign="center" marginBottom={6}>
					Login
				</Heading>
				<form
					onSubmit={handleSubmit(sendLogin)}
				>
					<Stack spacing={4}>
						<FormField error={errors.username?.message} label="Username">
							<Input {...register("username")}
							/>

						</FormField>
						<FormField error={errors.password?.message} label="Password">
							<Input {...register("password")}
								type="password"
							/>

						</FormField>
						<Button colorScheme="blue" type="submit">
							Login
						</Button>
					</Stack>
				</form>
			</Box>
		</Box>
	);
};

