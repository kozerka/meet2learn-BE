import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Note from '../models/Note.js';
import Meeting from '../models/Meeting.js';
import Review from '../models/Review.js';

export const getStats = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const user = await User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}

	const accountAgeInDays = Math.floor(
		(new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
	);

	const postsCount = await Post.countDocuments({ user: userId });
	const notesCount = await Note.countDocuments({ user: userId });
	const meetingsCount = await Meeting.countDocuments({
		$or: [{ student: userId }, { tutor: userId }],
	});

	const reviewsCount = await Review.countDocuments({
		$or: [{ student: userId }, { tutor: userId }],
	});

	let likesCount = 0;
	let dislikesCount = 0;
	let prioritiesCount = 0;
	const posts = await Post.find();
	posts.forEach((post) => {
		likesCount += post.likes.filter(
			(like) => like.user.toString() === userId.toString()
		).length;
		dislikesCount += post.dislikes.filter(
			(dislike) => dislike.user.toString() === userId.toString()
		).length;
		prioritiesCount += post.priority
			.filter((priority) => priority.user.toString() === userId.toString())
			.reduce((acc, p) => acc + p.count, 0);
	});

	res.json({
		postsCount,
		notesCount,
		meetingsCount,
		reviewsCount,
		likesCount,
		dislikesCount,
		prioritiesCount,
		accountAgeInDays,
	});
});
