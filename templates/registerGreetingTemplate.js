const registerGreetingTemplate = (name) => {
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
                <h1>Welcome to Meet2Learn, ${name}!</h1>
            </div>
            <p>We are excited to have you join our learning community. Your account has been successfully created, and you are now ready to explore and connect with tutors and learners across the globe.</p>
            <p>If you have any questions or need assistance, feel free to reach out to us. Our team is always here to support your learning journey.</p>
            <p>Remember, learning is a lifelong adventure, and we are thrilled to be a part of yours.</p>
            <p style="text-align: center;">Warm Regards,</p>
            <p style="text-align: center;">Meet2Learn Team</p>
            <div class="footer">
                <p>This email was sent on ${dateString}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default registerGreetingTemplate;
