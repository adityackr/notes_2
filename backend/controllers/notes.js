const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { response } = require('../app');

const getTokeFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
	res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id);

	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}
});

notesRouter.post('/', async (req, res, next) => {
	const body = req.body;

	const token = getTokeFrom(req);
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({
			error: 'token missing or invalid',
		});
	}

	const user = await User.findById(decodedToken.id);

	const note = new Note({
		content: body.content,
		important: body.important === undefined ? false : body.important,
		date: new Date(),
		user: user._id,
	});

	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote._id);
	await user.save();
	res.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (req, res, next) => {
	const note = await Note.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

notesRouter.put('/:id', (request, response, next) => {
	const { content, important } = request.body;

	Note.findByIdAndUpdate(
		request.params.id,
		{ content, important },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => next(error));
});

module.exports = notesRouter;
