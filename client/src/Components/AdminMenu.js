import React from 'react';
// Styled
import styled from 'styled-components';
// Router
import { useHistory } from 'react-router-dom';
// Redux
import { clearProductsAction } from '../Redux/actions/productsAction';
import { clearTypesAction } from '../Redux/actions/typesAction';
import { clearUserAction } from '../Redux/actions/userAction';
import { useDispatch } from 'react-redux';

const AdminMenu = ({ showAdminMenu, setShowAdminMenu }) => {
	const history = useHistory();
	const hideMenuHandler = (str) => {
		setShowAdminMenu(!showAdminMenu);
		history.push(str);
	};
	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(clearUserAction());
		dispatch(clearTypesAction());
		dispatch(clearProductsAction());
		sessionStorage.clear();
		hideMenuHandler('/');
	};
	return (
		<StyledMenu>
			<li onClick={() => hideMenuHandler('/all_types')}>Types</li>
			<li>Users</li>
			<li>Historical</li>
			<li onClick={logOut}>Log out</li>
		</StyledMenu>
	);
};

const StyledMenu = styled.ul`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 3.4%;
	top: 10%;
	border: solid 1px #a3a3a3;
	border-radius: 10px;
	li {
		cursor: pointer;
		list-style: none;
		padding: 0.5rem 3.5rem;
		background-color: #ffffff;
		border-bottom: solid 1px #a3a3a3;
		transition: background 0.3s ease;
		&:hover {
			background: #e2e2e2;
		}
		&:last-of-type {
			border-radius: 0 0 10px 10px;
		}
		&:first-of-type {
			border-radius: 10px 10px 0 0;
		}
		a {
			text-decoration: none;
			color: black;
			background: red;
			width: 100%;
		}
	}
	:not(li:last-of-type) {
		border-bottom: none;
	}
`;

export default AdminMenu;
