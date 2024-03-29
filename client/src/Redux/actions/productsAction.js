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

const fetchProductsSuccess = products => {
	return {
		type: FETCH_PRODUCTS_SUCCESS,
		payload: { products },
	};
};

const fetchProductsFailure = error => {
	return {
		type: FETCH_PRODUCTS_FAILURE,
		payload: error,
	};
};

export const productsAction = token => async dispatch => {
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

const updateProductSuccess = product => {
	return {
		type: UPDATE_PRODUCT_SUCCESS,
	};
};

const updateProductFailure = error => {
	return {
		type: UPDATE_PRODUCT_FAILURE,
		payload: error,
	};
};

export const updateProductAction = (token, obj, fn, id) => async dispatch => {
	try {
		dispatch(updateProductRequest());
		await axios.patch(`/api/products/update_product/${id}`, obj, {
			headers: { 'auth-token': token },
		});
		dispatch(updateProductSuccess());
		fn('update success');
	} catch (error) {
		dispatch(updateProductFailure(error));
		fn('update error');
	}
};

/* ADD NEW PRODUCT */

const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

const addProductRequest = () => {
	return {
		type: ADD_PRODUCT_REQUEST,
	};
};

const addProductSuccess = () => {
	return {
		type: ADD_PRODUCT_SUCCESS,
	};
};

const addProductFailure = error => {
	return {
		type: ADD_PRODUCT_FAILURE,
		payload: error,
	};
};

export const addProductAction = (token, obj, fn) => async dispatch => {
	try {
		dispatch(addProductRequest());
		await axios.post('/api/products/add_product', obj, {
			headers: {
				'auth-token': token,
			},
		});
		dispatch(addProductSuccess());
		fn('add success');
	} catch (err) {
		dispatch(addProductFailure(err));
		fn('add error');
	}
};

/* DELETE PRODUCT */

const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

const deleteProductRequest = () => {
	return {
		type: DELETE_PRODUCT_REQUEST,
	};
};

const deleteProductSuccess = () => {
	return {
		type: DELETE_PRODUCT_SUCCESS,
	};
};

const deleteProductFailure = err => {
	return {
		type: DELETE_PRODUCT_FAILURE,
		payload: err,
	};
};

export const deleteProductAction =
	(id, token, fn, idsArray, objHistorical) => async dispatch => {
		try {
			dispatch(deleteProductRequest());
			// Destroy images
			if (idsArray.length > 0) {
				for (const public_id of idsArray) {
					await axios.post(`/api/upload_images/destroy`, { public_id });
				}
			}
			// Add product to historical DB
			await axios.post('/api/products/add_historical', objHistorical, {
				headers: {
					'auth-token': token,
				},
			});
			// Delete product
			await axios.delete(`/api/products/delete_product/${id}`, {
				headers: {
					'auth-token': token,
				},
			});
			dispatch(deleteProductSuccess());
			fn('delete success');
		} catch (error) {
			dispatch(deleteProductFailure(error));
			fn('delete error');
		}
	};

/* CLEAR PRODUCTS STATE */

const CLEAR_PRODUCTS_STATE = 'CLEAR_PRODUCTS_STATE';

const clearProductsState = () => {
	return {
		type: CLEAR_PRODUCTS_STATE,
	};
};

export const clearProductsAction = () => dispatch => {
	dispatch(clearProductsState());
};

/* ----- FETCH HISTORICAL PRODUCTS ----- */

const FETCH_HISTORICAL_REQUEST = 'FETCH_HISTORICAL_REQUEST';
const FETCH_HISTORICAL_SUCCESS = 'FETCH_HISTORICAL_SUCCESS';
const FETCH_HISTORICAL_FAILURE = 'FETCH_HISTORICAL_FAILURE';

const fetchHistoricalRequest = () => {
	return {
		type: FETCH_HISTORICAL_REQUEST,
	};
};

const fetchHistoricalSuccess = products => {
	return {
		type: FETCH_HISTORICAL_SUCCESS,
		payload: { products },
	};
};

const fetchHistoricalFailure = error => {
	return {
		type: FETCH_HISTORICAL_FAILURE,
		payload: error,
	};
};

export const historicalAction = token => async dispatch => {
	try {
		dispatch(fetchHistoricalRequest());
		const historicalProducts = await axios.get('/api/products/all_historical', {
			headers: {
				'auth-token': token,
			},
		});
		dispatch(fetchHistoricalSuccess(historicalProducts));
	} catch (err) {
		dispatch(fetchHistoricalFailure(err));
	}
};
