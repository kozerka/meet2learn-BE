const contactFormTemplate = (username, messageTitle, messageBody) => {
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
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Us, ${username}</h1>
            </div>
            <p>Title: ${messageTitle}</p>
            <p>Message: ${messageBody}</p>
            <p>This email was sent on ${dateString}</p>
            <p>We have received your message and want to thank you for writing to us. We will reply as soon as possible.</p>
            <p style="text-align: center;">Warm Regards,</p>
            <p style="text-align: center;">meet2learn</p>
            <div class="footer">
                <p>This email was sent on ${dateString}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default contactFormTemplate;
