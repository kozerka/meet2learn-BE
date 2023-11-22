import express from 'express';
import { getAllTutors, getTutorById } from '../controllers/tutorController.js';

const tutorRouter = express.Router();

tutorRouter.get('/', getAllTutors);

tutorRouter.get('/:id', getTutorById);

export default tutorRouter;
