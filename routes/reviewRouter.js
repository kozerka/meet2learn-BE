import express from 'express';

const reviewRouter = express.Router();

reviewRouter.post('/add/:tutorId', auth, role('student'), addReview);

reviewRouter.get('/tutor/:tutorId', getTutorReviews);

reviewRouter.get('/my', auth, role('student'), getMyReviews);

reviewRouter.patch('/update/:reviewId', auth, role('student'), updateReview);

reviewRouter.delete('/delete/:reviewId', auth, role('student'), deleteReview);

export default reviewRouter;
