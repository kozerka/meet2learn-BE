import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			trim: true,
			maxLength: 80,
		},
		lastName: {
			type: String,
			trim: true,
			maxLength: 80,
		},
		age: { type: Number },
		avatar: {
			type: String,
			default:
				'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
		},
		date: {
			type: Date,
			default: Date.now,
		},
		city: {
			type: String,
			default: 'Somewhere on Earth',
		},
		country: {
			type: String,
			default: 'Earth',
		},
		about: { type: String, maxLength: 500 },
		role: {
			type: String,
			enum: ['student', 'tutor', 'admin'],
			default: 'student',
		},
		verified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('User', UserSchema);
