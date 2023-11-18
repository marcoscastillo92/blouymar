require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (text) => {
	const from = process.env.FROM;
	const to = process.env.TO;
	const subject = 'Invitación a la boda de Lourdes y Marcos';

	try {
		let transporter = nodemailer.createTransport({
			host: 'smtp-relay.brevo.com',
			port: 587,
			auth: {
				user: process.env.FROM,
				pass: process.env.PASS
			}
		});

		let info = await transporter.sendMail({
			from: from,
			to: to,
			subject: subject,
			text: text,
			attachments: [
				{
					filename: 'invitacion.csv',
					content: text,
					contentType: 'text/csv'
				}
			]
		});

		console.log(`Message sent: ${info.messageId}`);
		return `Message sent: ${info.messageId}`;
	} catch (error) {
		throw new Error(
			`Something went wrong in the sendmail method. Error: ${error.message}`
		);
	}
};

module.exports = sendEmail;
