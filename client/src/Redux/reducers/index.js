import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import productsReducer from '../reducers/productsReducer';
import typesReducer from '../reducers/typesReducer';
import allUsersReducer from '../reducers/allUsersReducer';
import historicalProductsReducer from '../reducers/historicalReducer';

const rootReducer = combineReducers({
	user: userReducer,
	products: productsReducer,
	types: typesReducer,
	users: allUsersReducer,
	historical_products: historicalProductsReducer,
});

export default rootReducer;
