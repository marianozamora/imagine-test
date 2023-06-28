import { getCompanyById, deleteCompany, updateCompany } from "../../../../lib/prisma/company";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
	try {
		const session = await getServerSession(req, res, authOptions);
		if (session) {
			if (req.method === "GET") {

				try {
					const id = req.query.id;
					const { company, error } = await getCompanyById(id);
					if (error) throw new Error('Error',error);
					return res.status(200).json({ company });
				} catch (error) {
					return res.status(500).json({ error: '500' });
				}
			}
			if (req.method === "DELETE") {

				try {
					const id = req.query.id;
					const { company, error } = await deleteCompany(id);
					if (error) throw new Error('Error',error);
					return res.status(200).json({ company });
				} catch (error) {
					return res.status(500).json({ error: '500' });
				}
			}
		} else {
			res.status(401).end("Access Denied");
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
	res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'])
	res.status(425).end(`Method ${req.method} is not allowed.`)
}
