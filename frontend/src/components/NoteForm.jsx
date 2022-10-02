import { useState } from 'react';
import SubmitButton from './SubmitButton';

const NoteForm = ({ createNote }) => {
	const [newNote, setNewNote] = useState('');

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const addNote = (e) => {
		e.preventDefault();
		createNote({
			content: newNote,
			important: false,
		});
		setNewNote('');
	};

	return (
		<div>
			<h2>Create a new note</h2>

			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<SubmitButton text={'Save'} />
			</form>
		</div>
	);
};

export default NoteForm;
