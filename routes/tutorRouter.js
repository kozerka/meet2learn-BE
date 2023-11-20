import express from 'express';

const tutorRouter = express.Router();

tutorRouter.get('/', getAllTutors);

tutorRouter.get('/:tutorId', getTutorById);

tutorRouter.patch('/update/:tutorId', auth, updateTutor);

export default tutorRouter;
