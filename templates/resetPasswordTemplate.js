const resetPasswordTemplate = (email, token) => {
	const resetLink = `http://meet2learn.netlify.app/finalize-reset-password?token=${token}`;
	const now = new Date();
	const dateString = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;

	return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container {
                width: 80%;
                margin: 0 auto;
                font-family: Arial, sans-serif;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
                color: #2779A7;
            }
            .footer {
                text-align: center;
                font-size: 0.8em;
                color: #888;
            }
            a {
                color: #067df7;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Reset Your Meet2Learn Password</h1>
            </div>
            <p>We received a request to reset the password for your Meet2Learn account associated with <strong>${email}</strong>.</p>
            <p>If you did not make this request, please ignore this email. No changes have been made to your account.</p>
            <p>To reset your password, click on the following link:</p>
            <p style="text-align: center;"><a href="${resetLink}">Reset Password</a></p>
            <p>If you have any questions or did not request a password reset, we encourage you to reach out to us via the contact form on our website.</p>
            <div class="footer">
                <p>This email was sent on ${dateString}</p>
                <p>Best regards,<br/>Meet2Learn Team</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default resetPasswordTemplate;
