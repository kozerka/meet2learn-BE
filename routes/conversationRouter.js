import express from 'express';
import {
	createConversation,
	getConversationsForMeeting,
	getAllConversations,
	updateConversation,
	deleteConversation,
} from '../controllers/conversationController.js';
import auth from '../middlewares/authMiddleware.js';
const conversationRouter = express.Router({ mergeParams: true });

conversationRouter.post('/:meetingId', auth, createConversation);
conversationRouter.get('/:meetingId', auth, getConversationsForMeeting);
conversationRouter.get('/', auth, getAllConversations);
conversationRouter.put('/:meetingId/:postId', auth, updateConversation);
conversationRouter.delete('/:meetingId/:postId', auth, deleteConversation);

export default conversationRouter;
