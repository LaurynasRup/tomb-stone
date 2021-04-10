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
				error: action.payload.response.data.msg,
			};
		case 'UPDATE_PRODUCT_REQUEST':
		case 'ADD_PRODUCT_REQUEST':
		case 'DELETE_PRODUCT_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'UPDATE_PRODUCT_SUCCESS':
		case 'ADD_PRODUCT_SUCCESS':
		case 'DELETE_PRODUCT_SUCCESS':
			return {
				...state,
				isLoading: false,
				error: '',
			};
		case 'UPDATE_PRODUCT_FAILURE':
		case 'ADD_PRODUCT_FAILURE':
		case 'DELETE_PRODUCT_FAILURE':
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.msg,
			};
		default:
			return {
				...state,
			};
	}
};

export default productsReducer;
