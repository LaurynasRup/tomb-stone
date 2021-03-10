import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import { getItems } from './actions/itemActions';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import Navbar from './Components/Navbar';
import Login from './Pages/Login';

function App() {
	const [userDetails, setUserDetails] = useState({
		username: 'Laurynas',
		userType: 'admin',
		loggedIn: false,
	});
	return (
		<Provider store={store}>
			<div className="App">
				<Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
				<Login />
			</div>
		</Provider>
	);
}

export default App;
