import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const getAllTutors = asyncHandler(async (req, res) => {
	try {
		const { search, page = 1, limit = 6 } = req.query;

		let queryObject = { role: 'tutor' };
		if (search) {
			queryObject['$or'] = [
				{ firstName: new RegExp(search, 'i') },
				{ lastName: new RegExp(search, 'i') },
				{ 'subjects.name': new RegExp(search, 'i') },
			];
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
	const tutorId = req.params.id;

	const tutor = await User.findOne({
		_id: tutorId,
		role: 'tutor',
	}).select('-password');

	if (!tutor) {
		res.status(404);
		throw new Error('Tutor not found');
	} else {
		res.json(tutor);
	}
});


export { getAllTutors, getTutorById };
