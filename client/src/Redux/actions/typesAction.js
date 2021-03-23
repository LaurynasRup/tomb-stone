import axios from 'axios';

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
	}
};
