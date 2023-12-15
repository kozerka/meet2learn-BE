## meet2learn Backend (meet2learn-BE)
![Language](https://img.shields.io/badge/language-EN-red)

## 📖 Overview
This is the backend part of the meet2learn application, a dynamic web platform that offers a rich set of features including user registration, post management, commenting, profile management, and more, complementing the frontend React application.  [go to FE repository](https://github.com/kozerka/meet2learn-FE)

## 🌍 Live

To check all the features please register. If you want to be able to control your account please provide VALID email! All dummy email will be deleted from DataBase after 10 days ->
[meet2learn LIVE](https://meet2learn.netlify.app/)

## 💻 Technology Stack

 ![NODE JS](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
 ![NODEMON](https://img.shields.io/badge/Nodemon-76D04B.svg?style=for-the-badge&logo=Nodemon&logoColor=white)
 ![EXPRESS](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
 ![.env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
 ![JS](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) ![MONGODB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white) ![MONGOOSE](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)

- **Node.js & Express**: For building the server and RESTful API. [Express Documentation](https://expressjs.com/)
- **Mongoose**: To interact with MongoDB database. [Mongoose Documentation](https://mongoosejs.com/)
- **JSON Web Tokens (JWT) with http only cookie**: For secure authentication. [JWT Documentation](https://jwt.io/)
- **bcryptjs**: For password hashing. [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- **Multer & Cloudinary**: For image upload and storage. [Multer Documentation](https://www.npmjs.com/package/multer), [Cloudinary Documentation](https://cloudinary.com/documentation)
- **NodeMailer**: For email notification and reset password token. [Nodemailer Documentation](https://nodemailer.com/about/)
- **cors, dotenv, morgan, and more**: Various utilities for functionality and logging.


## 📝 Features

- **User Authentication**: Supports secure user registration and login processes, including password reset options.
- **Profile Management**: Handles user profile updates including: changing personal data and password, removing an account,  profile picture uploads.
- **Security**: Implements essential security measures such as input sanitization, token-based authentication, and password hashing.
- **Role-Based Access Control**: Implementing middleware for role management, the application ensures secure access to various features based on user roles, enhancing both security and usability.
- **Nodemailer Integration with Email Templates**: Nodemailer for email notifications, incorporating custom templates for different types of emails, such as password resets and account confirmation.
- **Dynamic Routing and Controller Architecture**: RESTful API is built with Express, featuring distinct routers and controllers for users, tutors, reviews, posts, notes, meetings, conversations, and contact forms. Each module is meticulously crafted to handle specific data and logic.
- **File Upload and Cloud Storage Integration**: Multer for handling file uploads, coupled with Cloudinary for efficient and secure cloud-based storage of images.

### Code Samples

#### User Authentication Middleware

```javascript
const auth = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select('-password');

			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});
```

#### Image Upload with Multer and Cloudinary

```javascript
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_APIKEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png', 'jpeg'],
	params: {
		folder: 'meet2learn',
		transformation: [{ width: 500, height: 500, crop: 'fit' }],
	},
});

```


## 👉 Getting Started

To use all BE functionalities on the FE, remember to download the FE from the link and run it according to the instructions provided 
[go to FE repository](https://github.com/kozerka/meet2learn-FE)

1. **Clone the repository**:
   ```bash
   git clone [Repo-URL]
   ```

2. **Navigate to the project directory**:
   ```bash
   cd [Repo-Name]
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables:**
- Create a `.env` file in the project root. You can use the .env.example - change name to .env 
- Add the necessary environment variables (e.g., database URI, JWT secret).
    ```
    DB_USER=YOUR_USER_NAME
    DB_PASSWORD=YOUR_PASSWORD
    DB_HOST=DATABASE_HOST_NAME

    NODE_ENV=development
    PORT=4000(PORT ACCORDING YOUR PREFERENCES)
    JWT_SECRET=SECRET_TOKEN
    JWT_EXPIRES_IN=ADD_EXPIRE_TIME
    NODEMAILER_PASS=YOUR_NODEMAILER_PASSWORD
    NODEMAILER_EMAIL=YOUR_NODEMAILER_EMAIL

    CLOUDINARY_CLOUD_NAME=CLOUDINARY_CLOUD_NAME
    CLOUDINARY_APIKEY=CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET=CLOUDINARY_API_SECRET
    ```

> **Note**: Always keep your API keys confidential. Do not expose them in the client-side code or public repositories.

5. **Run the server:**
  - For development:
    ```
    npm run start:dev
    ```
  - For production:
    ```
    npm start
    ```



## ⭐️ Future Development Plans

The application is set for some exciting updates. Here's what's planned for the future:

- **Introduction of Admin Role**: The backend and routing have been designed to easily add an admin role. This role will bring new levels of management and oversight to the app.

- **Two-Step Verification for Tutor Accounts**: There are plans to add a two-step verification process for tutors. This will help in ensuring that the content they publish is secure and trustworthy.

- **Expanded Dashboard Notifications**: The dashboard will be upgraded to show more notifications. Users will be informed about new posts, comments, messages from tutors, and other important updates.

- **User Engagement Enhancements**: The app will include new features to make it more interactive and engaging. This might include elements like badges for achievements or personalized learning paths.

## 💪 Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## 💬  Feedback

If you have any feedback or issues, please open an issue in this repository.


## ⚠️ License

[MIT](https://choosealicense.com/licenses/mit/)

---

Created with ❤️ by [kozerka].

---

&nbsp;

&nbsp;

## 🙏 Special Thanks

A heartfelt thank you to my [Mentor - devmentor.pl](https://devmentor.pl/) for setting forth this challenge.

---





