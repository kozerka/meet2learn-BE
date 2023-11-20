import express from 'express';

const userRouter = express.Router();

userRouter.get('/', auth, getUsers);

userRouter.post('/login', loginUser);

userRouter.post('/register', registerUser);

userRouter.get('/logout', logoutUser);

userRouter.patch('/update', auth, updateUser);

userRouter.get('/me', auth, getMe); //gets single user with token

export default userRouter;
