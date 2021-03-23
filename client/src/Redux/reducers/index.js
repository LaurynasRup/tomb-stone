import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import productsReducer from '../reducers/productsReducer';
import typesReducer from '../reducers/typesReducer';

const rootReducer = combineReducers({
	user: userReducer,
	products: productsReducer,
	types: typesReducer,
});

export default rootReducer;
