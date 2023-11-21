import nodemailer from 'nodemailer';

const createTransporter = () => {
	return nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PASS,
		},
	});
};

export default createTransporter;
