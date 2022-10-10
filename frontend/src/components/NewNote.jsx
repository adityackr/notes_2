import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NewNote = (props) => {
	const addNote = async (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = '';
		props.createNote(content);
	};
	return (
		<div>
			<form onSubmit={addNote}>
				<input type="text" name={'note'} />
				<button type="submit">add</button>
			</form>
		</div>
	);
};

export default connect(null, { createNote })(NewNote);
