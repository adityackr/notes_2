import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import Note from './Note';

const Notes = () => {
	const dispatch = useDispatch();
	const notes = useSelector(({ filter, notes }) => {
		if (filter === 'ALL') {
			console.log(notes);
			return notes;
		}

		return filter === 'IMPORTANT'
			? notes.filter((note) => note.important)
			: notes.filter((note) => !note.important);
	});
	return (
		<div>
			<ul>
				{notes.map((note) => (
					<Note
						key={note.id}
						note={note}
						handleClick={() => dispatch(toggleImportanceOf(note.id))}
					/>
				))}
			</ul>
		</div>
	);
};

export default Notes;
