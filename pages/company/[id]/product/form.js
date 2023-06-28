import React from "react";
import { Container } from "@chakra-ui/react";
import FormProduct from "../../../../components/FormProducts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	getSession
} from "next-auth/react";
const FormWithProduct = () => {
	const router = useRouter();
	const { type, id, productId } = router.query;
	const [product, setCompany] = useState({});
	useEffect(() => {
		const getProduct = async () => {
			const response = await fetch(`/api/products/${productId}`);
			const data = await response.json();
			setCompany(data.product);
		};
		if (type === 'edit' && productId) {
			getProduct();

		}

	},[productId]);
	return (
		<Container maxW='2xl' className="mt-10">
			<h1
				className="mb-4 weight-bol"
			>{`${type ? type.toUpperCase() : ''}`} product</h1>
			<FormProduct data={product}>

			</FormProduct>
		</Container>
	);
};

export default FormWithProduct;

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
