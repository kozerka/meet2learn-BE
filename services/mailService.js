import createTransporter from '../config/mailTransporter.js';
import contactFormTemplate from '../templates/contactFormTemplate.js';

export const sendThankYouEmail = async (
	email,
	username,
	messageTitle,
	messageBody
) => {
	const transporter = createTransporter();
	const htmlContent = contactFormTemplate(username, messageTitle, messageBody);

	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: email,
		subject: 'Thank You for Contacting Us',
		html: htmlContent,
	};

	await transporter.sendMail(mailOptions);
};
