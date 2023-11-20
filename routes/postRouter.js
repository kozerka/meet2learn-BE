// import express from 'express';
// import {
// 	createPost,
// 	getPosts,
// 	getPostById,
// 	deletePost,
// 	updatePost,
// 	likePost,
// 	unlikePost,
// 	givePriority,
// } from '../controllers/postController.js';
// import auth from '../middlewares/authMiddleware.js';
// import objectId from '../middlewares/objectIdMiddleware.js';
// import commentRouter from './commentRouter.js';

// const postRouter = express.Router();

// postRouter.post('/create', auth, createPost);

// postRouter.get('/', auth, getPosts);

// postRouter.get('/:id', auth, getPostById);

// postRouter.delete('/:id', auth, objectId('id'), deletePost);

// postRouter.put('/edit/:id', auth, objectId('id'), updatePost);

// postRouter.put('/like/:id', auth, objectId('id'), likePost);

// postRouter.put('/unlike/:id', auth, objectId('id'), unlikePost);

// postRouter.put('/priority/:id', auth, objectId('id'), givePriority);

// postRouter.use('/comments', commentRouter);

// export default postRouter;
