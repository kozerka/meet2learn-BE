import express from 'express';
import {
	getUsers,
	loginUser,
	registerUser,
	logoutUser,
	updateUser,
	getMe,
	deleteUser,
	changePassword,
} from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';
import {
	validateLogin,
	validateNewPassword,
	validateRegister,
} from '../middlewares/validationMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.post('/login', validateLogin, loginUser);

userRouter.post('/register', validateRegister, registerUser);

userRouter.get('/logout', logoutUser);

userRouter.patch('/update', auth, updateUser);

userRouter.get('/me', auth, getMe);

userRouter.delete('/delete', auth, deleteUser);

userRouter.post('/change-password', auth, validateNewPassword, changePassword);

export default userRouter;
