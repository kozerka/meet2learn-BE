import mongoose from 'mongoose';

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
		meetings: [{ type: mongoose.Types.ObjectId, ref: 'Meeting' }],
	},
	{ timestamps: true }
);

export default User.discriminator('Tutor', tutorSchema);
