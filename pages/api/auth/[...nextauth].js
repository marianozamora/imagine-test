import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { validateUser } from "../../../utils/validateUser";

const prisma = new PrismaClient();

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "admin" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const user = await validateUser(credentials.username, credentials.password);
				if (user) {
					return user;
				} else {
					return null;
				}


			},

		}),
	],
	theme: {
		colorScheme: "dark",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			session.id = token.id;
			session.role = token.role;
			session.username = token.username;
			return session;
		},

	},
	secret: process.env.NEXTAUTH_SECRET,
	jwt: {
		encryption: true,
		secret: "test"
	},
	pages: {
		signIn: "/login",
	}
};

export default NextAuth(authOptions);
