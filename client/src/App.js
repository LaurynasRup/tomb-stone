import { useEffect, useState } from 'react';
// Components
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
// React router
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';

function App() {
	// const [userDetails, setUserDetails] = useState({
	// 	username: 'Laurynas',
	// 	userType: 'admin',
	// 	loggedIn: false,
	// });
	// Redirect if not logged in
	const location = useLocation();
	const history = useHistory();
	const { loggedIn } = useSelector((state) => state.user);
	useEffect(() => {
		if (location.pathname !== '/') {
			if (!loggedIn) {
				history.push('/');
			}
		}
	}, [location, history, loggedIn]);
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
			</Switch>
		</div>
	);
}

export default App;
