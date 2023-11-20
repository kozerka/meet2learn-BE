const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 100,
		},
		content: {
			type: String,
			required: true,
		},
		tags: [
			{
				type: String,
				trim: true,
			},
		],
		date: {
			type: Date,
			default: Date.now,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
