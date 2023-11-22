import { sendThankYouEmail } from '../services/mailService.js';

export const sendContactForm = async (req, res) => {
	const { email, username, messageTitle, messageBody } = req.body;

	try {
		await sendThankYouEmail(email, username, messageTitle, messageBody);
		res.status(200).json({ message: 'Thank you for contacting us!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error sending email' });
	}
};

