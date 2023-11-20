import mongoose from 'mongoose';

const meetingPostSchema = new mongoose.Schema(
	{
		meeting: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Meeting',
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('MeetingPost', meetingPostSchema);
