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
	const notes = await Note.find({ user: req.user._id });
	res.json(notes);
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

export { createNote, getAllNotes, getNoteById, deleteNote, updateNote };
