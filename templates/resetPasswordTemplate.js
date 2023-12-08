const resetPasswordTemplate = (email, token) => {
	const resetLink = `http://localhost:3000/finalize-reset-password?token=${token}`;

	return `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Reset Your Meet2Learn Password</h2>
            <p>We received a request to reset the password for your Meet2Learn account associated with ${email}.</p>
            <p>If you did not make this request, please ignore this email. No changes have been made to your account.</p>
            <p>To reset your password, click on the following link:</p>
            <a href="${resetLink}" style="color: #067df7;">Reset Password</a>
            <p>If you have any questions or did not request a password reset, we encourage you to reach out to us via the contact form on our website.</p>
            <p>Best regards,<br/>Meet2Learn Team</p>
        </div>
    `;
};

export default resetPasswordTemplate;
