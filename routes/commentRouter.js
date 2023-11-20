import express from 'express';

const commentRouter = express.Router();

commentRouter.post('/:id', auth, createComment);

commentRouter.delete('/:id/:comment_id', auth, deleteComment);

export default commentRouter;
