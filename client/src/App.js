import { useEffect } from 'react';
// Components
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProductView from './Pages/ProductView';
import ProductEdit from './Pages/ProductEdit';
// Functions
import { autoLogin } from './functions/autoLogin';
// React router
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Action
import { loginByIdAction } from './Redux/actions/userAction';

function App() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { loggedIn } = useSelector((state) => state.user);

	const loginOrRedirect = () => {
		//Auto login by id
		autoLogin(dispatch, loginByIdAction);
		// If not looged in redirect to login page
		if (location.pathname !== '/') {
			if (!loggedIn) {
				history.push('/');
			}
		}
	};
	useEffect(loginOrRedirect, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Login />
				</Route>
				<Route path="/home">
					<Home />
				</Route>
				{loggedIn && (
					<>
						<Route path="/product_view/">
							<ProductView />
						</Route>
						<Route path="/product_edit/">
							<ProductEdit />
						</Route>
					</>
				)}
			</Switch>
		</div>
	);
}

export default App;
