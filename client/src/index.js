import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Redux/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// React router
import { BrowserRouter as Router } from 'react-router-dom';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
