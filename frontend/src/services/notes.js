import axios from 'axios';

const basUrl = 'http://localhost:3001/notes';

// let token = null;

// const setToken = (newToken) => {
// 	token = `bearer ${newToken}`;
// };

const getAll = async () => {
	const response = await axios.get(basUrl);
	return response.data;
};

const create = async (content) => {
	// const config = {
	// 	headers: { Authorization: token },
	// };
	// const request = axios.post(basUrl, newObject, config);
	// return request.then((response) => response.data);
	const object = { content, important: false };
	const response = await axios.post(basUrl, object);
	return response.data;
};

const update = (id, newObject) => {
	const request = axios.put(`${basUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export default { getAll, create, update };
