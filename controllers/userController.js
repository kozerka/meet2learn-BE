import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Tutor from '../models/Tutor.js';
import generateToken from '../utils/generateToken.js';
import generatePasswordResetToken from '../utils/generatePasswordResetToken.js';
import { comparePassword, hashPassword } from '../utils/hashPasswordHelper.js';
import { resetPasswordService } from '../services/resetPasswordService.js';
import jwt from 'jsonwebtoken';
//działa
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user && (await comparePassword(password, user.password))) {
		generateToken(res, user._id);
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			role: user.role,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});
//działa
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, role, ...tutorFields } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
	const hashedPassword = await hashPassword(password);
	let user;
	if (role === 'tutor') {
		user = new Tutor({
			name,
			email,
			password: hashedPassword,
			role,
			...tutorFields,
		});
	} else {
		user = new User({
			name,
			email,
			password: hashedPassword,
			role,
		});
	}
	const createdUser = await user.save();

	if (createdUser) {
		generateToken(res, createdUser._id);
		res.status(201).json({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			role: createdUser.role,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});
//działa
const logoutUser = (req, res) => {
	res.cookie('jwt', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(200).json({ message: 'Logged out successfully!See you soon!' });
};
//działa
const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	res.json(user);
});
const updateUser = asyncHandler(async (req, res) => {
	const update = req.body;
	const userId = req.user._id;
	const user = await User.findById(userId);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	if (update.email) {
		const existingUser = await User.findOne({
			email: update.email,
			_id: { $ne: userId },
		});
		if (existingUser) {
			res.status(400);
			throw new Error('Email already exists!');
		}
	}

	if (user.role === 'tutor') {
		const tutor = await Tutor.findById(userId);
		if (!tutor) {
			res.status(404);
			throw new Error('Tutor not found');
		}
		tutor.set(update);
		const updatedTutor = await tutor.save();
		res.json(updatedTutor);
	} else {
		user.set(update);
		const updatedUser = await user.save();
		res.json(updatedUser);
	}
});

//działa
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

//działające
const deleteUser = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const result = await User.deleteOne({ _id: userId });
	if (result.deletedCount === 0) {
		res.status(404);
		throw new Error('User not found');
	}
	res.json({ message: 'User removed' });
});
//działa
const changePassword = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { currentPassword, newPassword } = req.body;
	const user = await User.findById(userId);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const isMatch = await comparePassword(currentPassword, user.password);
	if (!isMatch) {
		res.status(400);
		throw new Error('Current password is incorrect');
	}
	user.password = await hashPassword(newPassword);
	await user.save();
	res.status(200).json({ message: 'Password changed successfully' });
});

const uploadAvatar = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const user = await User.findById(userId);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	const userFound = await User.findByIdAndUpdate(
		userId,
		{ $set: { avatar: req.file.path } },
		{ new: true }
	);

	res.status(200).json({ message: 'Avatar uploaded successfully', userFound });
});

const resetPasswordInitiate = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('User not found');
	}

	const token = generatePasswordResetToken(user._id);
	await resetPasswordService(email, token);
	res.send('Password reset link has been sent.');
});

const resetPasswordFinalize = asyncHandler(async (req, res) => {
	const { token, newPassword } = req.body;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;
		const user = await User.findById(userId);

		if (!user) {
			throw new Error('Invalid token or user does not exist');
		}

		user.password = await hashPassword(newPassword);
		await user.save();
		res.send('Password has been reset successfully.');
	} catch (error) {
		console.error('Error resetting password:', error);
		res.status(400).send(error.message || 'Invalid or expired token');
	}
});

export {
	loginUser,
	registerUser,
	logoutUser,
	getMe,
	updateUser,
	getUsers,
	deleteUser,
	changePassword,
	uploadAvatar,
	resetPasswordInitiate,
	resetPasswordFinalize,
};
