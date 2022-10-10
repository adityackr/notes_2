import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import App from './App';
import store from './store';

// noteService.getAll().then((notes) => {
// 	notes.forEach((note) => store.dispatch(setNotes(note)));
// });

// const notes = [
// 	{
// 		id: 1,
// 		content: 'HTML is easy',
// 		date: '2019-05-30T17:30:31.098Z',
// 		important: true,
// 	},
// 	{
// 		id: 2,
// 		content: 'Browser can execute only JavaScript',
// 		date: '2019-05-30T18:39:34.091Z',
// 		important: false,
// 	},
// 	{
// 		id: 3,
// 		content: 'GET and POST are the most important methods of HTTP protocol',
// 		date: '2019-05-30T19:20:14.298Z',
// 		important: true,
// 	},
// ];

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
);

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(filterChange('IMPORTANT'));
// store.dispatch(
// 	createNote('combineReducers forms one reducer from many simple reducers')
// );
