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
				subject: "Sending with Twilio SendGrid is Fun",
				text: "and easy to do anywhere, even with Node.js",
				html: "<strong>and easy to do anywhere, even with Node.js</strong></br>",
				attachments: [
					{
						content: base64PDF,
						filename: "inventory.pdf",
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
		console.error(error);
		res.status(500).json({
			error: "An error occurred while sending the email",
		});
	}
};

export default handler;
