import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
// import {
// 	userRouter,
// 	postRouter,
// 	meetingRouter,
// 	meetingPostRouter,
// 	noteRouter,
// 	commentRouter,
// 	tutorRouter,
// 	reviewRouter,
// } from './routes/index.js';
import contactRouter from './routes/contactRouter.js';
import userRouter from './routes/userRouter.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
dotenv.config();

const app = express();
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.get('/api/test', (req, res) => {
	res.json({ message: 'testing - API running ...' });
});

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/contact', contactRouter);
app.use('/api/users', userRouter);
// app.use('/api/posts', postRouter);
// app.use('/api/meetings', meetingRouter);
// app.use('/api/meeting-posts', meetingPostRouter);
// app.use('/api/notes', noteRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/tutors', tutorRouter);
// app.use('/api/reviews', reviewRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

connectDB();
