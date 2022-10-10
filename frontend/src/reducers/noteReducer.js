import { createSlice } from '@reduxjs/toolkit';

// const initialState = async () => {
// 	const notes = await noteService.getAll();
// 	return notes;
// };

// const initialState = [
// 	{
// 		content: 'reducer defines how redux store works',
// 		important: true,
// 		id: 1,
// 	},
// 	{
// 		content: 'state of store can contain any data',
// 		important: false,
// 		id: 2,
// 	},
// ];

// const noteReducer = (state = initialState, action) => {
// 	if (action.type === 'NEW_NOTE') {
// 		return [...state, action.data];
// 	} else if (action.type === 'TOGGLE_IMPORTANCE') {
// 		const id = action.data.id;
// 		const noteToChange = state.find((n) => n.id === id);
// const changedNote = {
// 	...noteToChange,
// 	important: !noteToChange.important,
// };
// 		return state.map((note) => (note.id !== id ? note : changedNote));
// 	}
// 	return state;
// };

// const generateId = () => Number(Math.random() * 1000000).toFixed(0);

const noteSlice = createSlice({
	name: 'notes',
	initialState: [],
	reducers: {
		createNote(state, action) {
			const newNote = action.payload;
			state.push(newNote);
		},
		toggleImportanceOf(state, action) {
			const id = action.payload;
			const noteToChange = state.find((n) => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};
			return state.map((note) => (note.id !== id ? note : changedNote));
		},
		appendNote(state, action) {
			state.push(action.payload);
		},
		setNotes(state, action) {
			return action.payload;
		},
	},
});

// export const createNote = (content) => {
// 	return {
// 		type: 'NEW_NOTE',
// 		data: {
// 			content,
// 			important: false,
// 			id: generateId(),
// 		},
// 	};
// };

// export const toggleImportanceOf = (id) => {
// 	return {
// 		type: 'TOGGLE_IMPORTANCE',
// 		data: { id },
// 	};
// };

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
	noteSlice.actions;
export default noteSlice.reducer;
