import { useState } from 'react';
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
		<div className="App">
			<Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
			<Login />
		</div>
	);
}

export default App;
