import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';

const createPost = asyncHandler(async (req, res) => {
	const { title, text, category } = req.body;
	const user = await User.findById(req.user._id).select('-password');
	const newPost = new Post({
		user: req.user._id,
		title,
		text,
		category,
		name: user.name,
		avatar: user.avatar,
	});

	const post = await newPost.save();
	res.status(201).json(post);
});

const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find().sort({ date: -1 });
	res.json(posts);
});
const getPostById = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	res.json(post);
});
const getPostsByUserId = asyncHandler(async (req, res) => {
	const posts = await Post.find({ user: req.params.userId });
	res.json(posts);
});

const deletePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	if (post.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await Post.findByIdAndDelete(req.params.id);
	res.json({ message: 'Post removed' });
});

const updatePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	if (post.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error('User not authorized');
	}

	post.title = req.body.title || post.title;
	post.text = req.body.text || post.text;
	post.category = req.body.category || post.category;

	const updatedPost = await post.save();
	res.json(updatedPost);
});

const likePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	const likeIndex = post.likes.findIndex(
		(like) => like.user.toString() === req.user._id.toString()
	);

	if (likeIndex === -1) {
		post.likes.unshift({ user: req.user._id });
		await post.save();
		res.json({
			message: 'You have given your like to the post',
			likes: post.likes,
		});
	} else {
		post.likes.splice(likeIndex, 1);
		await post.save();
		res.json({
			message: 'You have removed your like from the post',
			likes: post.likes,
		});
	}
});

const dislikePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	const dislikeIndex = post.dislikes.findIndex(
		(dislike) => dislike.user.toString() === req.user._id.toString()
	);

	if (dislikeIndex === -1) {
		post.dislikes.unshift({ user: req.user._id });
		await post.save();
		res.json({
			message: 'You have given your dislike to the post',
			dislikes: post.dislikes,
		});
	} else {
		post.dislikes.splice(dislikeIndex, 1);
		await post.save();
		res.json({
			message: 'You have removed your dislike from the post',
			dislikes: post.dislikes,
		});
	}
});

const givePriority = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		throw new Error('Post not found');
	}

	const userPriorityIndex = post.priority.findIndex(
		(p) => p.user.toString() === req.user._id.toString()
	);

	if (userPriorityIndex !== -1) {
		if (post.priority[userPriorityIndex].count >= 5) {
			throw new Error(
				'You have already maximized the priority increase, no more increases allowed'
			);
		}
		post.priority[userPriorityIndex].count += 1;
	} else {
		post.priority.push({ user: req.user._id, count: 1 });
	}

	await post.save();
	const updatedCount =
		userPriorityIndex !== -1 ? post.priority[userPriorityIndex].count : 1;
	res.json({
		message: `Priority increased, number of clicks: ${updatedCount}`,
	});
});

export {
	createPost,
	getPosts,
	getPostById,
	deletePost,
	updatePost,
	likePost,
	dislikePost,
	givePriority,
	getPostsByUserId,
};
