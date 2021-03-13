const initialState = {
	name: '',
	username: '',
	userType: '',
	loggedIn: false,
	loading: false,
	token: '',
	error: '',
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'LOGIN_USER_SUCCESS':
			return {
				...state,
				name: action.payload.user.data.user.name,
				username: action.payload.user.data.user.username,
				userType: action.payload.user.data.user.username ? 'admin' : 'regular',
				loggedIn: action.payload.user.data.token !== '' ? true : false,
				loading: false,
				token: action.payload.user.data.token,
				error: '',
			};
		case 'LOGIN_USER_FAILURE':
			return {
				...initialState,
				loading: false,
				error: action.payload.response.data.msg,
			};
		default:
			return { ...state };
	}
};

export default userReducer;
