const initialState = {
	products: [],
	isLoading: false,
	error: '',
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PRODUCTS_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'FETCH_PRODUCTS_SUCCESS':
			return {
				...state,
				isLoading: false,
				products: Object.values(action.payload.products.data),
				error: '',
			};
		case 'FETCH_PRODUCTS_FAILURE':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};

export default productsReducer;
