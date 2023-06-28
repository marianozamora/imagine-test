import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useRouter } from "next/router";

const theme = extendTheme({
	components: {
	},
});

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	if ([`/register`, "/login"].includes(router.pathname)) {
		return <Component {...pageProps} />;
	}
	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<DashboardLayout>
					<Component {...pageProps} />
				</DashboardLayout>
			</ChakraProvider>
		</SessionProvider>
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	console.log(session);
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
