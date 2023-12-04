import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Tutor from '../models/Tutor.js';
import Meeting from '../models/Meeting.js';

const createMeeting = asyncHandler(async (req, res) => {
	const { tutor, date } = req.body;
	const student = req.user._id;
	const meeting = new Meeting({
		tutor,
		student,
		date,
	});

	await meeting.save();

	await Tutor.findByIdAndUpdate(tutor, { $push: { meetings: meeting._id } });
	await User.findByIdAndUpdate(student, { $push: { meetings: meeting._id } });

	res.status(201).json(meeting);
});

const getAllMeetings = asyncHandler(async (req, res) => {
	const userId = req.user._id; // ID zalogowanego użytkownika

	// Pobranie wszystkich spotkań, w których użytkownik jest studentem lub tutorem
	const meetings = await Meeting.find({
		$or: [{ tutor: userId }, { student: userId }],
	})
		.populate('tutor')
		.populate('student');

	res.json(meetings);
});

const getMeetingById = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const userId = req.user._id;

	const meeting = await Meeting.findById(meetingId)
		.populate('tutor')
		.populate('student');

	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	if (
		meeting.tutor._id.toString() !== userId &&
		meeting.student._id.toString() !== userId
	) {
		res.status(403);
		throw new Error('Not authorized to access this meeting');
	}

	res.json(meeting);
});

const updateMeeting = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const updateData = req.body;
	const userId = req.user._id;

	const meeting = await Meeting.findById(meetingId);

	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	if (
		meeting.tutor._id.toString() !== userId &&
		meeting.student._id.toString() !== userId
	) {
		res.status(403);
		throw new Error('Not authorized to update this meeting');
	}

	const updatedMeeting = await Meeting.findByIdAndUpdate(
		meetingId,
		updateData,
		{
			new: true,
			runValidators: true,
		}
	);

	res.json(updatedMeeting);
});

const deleteMeeting = asyncHandler(async (req, res) => {
	const meetingId = req.params.meetingId;
	const userId = req.user._id;

	const meeting = await Meeting.findOneAndDelete(meetingId);

	if (!meeting) {
		res.status(404);
		throw new Error('Meeting not found');
	}

	if (
		meeting.tutor._id.toString() === userId.toString() ||
		meeting.student._id.toString() === userId.toString()
	) {
		res.json({ message: 'Meeting deleted' });
	} else {
		res.status(403);
		throw new Error('Not authorized to delete this meeting');
	}
});


export {
	createMeeting,
	getAllMeetings,
	getMeetingById,
	updateMeeting,
	deleteMeeting,
};
