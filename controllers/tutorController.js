import asyncHandler from 'express-async-handler';

import Tutor from '../models/Tutor.js';
const getAllTutors = asyncHandler(async (req, res) => {
	const tutors = await Tutor.find({});
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
