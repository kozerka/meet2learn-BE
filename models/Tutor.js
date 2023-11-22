import mongoose from 'mongoose';
import User from './User.js';

const tutorSchema = new mongoose.Schema(
	{
		subjects: { type: Array },
		experiences: { type: Array },
		bio: { type: String, maxLength: 500 },
		reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
		averageRating: {
			type: Number,
			default: 0,
		},
		totalRating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default User.discriminator('Tutor', tutorSchema);
