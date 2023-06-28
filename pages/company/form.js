import React from "react";
import { Container } from "@chakra-ui/react";
import FormCompany from "../../components/FormCompany";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const FormWithCompany = () => {
	const router = useRouter();
	const { type, id } = router.query;
	const [company, setCompany] = useState({});
	useEffect(() => {
		const getCompany = async () => {
			const response = await fetch(`/api/companies/${id}`);
			const data = await response.json();
			setCompany(data.company);
		};
		getCompany();

	},[id]);
	return (
		<Container maxW={'container.sm'} className="mt-10">
			<h1
				className="mb-4 weight-bol"
			>{`${type ? type.toUpperCase() : ''}`} COMPANY</h1>
			<FormCompany data={company}>

			</FormCompany>
		</Container>
	);
};

export default FormWithCompany;

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
