import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

const theme = extendTheme({
	components: {
	},
});

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	if (["/login"].includes(router.pathname)) {
		return (
			<ChakraProvider theme={theme}>
					<Component {...pageProps} />
			</ChakraProvider>
		);
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
