const initialState = {
	users: [],
	isLoading: false,
	error: '',
};

const allUsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_USERS_REQUEST':
		case 'ADD_USER_REQUEST':
		case 'DELETE_USER_REQUEST':
		case 'UPDATE_USER_REQUEST':
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
		case 'ADD_USER_SUCCESS':
			return {
				...state,
				isLoading: false,
				users: [action.payload.user.data.user, ...state.users],
				error: '',
			};
		case 'DELETE_USER_SUCCESS':
			return {
				...state,
				isLoading: false,
				error: '',
			};
		case 'UPDATE_USER_SUCCESS':
			return {
				...state,
				isLoading: false,
				error: '',
			};
		case 'FETCH_USERS_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		case 'ADD_USER_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		case 'DELETE_USER_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		case 'UPDATE_USER_ERROR':
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
