import express from 'express';
import multer from 'multer';
import {
	loginUser,
	getUsers,
	registerUser,
	logoutUser,
	updateUser,
	getMe,
	deleteUser,
	changePassword,
	uploadAvatar,
	resetPasswordFinalize,
	resetPasswordInitiate,
} from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';
import { storage } from '../utils/fileUpload.js';
import {
	validateLogin,
	validateNewPassword,
	validateRegister,
} from '../middlewares/validationMiddleware.js';

const userRouter = express.Router();

const upload = multer({ storage });

userRouter.get('/', getUsers);

userRouter.post('/login', validateLogin, loginUser);

userRouter.post('/register', validateRegister, registerUser);

userRouter.get('/logout', logoutUser);

userRouter.patch('/update', auth, updateUser);

userRouter.get('/me', auth, getMe);

userRouter.delete('/delete', auth, deleteUser);

userRouter.post('/change-password', auth, validateNewPassword, changePassword);

userRouter.put('/upload-avatar', auth, upload.single('file'), uploadAvatar);

userRouter.post('/reset-password-initiate', resetPasswordInitiate);

userRouter.post('/reset-password-finalize', resetPasswordFinalize);




export default userRouter;
