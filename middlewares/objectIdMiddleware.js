import mongoose from 'mongoose';

export const objectId = (idToCheck) => (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
		return res.status(400).json({ msg: 'Invalid ID' });
	next();
};
