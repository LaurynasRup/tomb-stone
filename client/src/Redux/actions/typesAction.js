import axios from 'axios';

/* FETCH ALL TYPES */

const FETCH_TYPES_REQUEST = 'FETCH_TYPES_REQUEST';
const FETCH_TYPES_SUCCESS = 'FETCH_TYPES_SUCCESS';
const FETCH_TYPES_FAILURE = 'FETCH_TYPES_FAILURE';

const fetchTypesRequest = () => {
	return {
		type: FETCH_TYPES_REQUEST,
	};
};
const fetchTypesSuccess = (types) => {
	return {
		type: FETCH_TYPES_SUCCESS,
		payload: types,
	};
};
const fetchTypesFailure = (error) => {
	return {
		type: FETCH_TYPES_FAILURE,
		payload: error,
	};
};

export const typesAction = () => async (dispatch) => {
	dispatch(fetchTypesRequest());
	try {
		const allTypes = await axios.get('/api/types/all_types');
		dispatch(fetchTypesSuccess(allTypes.data));
	} catch (err) {
		dispatch(fetchTypesFailure(err));
		console.log(err.response);
	}
};

/* ADD NEW TYPE */

const ADD_TYPE_REQUEST = 'ADD_TYPE_REQUEST';
const ADD_TYPE_SUCCESS = 'ADD_TYPE_SUCCESS';
const ADD_TYPE_FAILURE = 'ADD_TYPE_FAILURE';

const addTypeRequest = () => {
	return {
		type: ADD_TYPE_REQUEST,
	};
};

const addTypeSuccess = () => {
	return {
		type: ADD_TYPE_SUCCESS,
	};
};

const addTypeFailure = (error) => {
	return {
		type: ADD_TYPE_FAILURE,
		payload: error,
	};
};

export const addNewTypeAction = (obj, fn) => async (dispatch) => {
	dispatch(addTypeRequest());
	try {
		await axios.post('/api/types/add_type', obj);
		dispatch(addTypeSuccess());
		fn('add type success');
	} catch (error) {
		dispatch(addTypeFailure(error));
		fn('add type error');
	}
};

/* DELETE NEW TYPE */

const REMOVE_TYPE_REQUEST = 'REMOVE_TYPE_REQUEST';
const REMOVE_TYPE_SUCCESS = 'REMOVE_TYPE_SUCCESS';
const REMOVE_TYPE_FAILURE = 'REMOVE_TYPE_FAILURE';

const removeTypeRequest = () => {
	return {
		type: REMOVE_TYPE_REQUEST,
	};
};

const removeTypeSuccess = () => {
	return {
		type: REMOVE_TYPE_SUCCESS,
	};
};

const removeTypeFailure = (error) => {
	return {
		type: REMOVE_TYPE_FAILURE,
		payload: error,
	};
};

export const removeTypeAction = (id, fn, public_id) => async (dispatch) => {
	dispatch(removeTypeRequest());
	try {
		await axios.post(`/api/upload_images/destroy`, { public_id });
		await axios.delete(`/api/types/delete_type/${id}`);
		dispatch(removeTypeSuccess());
		fn('delete type success');
	} catch (error) {
		dispatch(removeTypeFailure(error));
		fn('delete type error');
	}
};

/* CLEAR TYPES STATE */

const CLEAR_TYPES_STATE = 'CLEAR_TYPES_STATE';

const clearTypesState = () => {
	return {
		type: CLEAR_TYPES_STATE,
	};
};

export const clearTypesAction = () => (dispatch) => {
	dispatch(clearTypesState());
};
