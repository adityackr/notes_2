import axios from 'axios';

const basUrl = 'http://localhost:3001/notes';

const getAll = () => {
	const request = axios.get(basUrl);
	const nonExisting = {
		id: 10000,
		content: 'This is not saved to server',
		date: '2022-09-12T10:40:33.552Z',
		important: true,
	};
	return request.then((response) => [...response.data, nonExisting]);
};

const create = (newObject) => {
	const request = axios.post(basUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${basUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export default { getAll, create, update };
