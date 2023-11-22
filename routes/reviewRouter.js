import express from 'express';
import {
	addReview,
	getTutorReviews,
	getMyReviews,
	updateReview,
	deleteReview,
} from '../controllers/reviewController.js';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/add/:tutorId', auth, role(['student']), addReview);

reviewRouter.get('/tutor/:tutorId', getTutorReviews);

reviewRouter.get('/my', auth, role(['student']), getMyReviews);

reviewRouter.patch('/update/:reviewId', auth, role(['student']), updateReview);

reviewRouter.delete('/delete/:reviewId', auth, role(['student']), deleteReview);

export default reviewRouter;
