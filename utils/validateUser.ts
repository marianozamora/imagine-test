import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

interface User {
	username: string;
	password: string;
}

export async function validateUser(username: string, password: string) {
	// Fetch user from your database or any other data source
	const user = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});

	// Check if user exists (if not, throw an AuthenticationError)



	if (user) {
		// Compare the provided password with the hashed password
		const isValidPassword = bcrypt.compare(password, user.password);
		if (await isValidPassword) {
			// Passwords match, return the user object
			return user;
		}
	}

	// Invalid username or password, return null
	return null;
}
