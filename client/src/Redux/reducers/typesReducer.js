const initialState = {
	types: [],
	isLoading: false,
	error: '',
};

const typesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_TYPES_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'FETCH_TYPES_SUCCESS':
			return {
				...state,
				isLoading: false,
				types: action.payload,
				error: '',
			};
		case 'FETCH_TYPES_FAILURE':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		case 'ADD_TYPE_REQUEST':
		case 'REMOVE_TYPE_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'ADD_TYPE_SUCCESS':
		case 'REMOVE_TYPE_SUCCESS':
			return {
				...state,
				isLoading: false,
				error: '',
			};
		case 'ADD_TYPE_FAILURE':
		case 'REMOVE_TYPE_FAILURE':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		case 'CLEAR_TYPES_STATE':
			return {
				...initialState,
			};
		default:
			return { ...state };
	}
};

export default typesReducer;
