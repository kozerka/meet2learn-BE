import createTransporter from '../config/mailTransporter.js';
import registerGreetingTemplate from '../templates/registerGreetingTemplate.js';

export const registerGreetingService = async (email, name) => {
	const transporter = createTransporter();
	const htmlContent = registerGreetingTemplate(name);
	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: email,
		subject: 'Welcome to Meet2Learn!',
		html: htmlContent,
	};

	await transporter.sendMail(mailOptions);
};
