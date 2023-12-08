import createTransporter from '../config/mailTransporter.js';
import resetPasswordTemplate from '../templates/resetPasswordTemplate.js';
export const resetPasswordService = async (email, token) => {
	const transporter = createTransporter();
	const htmlContent = resetPasswordTemplate(email, token);
	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: email,
		subject: 'Reset password to meet2learn service',
		html: htmlContent,
	};

	await transporter.sendMail(mailOptions);
};
