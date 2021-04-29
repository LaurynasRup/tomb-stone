import React from 'react';
// Styled
import styled from 'styled-components';

const AdminMenu = ({ hideMenuHandler, logOut }) => {
	return (
		<ListWrapper>
			<StyledMenu>
				<li onClick={() => hideMenuHandler('/all_types')}>Types</li>
				<li onClick={() => hideMenuHandler('/all_users')}>Users</li>
				<li onClick={logOut}>Log out</li>
			</StyledMenu>
		</ListWrapper>
	);
};

const ListWrapper = styled.div`
	width: 100%;
	min-width: 375px;
	background: #32394d;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #e2e2e2;
`;

const StyledMenu = styled.ul`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 1200px;
	padding: 0 3rem;
	min-width: 375px;
	font-size: 1rem;
	font-weight: 300;
	li {
		text-align: center;
		cursor: pointer;
		list-style: none;
		padding: 1rem 0;
		&:first-of-type {
			text-align: left;
			@media (max-width: 600px) {
				border-top: none;
				text-align: center;
			}
		}
		&:last-of-type {
			text-align: right;
			@media (max-width: 600px) {
				text-align: center;
			}
		}
		&:hover {
			color: #c9c9c9;
		}
		@media (max-width: 600px) {
			padding: 1rem 0;
			border-top: solid 1px #fff;
		}
	}
	:not(li:last-of-type) {
		border-bottom: none;
	}
	@media (max-width: 600px) {
		font-size: 1rem;
		padding: 0rem 1.5rem;
		flex-direction: column;
	}
`;

export default AdminMenu;
