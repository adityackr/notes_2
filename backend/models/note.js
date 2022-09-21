const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const uri = process.env.MONGODB_URI;

mongoose
	.connect(uri)
	// eslint-disable-next-line no-unused-vars
	.then((result) => {
		console.log('Connecting to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const notesSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	important: Boolean,
});

notesSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Note', notesSchema);
