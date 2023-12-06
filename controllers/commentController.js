import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';

const createComment = asyncHandler(async (req, res) => {
	const { text } = req.body;
	const postId = req.params.id;

	const post = await Post.findById(postId);
	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	const newComment = {
		user: req.user._id,
		text,
		name: req.user.name,
		avatar: req.user.avatar,
	};

	post.comments.unshift(newComment);

	await post.save();
	res.status(201).json(post.comments[0]);
});

const deleteComment = asyncHandler(async (req, res) => {
	const postId = req.params.id;
	const commentId = req.params.comment_id;

	const post = await Post.findById(postId);
	if (!post) {
		res.status(404);
		throw new Error('Post not found');
	}

	const comment = post.comments.find((comment) => comment.id === commentId);
	if (!comment) {
		res.status(404);
		throw new Error('Comment not found');
	}

	if (
		comment.user.toString() !== req.user._id.toString() &&
		post.user.toString() !== req.user._id.toString()
	) {
		res.status(401);
		throw new Error('User not authorized');
	}

	post.comments = post.comments.filter((comment) => comment.id !== commentId);
	await post.save();
	res.json({ message: 'Comment deleted' });
});


export { createComment, deleteComment };
