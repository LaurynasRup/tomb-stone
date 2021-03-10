import React from 'react';
import styled from 'styled-components';

const AdminMenu = () => {
	return (
		<StyledMenu>
			<li>
				<a>Products</a>
			</li>
			<li>
				<a>Users</a>
			</li>
			<li>
				<a>Historical</a>
			</li>
			<li>
				<a>Log out</a>
			</li>
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
	}
	:not(li:last-of-type) {
		border-bottom: none;
	}
`;

export default AdminMenu;
