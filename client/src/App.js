import { useState } from 'react';
// Components
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
// React router
import { Switch, Route } from 'react-router-dom';

function App() {
	const [userDetails, setUserDetails] = useState({
		username: 'Laurynas',
		userType: 'admin',
		loggedIn: false,
	});
	return (
		<div className="App">
			<Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
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
