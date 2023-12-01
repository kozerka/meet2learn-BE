import asyncHandler from 'express-async-handler';
import Note from '../models/Note.js';

const createNote = asyncHandler(async (req, res) => {
	const { title, content, tags } = req.body;

	const newNote = new Note({
		user: req.user._id,
		title,
		content,
		tags,
	});

	const savedNote = await newNote.save();
	res.status(201).json(savedNote);
});

const getAllNotes = asyncHandler(async (req, res) => {
	const { page = 1, limit = 6, tag } = req.query;

	const query = { user: req.user._id };
	if (tag) {
		query.tags = tag;
	}

	const total = await Note.countDocuments(query);
	const notes = await Note.find(query)
		.sort({ _id: -1 })
		.limit(limit)
		.skip((page - 1) * limit);

	res.json({
		total,
		pages: Math.ceil(total / limit),
		currentPage: page,
		notes,
	});
});

const getUniqueTags = asyncHandler(async (req, res) => {
	try {
		const result = await Note.aggregate([
			{ $match: { user: req.user._id } },
			{ $unwind: '$tags' },
			{ $group: { _id: '$tags' } },
			{ $project: { _id: 0, tag: '$_id' } },
		]);

		const tags = result.map((t) => t.tag);
		res.json(tags);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

const getNoteById = asyncHandler(async (req, res) => {
	const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

	if (!note) {
		res.status(404);
		throw new Error('Note not found or you do not have permission to view it');
	}

	res.json(note);
});

const deleteNote = asyncHandler(async (req, res) => {
	const note = await Note.findOneAndDelete({
		_id: req.params.id,
		user: req.user._id,
	});

	if (!note) {
		res.status(404);
		throw new Error(
			'Note not found or you do not have permission to delete it'
		);
	}

	res.json({ message: 'Note deleted' });
});

const updateNote = asyncHandler(async (req, res) => {
	const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

	if (!note) {
		res.status(404);
		throw new Error(
			'Note not found or you do not have permission to update it'
		);
	}

	if (req.body.title !== undefined && req.body.title.trim() !== '') {
		note.title = req.body.title;
	}

	if (req.body.content !== undefined && req.body.content.trim() !== '') {
		note.content = req.body.content;
	}

	if (req.body.tags !== undefined && Array.isArray(req.body.tags)) {
		note.tags = req.body.tags;
	}

	const updatedNote = await note.save();
	res.json(updatedNote);
});

export {
	createNote,
	getAllNotes,
	getNoteById,
	deleteNote,
	updateNote,
	getUniqueTags,
};
