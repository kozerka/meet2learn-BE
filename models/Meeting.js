import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
	{
		tutor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tutor',
			required: true,
		},
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		conversation: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				text: {
					type: String,
					required: true,
				},
				firstName: {
					type: String,
				},
				lastName: {
					type: String,
				},
				avatar: {
					type: String,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Meeting', meetingSchema);
