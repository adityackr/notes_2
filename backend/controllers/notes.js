const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (req, res) => {
	Note.find({}).then((notes) => res.json(notes));
});

notesRouter.get('/:id', (req, res) => {
	Note.findById(req.params.id)
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(400).send({ error: 'malformated data' });
		});
});

notesRouter.post('/', (req, res, next) => {
	const body = req.body;

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	});

	note
		.save()
		.then((savedNote) => res.json(savedNote))
		.catch((err) => next(err));
});

notesRouter.delete('/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch((error) => next(error));
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
