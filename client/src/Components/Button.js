import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = ({ link, children }) => {
	return (
		<Link to={link} style={{ textDecoration: 'none' }}>
			<StyledButton>{children}</StyledButton>
		</Link>
	);
};

const StyledButton = styled.button`
	cursor: pointer;
	padding: 0.1rem 2rem;
	font-family: 'Montserrat', sans-serif;
	font-size: 1rem;
	border-radius: 10px;
	border: solid 1px #32394d;
	background: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 400;
	color: #32394d;
	transition: all 0.3s ease;
	outline-width: 0;
	&:hover {
		color: white;
		background: #32394d;
	}
`;

export default Button;
