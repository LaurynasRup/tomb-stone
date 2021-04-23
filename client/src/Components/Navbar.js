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
	const { name, userType, loggedIn } = useSelector((state) => state.user);

	const [showAdminMenu, setShowAdminMenu] = useState(false);
	const adminMenuHandler = () => setShowAdminMenu(!showAdminMenu);
	const history = useHistory();
	const redirectHomeHandler = () => {
		if (loggedIn) {
			history.push('/home');
		} else {
			history.push('/');
		}
	};
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
		setShowAdminMenu(false);
	};
	return (
		<>
			<StyledNav>
				<div className="inner">
					<div className="logo" onClick={redirectHomeHandler}>
						Don <strong>Stone</strong>
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
				<AdminMenu
					showAdminMenu={showAdminMenu}
					setShowAdminMenu={setShowAdminMenu}
					hideMenuHandler={hideMenuHandler}
					logOut={logOut}
				/>
			)}
		</>
	);
};

const StyledNav = styled.nav`
	height: 8vh;
	width: 100%;
	min-width: 400px;
	background: #32394d;
	color: #e2e2e2;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	.inner {
		width: 100%;
		max-width: 1200px;
		/* min-width: 400px; */
		padding: 0.5rem 3rem;
		min-width: 350px;
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
