import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());
app.use(mongoSanitize());
app.get('/api/test', (req, res) => {
	res.json({ message: 'testing - API running ...' });
});

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
connectDB();
