require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const Note = require('./models/note');

// const process = process;

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
};

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(requestLogger);

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
	Note.find({}).then((notes) => res.json(notes));
});

app.post('/api/notes', (req, res, next) => {
	const body = req.body;

	// if (body.content === undefined) {
	// 	return res.status(400).json({
	// 		error: 'content missing',
	// 	});
	// }

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

app.get('/api/notes/:id', (req, res) => {
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

app.delete('/api/notes/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch((error) => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
	const { content, important } = request.body;

	// const note = {
	// 	content: body.content,
	// 	important: body.important,
	// };

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

const errorHandler = (error, req, res, next) => {
	console.log(error.name);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
