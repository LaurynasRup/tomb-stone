import axios from 'axios';

const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

const loginUserRequest = () => {
	return {
		type: LOGIN_USER_REQUEST,
	};
};

const loginUserSuccess = (user) => {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: {
			user,
		},
	};
};

const loginUserFailure = (error) => {
	return {
		type: LOGIN_USER_FAILURE,
		payload: error,
	};
};

export const loginAction = (userData) => async (dispacth) => {
	try {
		dispacth(loginUserRequest());
		const userDetails = await axios.post('/api/user/login', userData);
		const user = await userDetails;
		dispacth(loginUserSuccess(user));
	} catch (err) {
		dispacth(loginUserFailure(err));
	}
};
