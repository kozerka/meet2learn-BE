import express from 'express';
import {
	createNote,
	getAllNotes,
	getNoteById,
	deleteNote,
	updateNote,
	getUniqueTags,
} from '../controllers/noteController.js';
import auth from '../middlewares/authMiddleware.js';
import { objectId } from '../middlewares/objectIdMiddleware.js';
import {
	validateNote,
	validateNoteUpdate,
} from '../middlewares/validationMiddleware.js';

const noteRouter = express.Router();

noteRouter.post('/create', auth, validateNote, createNote);

noteRouter.get('/', auth, getAllNotes);

noteRouter.get('/tags', auth, getUniqueTags);

noteRouter.get('/:id', auth, getNoteById);

noteRouter.delete('/:id', auth, objectId('id'), deleteNote);

noteRouter.patch(
	'/edit/:id',
	auth,
	objectId('id'),
	validateNoteUpdate,
	updateNote
);

export default noteRouter;
