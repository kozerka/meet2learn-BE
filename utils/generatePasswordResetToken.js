import jwt from 'jsonwebtoken';

const generatePasswordResetToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '15m',
	});
};

export default generatePasswordResetToken;
