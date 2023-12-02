import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getAllTutors = asyncHandler(async (req, res) => {
	try {
		const { firstName, lastName, subject, page = 1, limit = 6 } = req.query;

		let queryObject = { role: 'tutor' };
		if (firstName) {
			queryObject['firstName'] = new RegExp(firstName, 'i');
		}
		if (lastName) {
			queryObject['lastName'] = new RegExp(lastName, 'i');
		}
		if (subject) {
			queryObject['subjects.name'] = new RegExp(subject, 'i');
		}

		const startIndex = (page - 1) * limit;
		const total = await User.countDocuments(queryObject);

		const tutors = await User.find(queryObject)
			.select('-password')
			.limit(limit * 1)
			.skip(startIndex);

		res.json({
			total,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
			tutors,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

const getTutorById = asyncHandler(async (req, res) => {
	const tutor = await User.findOne({
		_id: req.params.id,
		role: 'tutor',
	}).select('-password');
	console.log('Tutor found:', tutor);
	if (!tutor) {
		res.status(404);
		throw new Error('Tutor not found');
	} else {
		res.json(tutors);
	}
});

export { getAllTutors, getTutorById };
