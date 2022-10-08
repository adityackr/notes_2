// import { useEffect, useRef, useState } from 'react';
// import Footer from './components/Footer';
// import LoginForm from './components/LoginForm';
// import Note from './components/Note';
// import NoteForm from './components/NoteForm';
// import Notification from './components/Notification';
// import Togglable from './components/Togglable';
// import loginService from './services/login';
// import noteService from './services/notes';

// const App = () => {
// 	const [notes, setNotes] = useState([]);
// 	const [showAll, setShowAll] = useState(true);
// 	const [errorMessage, setErrorMessage] = useState('');
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [user, setUser] = useState(null);

// 	const noteFormRef = useRef();

// 	useEffect(() => {
// 		noteService.getAll().then((initialNotes) => {
// 			setNotes(initialNotes);
// 		});
// 	}, []);

// 	useEffect(() => {
// 		const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
// 		if (loggedUserJSON) {
// 			const user = JSON.parse(loggedUserJSON);
// 			setUser(user);
// 			noteService.setToken(user.token);
// 		}
// 	}, []);

// 	const addNote = (noteObject) => {
// 		noteFormRef.current.toggleVisibility();
// 		noteService
// 			.create(noteObject)
// 			.then((returnedNote) => {
// 				setNotes([...notes, returnedNote]);
// 			})
// 			.catch((error) => {
// 				setErrorMessage(error.response.data.error);
// 				setTimeout(() => setErrorMessage(null), 5000);
// 			});
// 	};

// 	const toggleImportanceOf = (id) => {
// 		const note = notes.find((n) => n.id === id);
// 		const changeNote = { ...note, important: !note.important };

// 		noteService
// 			.update(id, changeNote)
// 			.then((returnedNote) => {
// 				setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
// 			})
// 			.catch(() => {
// 				setErrorMessage(
// 					`Note '${note.content}' was already deleted from the server`
// 				);
// 				setTimeout(() => setErrorMessage(null), 5000);
// 				setNotes(notes.filter((n) => n.id !== id));
// 			});
// 	};

// 	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

// 	const handleLogin = async (e) => {
// 		e.preventDefault();

// 		try {
// 			const user = await loginService.login({ username, password });
// 			window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
// 			noteService.setToken(user.token);
// 			setUser(user);
// 			setUsername('');
// 			setPassword('');
// 		} catch (exception) {
// 			setErrorMessage('Wrong credentials');
// 			setTimeout(() => {
// 				setErrorMessage(null);
// 			}, 5000);
// 		}
// 	};

// 	const handleUsernameChange = ({ target }) => setUsername(target.value);
// 	const handlePasswordChange = ({ target }) => setPassword(target.value);

// 	const loginForm = () => {
// 		return (
// 			<Togglable buttonLabel={'Login'}>
// 				<LoginForm
// 					username={username}
// 					password={password}
// 					handleLogin={handleLogin}
// 					handleUsernameChange={handleUsernameChange}
// 					handlePasswordChange={handlePasswordChange}
// 				/>
// 			</Togglable>
// 		);
// 	};

// 	const noteForm = () => (
// 		<Togglable buttonLabel={'new note'} ref={noteFormRef}>
// 			<NoteForm createNote={addNote} />
// 		</Togglable>
// 	);

// 	return (
// 		<div>
// 			<h1>Notes</h1>
// 			{errorMessage && <Notification message={errorMessage} />}

// 			{user === null ? (
// 				loginForm()
// 			) : (
// 				<div>
// 					<p>
// 						{user.name} logged-in{' '}
// 						<button
// 							onClick={() => {
// 								window.localStorage.removeItem('loggedNoteAppUser');
// 								setUser(null);
// 							}}
// 						>
// 							Logout
// 						</button>
// 					</p>

// 					{noteForm()}
// 				</div>
// 			)}

// 			<div>
// 				<button onClick={() => setShowAll(!showAll)}>
// 					show {showAll ? 'important' : 'All'}
// 				</button>
// 			</div>
// 			<ul>
// 				{notesToShow.map((note) => (
// 					<Note
// 						key={note.id}
// 						note={note}
// 						toggleImportance={() => toggleImportanceOf(note.id)}
// 					/>
// 				))}
// 			</ul>
// 			<Footer />
// 		</div>
// 	);
// };

// export default App;
import React from 'react';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
	type: 'NEW_NOTE',
	data: {
		content: 'the app state is in redux store',
		important: true,
		id: 1,
	},
});

store.dispatch({
	type: 'TOGGLE_IMPORTANCE',
	data: {
		content: 'state changes are made with actions',
		important: false,
		id: 2,
	},
});

const App = () => {
	return (
		<div>
			<ul>
				{store.getState().map((note) => (
					<li key={note.id}>
						{note.content} <strong>{note.important ? 'important' : ''}</strong>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
