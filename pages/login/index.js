import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	HStack,
	Checkbox,
	Divider,
	Container,
} from "@chakra-ui/react";

import { FormField } from "../../components/FormField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
	const schema = yup.object().shape({
		username: yup.string().required(),
		password: yup.string().required(),
	});

	const {
		getValues,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
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

		router.push("/");
	};

	return (
		<Container
			maxW="lg"
			py={{ base: "12", md: "24" }}
			px={{ base: "0", sm: "8" }}
		>
			<Stack spacing="8">
				<Stack spacing="6">
					<Stack spacing={{ base: "2", md: "3" }} textAlign="center">
						<Heading size={{ base: "xs", md: "sm" }}>
							Log in to your account
						</Heading>
					</Stack>
				</Stack>
				<Box
					py={{ base: "0", sm: "8" }}
					px={{ base: "4", sm: "10" }}
					bg={{ base: "transparent", sm: "bg.surface" }}
					boxShadow={{ base: "none", sm: "md" }}
					borderRadius={{ base: "none", sm: "xl" }}
				>
					<Stack spacing="6">
						<form onSubmit={handleSubmit(sendLogin)}>
							<div className="grid  gap-6 w-full mb-8">
								<div className="col-span-6 sm:col-span-6">
									<FormField
										error={errors.username?.message}
										label="Username"
									>
										<Input {...register("username")} />
									</FormField>
								</div>
								<div className="col-span-6 sm:col-span-6">
									<FormField
										error={errors.password?.message}
										label="Password"
									>
										<Input
											{...register("password")}
											type="password"
										/>
									</FormField>
								</div>

								<Button
									className="bg-blue-500 center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									colorScheme="blue"
									type="submit"
									alignContent={"center"}
								>
									Sign In
								</Button>
							</div>
						</form>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
	// return (
	// 	<Box
	// 		display="flex"
	// 		flexDirection="column"
	// 		alignItems="center"
	// 		justifyContent="center"
	// 		minHeight="100vh"
	// 		padding={4}
	// 	>
	// 		<Box
	// 			backgroundColor="white"
	// 			borderRadius="lg"
	// 			boxShadow="lg"
	// 			m={4}
	// 			p={4}
	// 			w="full"
	// 			maxW="500px"
	// 		>
	// 			<Heading
	// 				className="font-bold text-3xl text-center mb-8"
	// 				as="h2" size="xl" textAlign="center" marginBottom={6}>
	// 				Login
	// 			</Heading>

	// 		</Box>
	// 	</Box>
	// );
}
