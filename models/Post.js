import mongoose from 'mongoose';
import { POST_CATEGORIES } from '../utils/constants/postCategories.js';

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
			enum: Object.values(POST_CATEGORIES),
			default: POST_CATEGORIES.OTHER,
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
					ref: 'User',
					required: true,
				},
				name: {
					type: String,
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
