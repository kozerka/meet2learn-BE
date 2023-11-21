import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { comparePassword, hashPassword } from '../utils/hashPasswordHelper.js';

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
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});
//działa
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
	const hashedPassword = await hashPassword(password);
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
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

	const updatedUser = await User.findByIdAndUpdate(userId, update, {
		new: true,
		runValidators: true,
	});

	if (!updatedUser) {
		res.status(404);
		throw new Error('User not found');
	}

	res.json(updatedUser);
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

export {
	loginUser,
	registerUser,
	logoutUser,
	getMe,
	updateUser,
	getUsers,
	deleteUser,
	changePassword,
};
