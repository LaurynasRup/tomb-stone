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
	try {
		dispatch(fetchTypesRequest());
		const allTypes = await axios.get('/api/types/all_types');
		dispatch(fetchTypesSuccess(allTypes.data));
	} catch (err) {
		dispatch(fetchTypesFailure(err));
		console.log(err.response);
	}
};

/* ADD NEW TYPES */

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

export const addNewTypeAction = (obj) => async (dispatch) => {
	try {
		dispatch(addTypeRequest());
		await axios.post('/api/types/add_type', obj);
		dispatch(addTypeSuccess());
	} catch (error) {
		dispatch(addTypeFailure(error));
	}
};
