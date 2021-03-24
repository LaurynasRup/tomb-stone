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
		default:
			return { ...state };
	}
};

export default typesReducer;
