import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
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
		category: {
			type: String,
			required: true,
			maxLength: 100,
			enum: [
				'study buddies',
				'tutor help',
				'learning resources',
				'online classes',
				'academic chat',
				'research projects',
				'student life',
				'clubs and activities',
				'career tips',
				'internships',
				'scholarships',
				'alumni connections',
				'other',
			],
			default: 'other',
		},
		name: {
			type: String,
		},
		firstName: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
		dislikes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
		priority: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				count: {
					type: Number,
					default: 0,
				},
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
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
	{
		timestamps: true,
	}
);

export default mongoose.model('Post', PostSchema);
