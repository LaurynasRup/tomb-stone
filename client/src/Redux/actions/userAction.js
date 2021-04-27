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
		sessionStorage.setItem('jwt', user.data.token);
		dispacth(loginUserSuccess(user));
	} catch (err) {
		dispacth(loginUserFailure(err));
	}
};

export const loginByIdAction = (userId, token) => async (dispacth) => {
	try {
		dispacth(loginUserRequest());
		const userDetails = await axios.post('/api/user/login_id', { userId });
		const user = await userDetails;
		const userStore = { ...user, token: token };
		dispacth(loginUserSuccess(userStore));
	} catch (err) {
		dispacth(loginUserFailure(err));
	}
};

/* CLEAR USER STATE */

const CLEAR_USER_STATE = 'CLEAR_USER_STATE';

const clearUserState = () => {
	return {
		type: CLEAR_USER_STATE,
	};
};

export const clearUserAction = () => (dispatch) => {
	dispatch(clearUserState());
};

/* FETCH ALL USERS */

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchAllUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};

const fetchAllUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: {
			users,
		},
	};
};

const fetchAllUsersFailure = (error) => {
	return {
		type: FETCH_USERS_ERROR,
		payload: error,
	};
};

export const getAllUsersAction = () => async (dispatch) => {
	dispatch(fetchAllUsersRequest());
	try {
		const allUsers = await axios.get('/api/user/all_users');
		dispatch(fetchAllUsersSuccess(allUsers.data));
	} catch (error) {
		dispatch(fetchAllUsersFailure(error));
	}
};

/* CREATE NEW USER */

const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_ERROR = 'ADD_USER_ERROR';

const addNewUserRequest = () => {
	return {
		type: ADD_USER_REQUEST,
	};
};

const addNewUserSuccess = (user) => {
	return {
		type: ADD_USER_SUCCESS,
		payload: {
			user,
		},
	};
};

const addNewUserFailure = (error) => {
	return {
		type: ADD_USER_ERROR,
		payload: error,
	};
};

export const addNewUserAction = (token, userObj, fn, fn2, errStr) => async (
	dispatch
) => {
	dispatch(addNewUserRequest());
	try {
		const user = await axios.post('/api/user/register', userObj, {
			headers: { 'auth-token': token },
		});
		dispatch(addNewUserSuccess(user));
		fn();
		fn2('add user success');
	} catch (error) {
		dispatch(addNewUserFailure(error));
		console.log(error);
		fn();
		fn2('add user error');
	}
};
