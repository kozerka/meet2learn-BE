import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		tutor: {
			type: mongoose.Types.ObjectId,
			ref: 'Tutor',
		},
		student: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		reviewText: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
