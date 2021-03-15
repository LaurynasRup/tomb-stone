import React, { useState } from 'react';
import styled from 'styled-components';
import { BsChevronDown } from 'react-icons/bs';
// Components
import AdminMenu from '../Components/AdminMenu';
// Redux
import { useSelector } from 'react-redux';
// Router
import { useHistory } from 'react-router-dom';

const Navbar = () => {
	//Retrieve user details
	const { name, userType, loggedIn } = useSelector((state) => state.user);

	const [showAdminMenu, setShowAdminMenu] = useState(false);
	const adminMenuHandler = () => setShowAdminMenu(!showAdminMenu);
	const history = useHistory();
	const redirectHomeHandler = () => {
		history.push('/home');
	};
	return (
		<>
			<StyledNav>
				<div className="logo" onClick={redirectHomeHandler}>
					Company <strong>Name</strong>
				</div>
				{loggedIn && (
					<ul>
						<li>
							<p className="username">{name.split(' ')[0]}</p>
						</li>
						{userType === 'admin' && (
							<li>
								<p className="admin-menu" onClick={adminMenuHandler}>
									<span>Admin Menu</span> <BsChevronDown />
								</p>
							</li>
						)}
						{userType === 'regular' && (
							<li>
								<p className="regular-menu">
									<span>Log out</span>
								</p>
							</li>
						)}
					</ul>
				)}
			</StyledNav>
			{showAdminMenu && <AdminMenu />}
		</>
	);
};

const StyledNav = styled.nav`
	height: 8vh;
	width: 100%;
	min-width: 600px;
	display: flex;
	padding: 0.5rem 3rem;
	align-items: center;
	justify-content: space-between;
	background: #32394d;
	color: #e2e2e2;
	font-size: 1.2rem;
	.logo {
		cursor: pointer;
	}
	ul {
		display: flex;
		font-weight: 300;
		li {
			list-style: none;
			padding: 0 1rem;
			.username {
				color: #c9c9c9;
			}
			.admin-menu {
				display: flex;
				align-items: flex-end;
				cursor: pointer;
				span {
					padding: 0 0.5rem;
				}
			}
			.regular-menu {
				cursor: pointer;
			}
		}
	}
`;

export default Navbar;
