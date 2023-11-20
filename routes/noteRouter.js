import express from 'express';

const noteRouter = express.Router();

noteRouter.post('/create', auth, createNote);

noteRouter.get('/', auth, geNotes);

noteRouter.get('/:id', auth, getNoteById);

noteRouter.delete('/:id', auth, objectId('id'), deleteNote);

noteRouter.put('/edit/:id', auth, objectId('id'), updateNote);

noteRouter.put('/:id/tags', auth, objectId('id'), addTagsToNote);

noteRouter.delete('/:id/tags', auth, objectId('id'), removeTagsFromNote);

noteRouter.patch('/:id/tags', auth, objectId('id'), editTagsOfNote);

export default noteRouter;
