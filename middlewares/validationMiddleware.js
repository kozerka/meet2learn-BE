import { body } from 'express-validator';

export const validateConversation = [
	body('title')
		.isLength({ min: 3 })
		.withMessage('Title must be at least 3 characters long'),
	body('text')
		.isLength({ min: 15 })
		.withMessage('Text content must be at least 15 characters long'),
];

export const validateLogin = [
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email'),
	body('password').notEmpty().withMessage('Password is required'),
];

export const validateRegister = [
	body('name')
		.notEmpty()
		.withMessage('Name is required')
		.isLength({ min: 5 })
		.withMessage('Name must be at least 5 characters long')
		.matches(/^[A-Za-z0-9]+$/)
		.withMessage('Name can not contain special characters or spaces'),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format')
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) {
				throw new Error('Email already exists');
			}
		}),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
		.withMessage(
			'Password must include one lowercase letter, one uppercase letter, one number, and one special character'
		),
];

export const validateTutorInputs = [
	body('subjects').notEmpty().withMessage('Subjects are required'),

	body('experiences').notEmpty().withMessage('Experiences are required'),

	body('bio')
		.notEmpty()
		.withMessage('Bio is required')
		.isLength({ min: 25 })
		.withMessage('Bio must be at least 25 characters long')
		.isLength({ max: 500 })
		.withMessage('Bio must not exceed 500 characters'),
];

export const validateNote = [
	body('title')
		.notEmpty()
		.withMessage('Title is required')
		.isLength({ max: 100 })
		.withMessage('Title must not exceed 100 characters'),

	body('content').notEmpty().withMessage('Content is required'),
];
