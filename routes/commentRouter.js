import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import {
	createComment,
	deleteComment,
} from '../controllers/commentController.js';
import { objectId } from '../middlewares/objectIdMiddleware.js';

const commentRouter = express.Router();

commentRouter.post('/:id', auth, objectId('id'), createComment);

commentRouter.delete('/:id/:comment_id', auth, objectId('id'), deleteComment);

export default commentRouter;
