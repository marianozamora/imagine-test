import fs from "fs";
import sgMail from "@sendgrid/mail";
import { renderToStream } from "@react-pdf/renderer";
import { InventoryPDF } from "../../utils/SendEmail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
	const { email, data, name } = req.body;

	try {
		const stream = await renderToStream(
			<InventoryPDF inventoryData={data} name={name} />
		);
		const chunks = [];
		stream.on("data", (chunk) => chunks.push(chunk));
		stream.on("end", async () => {
			const pdfBuffer = Buffer.concat(chunks);
			const base64PDF = pdfBuffer.toString("base64");

			const msg = {
				to: email,
				from: "mariano@maaar.io",
				subject: `Sending Inventory PDF | Company: ${name}`,
				text: "Best Inventory PDF in town! You can find any product here!",
				html: "Good Opportunity to buy something</strong></br>",
				attachments: [
					{
						content: base64PDF,
						filename: `inventory-${name}.pdf`,
						type: "application/pdf",
						disposition: "attachment",
					},
				],
			};

			await sgMail.send(msg);
			console.log("Email sent");
			res.status(200).json({ status: "Ok" });
		});
	} catch (error) {
		res.status(500).json({
			error: "An error occurred while sending the email",
		});
	}
};

export default handler;
