const initialState = {
	products: [],
	isLoading: false,
	error: '',
};

const historicalProductsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_HISTORICAL_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'FETCH_HISTORICAL_SUCCESS':
			return {
				...state,
				products: Object.values(action.payload.products.data),
				isLoading: false,
			};
		case 'FETCH_HISTORICAL_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		default: {
			return {
				...state,
			};
		}
	}
};

export default historicalProductsReducer;
