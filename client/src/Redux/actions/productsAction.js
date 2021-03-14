import axios from 'axios';

const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const fetchProductsRequest = () => {
	return {
		type: FETCH_PRODUCTS_REQUEST,
	};
};

const fetchProductsSuccess = (products) => {
	return {
		type: FETCH_PRODUCTS_SUCCESS,
		payload: { products },
	};
};

const fetchProductsFailure = (error) => {
	return {
		type: FETCH_PRODUCTS_FAILURE,
		payload: error,
	};
};

export const productsAction = (token) => async (dispatch) => {
	try {
		dispatch(fetchProductsRequest());
		const allProducts = await axios.get(
			'http://localhost:5000/api/products/all_products',
			{
				headers: {
					'auth-token': token,
				},
			}
		);
		dispatch(fetchProductsSuccess(allProducts));
	} catch (err) {
		dispatch(fetchProductsFailure(err));
	}
};
