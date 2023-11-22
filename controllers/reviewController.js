import asyncHandler from 'express-async-handler';
import { updateTutorRating } from '../utils/updateTutorRating.js';
import Review from '../models/Review.js';
import Tutor from '../models/Tutor.js';

const addReview = asyncHandler(async (req, res) => {
	const { rating, reviewText } = req.body;
	const tutorId = req.params.tutorId;
	const studentId = req.user._id;

	const existingReview = await Review.findOne({
		tutor: tutorId,
		student: studentId,
	});
	if (existingReview) {
		return res
			.status(400)
			.json({ message: 'You have already reviewed this tutor' });
	}

	const review = new Review({
		tutor: tutorId,
		student: studentId,
		reviewText,
		rating,
	});

	const savedReview = await review.save();
	await Tutor.findByIdAndUpdate(tutorId, {
		$push: { reviews: savedReview._id },
	});

	await updateTutorRating(tutorId);

	res.status(201).json(savedReview);
});

const getTutorReviews = asyncHandler(async (req, res) => {
	const tutorId = req.params.tutorId;
	const reviews = await Review.find({ tutor: tutorId }).populate(
		'student',
		'name avatar'
	);

	res.json(reviews);
});

const getMyReviews = asyncHandler(async (req, res) => {
	const studentId = req.user._id;
	const reviews = await Review.find({ student: studentId }).populate(
		'tutor',
		'name'
	);

	res.json(reviews);
});

const updateReview = asyncHandler(async (req, res) => {
	const reviewId = req.params.reviewId;
	const { rating, reviewText } = req.body;

	const review = await Review.findById(reviewId);
	if (!review) {
		res.status(404);
		throw new Error('Review not found');
	}

	review.rating = rating;
	review.reviewText = reviewText;
	await review.save();

	await updateTutorRating(review.tutor);

	res.json(review);
});

const deleteReview = asyncHandler(async (req, res) => {
	const reviewId = req.params.reviewId;

	const review = await Review.findByIdAndDelete(reviewId);
	if (!review) {
		res.status(404);
		throw new Error('Review not found');
	}

	await updateTutorRating(review.tutor);

	res.json({ message: 'Review deleted' });
});

export { addReview, getTutorReviews, getMyReviews, updateReview, deleteReview };
