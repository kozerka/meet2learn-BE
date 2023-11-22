import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const connectDB = async () => {
	const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

	if (!uri) {
		console.error('Error: MONGODB_URI is not defined.');
		process.exit(1);
	}
	try {
		const con = await mongoose.connect(uri);
		console.log(`MongoDB Connected with success with ${con.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
