const initialState = {
	users: [],
	isLoading: false,
	error: '',
};

const allUsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_USERS_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'FETCH_USERS_SUCCESS':
			return {
				...state,
				isLoading: false,
				users: Object.values(action.payload.users),
				error: '',
			};
		case 'FETCH_USERS_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		default:
			return {
				...state,
			};
	}
};

export default allUsersReducer;
