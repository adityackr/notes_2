const Note = ({ note, handleClick }) => {
	// const label = note.important ? 'make not important' : 'make important';
	// return (
	// 	<li className="note">
	// 		{note.content}
	// 		<button onClick={toggleImportance}>{label}</button>
	// 	</li>
	// );
	return (
		<li key={note.id} onClick={handleClick}>
			{note.content} <strong>{note.important ? 'important' : ''}</strong>
		</li>
	);
};

export default Note;
