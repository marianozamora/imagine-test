//send email with pdf and sendgrid
const sgMail = require("@sendgrid/mail");
const { renderToFile, Document, Page, Text } = require("@react-pdf/renderer");

import { InventoryPDF} from "../../utils/SendEmail";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
	const { email, data, name } = req.body;
	await renderToFile(<InventoryPDF  inventoryData={data} name={name} />, 'output.pdf');
    const pdfBuffer = fs.readFileSync('output.pdf');
    const base64PDF = pdfBuffer.toString('base64');
    // You can now use the base64PDF variable as needed
    fs.unlinkSync('output.pdf');

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

	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});

	res.status(200).json({
		status: "Ok",
	});
};

export default handler;
