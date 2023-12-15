import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { getStats } from '../controllers/statsController.js';

const statsRouter = express.Router();
statsRouter.get('/', auth, getStats);

export default statsRouter;
