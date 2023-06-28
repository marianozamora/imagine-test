
import { createUser } from '../../../lib/prisma/user'

const handler = async (req, res) => {

	try {
			if (req.method === "POST") {
				try {
					const user = req.body;
					const savedUser = await createUser(user);
					if (error) throw new Error(error);
					return res.status(200).json({ user: savedUser });
				} catch (error) {
					return res.status(500).json({ error: error.message });
				}
			}

	} catch (error) {
		return res.status(500).json({ error: error.message });
	}

	res.setHeader("Allow", ["POST"]);
	res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;

