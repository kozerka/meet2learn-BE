import express from 'express';
const meetingPostRouter = express.Router({ mergeParams: true });

meetingPostRouter.post('/:meetingId/posts', auth, createMeetingPost);

meetingPostRouter.get('/:meetingId/posts', auth, getPostsForMeeting);

meetingPostRouter.get('/', auth, getAllMeetingPosts);

meetingPostRouter.put('/posts/:postId', auth, updateMeetingPost);

meetingPostRouter.delete('/posts/:postId', auth, deleteMeetingPost);

export default meetingPostRouter;
