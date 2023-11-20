import express from 'express';
const meetingRouter = express.Router();

meetingRouter.post('/meetings/create', auth, createMeeting);

meetingRouter.get('/meetings', auth, getAllMeetings);

meetingRouter.get('/meetings/:meetingId', auth, getMeetingById);

meetingRouter.put('/meetings/update/:meetingId', auth, updateMeeting);

meetingRouter.delete('/meetings/delete/:meetingId', auth, deleteMeeting);

meetingRouter.use('/meeting-posts', meetingPostRouter);

export default meetingRouter;
