import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
	const [input, setInput] = useState({
		username: '',
		password: '',
	});
	const inputHandler = (e) => {
		const key = e.target.placeholder.toLowerCase();
		setInput({
			...input,
			[key]: e.target.value,
		});
	};
	const formHandler = (e) => {
		e.preventDefault();
		console.log(input);
	};
	return (
		<Wrapper>
			<Inner>
				<h1>Log in</h1>
				<div className="line"></div>
				<StyledForm onSubmit={formHandler}>
					<input type="text" placeholder="Username" onChange={inputHandler} />
					<input
						type="password"
						placeholder="Password"
						onChange={inputHandler}
					/>
					<button type="submit">Log in</button>
				</StyledForm>
			</Inner>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: #e2e2e2;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 92vh;
	align-items: center;
	justify-content: center;
	h1 {
		font-weight: 400;
		margin-bottom: 0.5rem;
	}
	.line {
		width: 100%;
		height: 1px;
		background: #32394d;
		margin-bottom: 1rem;
	}
`;

const Inner = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	input,
	button {
		padding: 0.5rem 2rem;
		margin-bottom: 1rem;
		border-radius: 10px;
		border: solid 1px #a3a3a3;
		outline-width: 0;
		font-family: 'Montserrat', sans-serif;
		font-size: 14px;
	}
	input {
		&:focus {
			border: solid 1px #686868;
		}
	}
	button {
		cursor: pointer;
		background: #32394d;
		border: none;
		color: #e2e2e2;
	}
`;

export default Login;
