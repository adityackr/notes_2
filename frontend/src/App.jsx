import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import LoginInput from './components/LoginInput';
import Note from './components/Note';
import Notification from './components/Notification';
import SubmitButton from './components/SubmitButton';
import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('a new note...');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const addNote = (e) => {
		e.preventDefault();
		const noteObject = {
			id: notes.length + 1,
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() > 0.5,
		};

		noteService
			.create(noteObject)
			.then((returnedNote) => {
				setNotes([...notes, returnedNote]);
				setNewNote('');
			})
			.catch((error) => {
				setErrorMessage(error.response.data.error);
				setTimeout(() => setErrorMessage(null), 5000);
			});
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const toggleImportanceOf = (id) => {
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

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
			noteService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<LoginInput
				label={'username'}
				type={'text'}
				value={username}
				name={'Username'}
				onChange={({ target }) => setUsername(target.value)}
			/>
			<LoginInput
				label={'password'}
				type={'password'}
				value={password}
				name={'Password'}
				onChange={({ target }) => setPassword(target.value)}
			/>
			<SubmitButton text={'Login'} />
		</form>
	);

	const noteForm = () => (
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<SubmitButton text={'Save'} />
		</form>
	);

	return (
		<div>
			<h1>Notes</h1>
			{errorMessage && <Notification message={errorMessage} />}

			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<button
						onClick={() => {
							window.localStorage.removeItem('loggedNoteAppUser');
							setUser(null);
						}}
					>
						Logout
					</button>
					{noteForm()}
				</div>
			)}

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
			<Footer />
		</div>
	);
};

export default App;
