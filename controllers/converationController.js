import asyncHandler from 'express-async-handler';
import Meeting from '../models/Meeting.js';

const createConversation = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const { text } = req.body;
	const userId = req.user._id;

	const meeting = await Meeting.findById(meetingId);

	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	if (
		meeting.tutor.toString() !== userId &&
		meeting.student.toString() !== userId
	) {
		res.status(403);
		throw new Error('Not authorized to add conversation to this meeting');
	}

	const newConversation = {
		user: userId,
		text,
		firstName: req.user.firstName,
		lastName: req.user.lastName,
		avatar: req.user.avatar,
		date: new Date(),
	};

	meeting.conversation.push(newConversation);
	await meeting.save();

	res.status(201).json(newConversation);
});

const getConversationsForMeeting = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const userId = req.user._id;

	const meeting = await Meeting.findById(meetingId).populate(
		'conversation.user'
	);

	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	if (
		meeting.tutor.toString() !== userId &&
		meeting.student.toString() !== userId
	) {
		res.status(403);
		throw new Error('Not authorized to view conversations for this meeting');
	}

	res.json(meeting.conversation);
});

const getAllConversations = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const meetings = await Meeting.find({
		$or: [{ tutor: userId }, { student: userId }],
	}).select('conversation');
	const conversations = meetings.map((meeting) => meeting.conversation);
	res.json(conversations.flat());
});

const updateConversation = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const postId = req.params.postId;
	const { text } = req.body;
	const userId = req.user._id;

	const meeting = await Meeting.findById(meetingId);
	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	const post = meeting.conversation.id(postId);
	if (!post) {
		res.status(404);
		throw new Error('Conversation post not found');
	}

	if (post.user.toString() !== userId) {
		res.status(401);
		throw new Error('User not authorized to update this conversation post');
	}

	post.text = text;
	await meeting.save();

	res.json(post);
});

const deleteConversation = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const postId = req.params.postId;
	const userId = req.user._id;

	const meeting = await Meeting.findById(meetingId);
	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	const post = meeting.conversation.id(postId);
	if (!post) {
		res.status(404);
		throw new Error('Conversation post not found');
	}

	if (post.user.toString() !== userId) {
		res.status(401);
		throw new Error('User not authorized to delete this conversation post');
	}

	post.remove();
	await meeting.save();

	res.json({ message: 'Conversation post deleted' });
});



export {
	createConversation,
	getConversationsForMeeting,
	getAllConversations,
	updateConversation,
	deleteConversation,
};
