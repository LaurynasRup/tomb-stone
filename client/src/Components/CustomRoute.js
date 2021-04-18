import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomRoute = (props) => {
	const { loggedIn } = useSelector((state) => state.user);
	if (loggedIn) {
		return <Route {...props} />;
	}
	return <Redirect to="/" />;
};

export default CustomRoute;
