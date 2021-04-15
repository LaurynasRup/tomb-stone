const initialState = {
	name: '',
	username: '',
	userType: '',
	loggedIn: false,
	loading: false,
	token: null,
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
				userType: action.payload.user.data.user.admin ? 'admin' : 'regular',
				loggedIn: findToken(action.payload),
				loading: false,
				token: action.payload.user.data.token
					? action.payload.user.data.token
					: action.payload.user.token,
				error: '',
			};
		case 'LOGIN_USER_FAILURE':
			return {
				...initialState,
				loading: false,
				error: action.payload.response.data.msg,
			};
		case 'CLEAR_USER_STATE':
			return {
				...initialState,
			};
		default:
			return { ...state };
	}
};

const findToken = (payload) => {
	if (payload.user.data.token) {
		return true;
	} else {
		if (payload.user.token) {
			return true;
		} else {
			return false;
		}
	}
};
export default userReducer;
