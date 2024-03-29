import React, { useState } from 'react';
import styled from 'styled-components';
import { BsChevronDown } from 'react-icons/bs';
// Components
import AdminMenu from '../Components/AdminMenu';
// Redux
import { useSelector } from 'react-redux';
import { clearProductsAction } from '../Redux/actions/productsAction';
import { clearTypesAction } from '../Redux/actions/typesAction';
import { clearUserAction } from '../Redux/actions/userAction';
import { useDispatch } from 'react-redux';
// Router
import { useHistory } from 'react-router-dom';

const Navbar = () => {
	//Retrieve user details
	const { name, userType, loggedIn } = useSelector(state => state.user);

	const [showAdminMenu, setShowAdminMenu] = useState(false);
	const adminMenuHandler = () => {
		if (showAdminMenu) {
			if (window.innerWidth < 600) {
				document.body.classList.remove('no_scroll');
			}
			setShowAdminMenu(false);
		} else {
			if (window.innerWidth < 600) {
				document.body.classList.add('no_scroll');
			}
			setShowAdminMenu(true);
		}
	};
	const history = useHistory();
	const redirectHomeHandler = () => {
		if (loggedIn) {
			history.push('/home');
		} else {
			history.push('/');
		}
		document.body.classList.remove('no_scroll');
		setShowAdminMenu(false);
	};
	const hideMenuHandler = str => {
		document.body.classList.remove('no_scroll');
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
		setShowAdminMenu(false);
	};
	return (
		<>
			<StyledNav>
				<div className="inner">
					<div className="logo" onClick={redirectHomeHandler}>
						Product <strong>Manager</strong>
					</div>
					{loggedIn && (
						<ul>
							<li>
								<p className="username">{name.split(' ')[0]}</p>
							</li>
							{userType === 'admin' && (
								<li>
									<p className="admin-menu" onClick={adminMenuHandler}>
										<span className="admin-menu-text">Admin Menu</span>{' '}
										<BsChevronDown />
									</p>
								</li>
							)}
							{userType === 'regular' && (
								<li onClick={logOut}>
									<p className="regular-menu">
										<span>Log out</span>
									</p>
								</li>
							)}
						</ul>
					)}
				</div>
			</StyledNav>
			{showAdminMenu && (
				<AdminMenu hideMenuHandler={hideMenuHandler} logOut={logOut} />
			)}
		</>
	);
};

const StyledNav = styled.nav`
	max-height: 8vh;
	height: 8vh;
	width: 100%;
	min-width: 300px;
	background: #32394d;
	color: #e2e2e2;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	@media (max-height: 415px) {
		max-height: 15vh;
		height: 15vh;
	}
	.inner {
		width: 100%;
		max-width: 1200px;
		padding: 0.5rem 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.2rem;
		@media (max-width: 600px) {
			font-size: 1rem;
			padding: 0.5rem 1.5rem;
		}
	}

	.logo {
		cursor: pointer;
	}
	ul {
		display: flex;
		font-weight: 300;
		li {
			list-style: none;
			padding: 0 1rem;
			@media (max-width: 600px) {
				padding: 0 0.5rem;
			}
			.username {
				color: #c9c9c9;
			}
			.admin-menu {
				display: flex;
				align-items: flex-end;
				cursor: pointer;
				span {
					padding: 0 0.5rem;
					@media (max-width: 600px) {
						display: none;
					}
				}
			}

			.regular-menu {
				cursor: pointer;
			}
			&:last-of-type {
				padding: 0 0 0 1rem;
			}
		}
	}
`;

export default Navbar;
