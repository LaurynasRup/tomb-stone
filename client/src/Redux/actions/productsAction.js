import axios from 'axios';

/* ----- FETCH PRODUCTS ----- */

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
		const allProducts = await axios.get('/api/products/all_products', {
			headers: {
				'auth-token': token,
			},
		});
		dispatch(fetchProductsSuccess(allProducts));
	} catch (err) {
		dispatch(fetchProductsFailure(err));
	}
};

/* ----- UPDATE PRODUCT ----- */

const UDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

const updateProductRequest = () => {
	return {
		type: UDATE_PRODUCT_REQUEST,
	};
};

const updateProductSuccess = (product) => {
	return {
		type: UPDATE_PRODUCT_SUCCESS,
	};
};

const updateProductFailure = (error) => {
	return {
		type: UPDATE_PRODUCT_FAILURE,
		payload: error,
	};
};

export const updateProductAction = (token, id, obj, fn) => async (dispatch) => {
	try {
		dispatch(updateProductRequest());
		const response = await axios.patch(
			`/api/products/update_product/${id}`,
			obj,
			{
				headers: { 'auth-token': token },
			}
		);
		dispatch(updateProductSuccess());
		fn();
	} catch (error) {
		dispatch(updateProductFailure(error));
	}
};
