import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('a new note...');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	// console.log('render', notes.length, 'notes');

	const addNote = (e) => {
		e.preventDefault();
		const noteObject = {
			id: notes.length + 1,
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() > 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes([...notes, returnedNote]);
			setNewNote('');
		});
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const toggleImportanceOf = (id) => {
		const url = `http://localhost:3001/notes/${id}`;
		const note = notes.find((n) => n.id === id);
		const changeNote = { ...note, important: !note.important };

		noteService
			.update(id, changeNote)
			.then((returnedNote) => {
				setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already deleted from the server`
				);
				setTimeout(() => setErrorMessage(null), 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			{errorMessage && <Notification message={errorMessage} />}
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'All'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">Save</button>
			</form>
			<Footer />
		</div>
	);
};

export default App;
