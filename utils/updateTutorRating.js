import Review from '../models/Review.js';
import Tutor from '../models/Tutor.js';
export const updateTutorRating = async (tutorId) => {
	const tutor = await Tutor.findById(tutorId);

	const updatedRatings = await Review.aggregate([
		{ $match: { tutor: tutor._id } },
		{
			$group: {
				_id: '$tutor',
				averageRating: { $avg: '$rating' },
				totalRating: { $sum: 1 },
			},
		},
	]);

	if (updatedRatings.length > 0) {
		tutor.averageRating = Number(updatedRatings[0].averageRating.toFixed(1));
		tutor.totalRating = updatedRatings[0].totalRating;
	} else {
		tutor.averageRating = 0;
		tutor.totalRating = 0;
	}

	await tutor.save();
};
