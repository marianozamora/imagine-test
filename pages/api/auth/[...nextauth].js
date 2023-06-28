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
	callback: {
		async jwt(token, user, account, profile, isNewUser) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session(session, token) {
			session.id = token.id;
			return session;
		},
		async signIn(token, account, profile) {
			return true;
		}
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
