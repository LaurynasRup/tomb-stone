import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import productsReducer from '../reducers/productsReducer';

const rootReducer = combineReducers({
	user: userReducer,
	products: productsReducer,
});

export default rootReducer;
