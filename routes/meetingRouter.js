import express from 'express';
import {
	createMeeting,
	getAllMeetings,
	getMeetingById,
	updateMeeting,
	deleteMeeting,
} from '../controllers/meetingController.js';
import auth from '../middlewares/authMiddleware.js';
import meetingPostRouter from './conversationRouter.js';
const meetingRouter = express.Router();

meetingRouter.post('/create', auth, createMeeting);

meetingRouter.get('/', auth, getAllMeetings);

meetingRouter.get('/:meetingId', auth, getMeetingById);

meetingRouter.put('/update/:meetingId', auth, updateMeeting);

meetingRouter.delete('/delete/:meetingId', auth, deleteMeeting);

meetingRouter.use('/meeting-posts', meetingPostRouter);

export default meetingRouter;
