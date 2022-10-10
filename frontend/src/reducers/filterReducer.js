const filterReducer = (state = 'ALL', action) => {
	if (action.type === 'SET_FILTER') {
		return action.filter;
	}

	return state;
};

export const filterChange = (filter) => {
	return {
		type: 'SET_FILTER',
		filter,
	};
};

export default filterReducer;
