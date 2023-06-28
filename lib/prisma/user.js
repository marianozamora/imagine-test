//import { data } from "autoprefixer";
import prisma from ".";
import bcrypt from 'bcrypt';


export async function createUser(user) {
	const { password, username, email } = user;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const userFromDB = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
				email,
			},
			include: {
				profile: true,
			},
		});
		return { user: userFromDB };
	} catch (error) {
		if (error.code === "P2002") {
			return { error: "Username/Email already exists" };
		}
		return { error };
	}
}
