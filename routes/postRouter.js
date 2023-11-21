import express from 'express';
import {
	createPost,
	getPosts,
	getPostById,
	deletePost,
	updatePost,
	likePost,
	dislikePost,
	givePriority,
	getPostsByUserId,
} from '../controllers/postController.js';
import auth from '../middlewares/authMiddleware.js';
import { objectId } from '../middlewares/objectIdMiddleware.js';
import commentRouter from './commentRouter.js';
import { validatePost } from '../middlewares/validationMiddleware.js';

const postRouter = express.Router();

postRouter.post('/create', auth, validatePost, createPost);

postRouter.get('/', auth, getPosts);

postRouter.get('/:id', auth, getPostById);

postRouter.get('/user/:userId', auth, getPostsByUserId);

postRouter.delete('/:id', auth, objectId('id'), deletePost);

postRouter.put('/edit/:id', auth, objectId('id'), updatePost);

postRouter.put('/like/:id', auth, objectId('id'), likePost);

postRouter.put('/dislike/:id', auth, objectId('id'), dislikePost);

postRouter.put('/priority/:id', auth, objectId('id'), givePriority);

postRouter.use('/comments', commentRouter);

export default postRouter;
