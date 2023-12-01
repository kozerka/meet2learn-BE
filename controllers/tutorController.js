import asyncHandler from 'express-async-handler';

import Tutor from '../models/Tutor.js';
const getAllTutors = asyncHandler(async (req, res) => {
	const { firstName, lastName, subjects, page = 1, limit = 9 } = req.query;
	let query = {};
	if (firstName) {
		query.firstName = { $regex: firstName, $options: 'i' };
	}
	if (lastName) {
		query.lastName = { $regex: lastName, $options: 'i' };
	}
	if (subjects) {
		query.subjects = { $in: subjects.split(',') };
	}
	const skip = (page - 1) * limit;
	const tutors = await Tutor.find(query).limit(limit).skip(skip);
	res.json(tutors);
});

const getTutorById = asyncHandler(async (req, res) => {
	const tutorId = req.params.id;
	console.log('Requested tutor ID:', tutorId);

	const tutor = await Tutor.findById(tutorId);
	console.log('Tutor found:', tutor);
	if (!tutor) {
		res.status(404);
		throw new Error('Tutor not found');
	}

	res.json(tutor);
});

export { getAllTutors, getTutorById };
