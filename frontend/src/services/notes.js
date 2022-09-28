import axios from 'axios';

const basUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(basUrl);
	return request.then((response) => response.data);
};

const create = (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.post(basUrl, newObject, config);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${basUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
