import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../Redux/actions/userAction';
import { useHistory } from 'react-router-dom';
// Components
import PageLoading from '../Components/PageLoading';
// Functions
import { inputErrors } from '../functions/inputErrors';

const Login = () => {
	// User form input state
	const [input, setInput] = useState({
		username: '',
		password: '',
	});
	// Error State
	const [errors, setErrors] = useState([]);
	// Extract data from redux store
	const { loading, error, loggedIn } = useSelector((state) => state.user);
	const inputHandler = (e) => {
		const key = e.target.placeholder.toLowerCase();
		setInput({
			...input,
			[key]: e.target.value,
		});
	};
	// Dispatch login action to redux store
	const dispatch = useDispatch();
	const formHandler = async (e) => {
		e.preventDefault();
		// See if form is not empty
		inputErrors(input, setErrors);
		// Dispatch action with details
		if (input.username !== '' && input.password !== '') {
			// Dispatch action
			dispatch(loginAction(input));
		}
	};
	const history = useHistory();
	useEffect(() => {
		if (loggedIn) {
			history.push('/home');
		}
	}, [loggedIn, history]);

	return (
		<>
			{loading && <PageLoading />}
			<Wrapper>
				<Inner>
					<h1>Log in</h1>
					<div className="line"></div>
					{errors.length === 0 && (
						<StyledSmall>{error !== '' ? `* ${error}` : ''}</StyledSmall>
					)}
					{errors.length !== 0 && <StyledSmall>{`* ${errors[0]}`}</StyledSmall>}
					{/* <StyledSmall>
						{errors.length !== 0 ? `* ${errors[0]}` : ''}
					</StyledSmall> */}
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
		</>
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

const StyledSmall = styled.small`
	color: #c42828;
	padding-bottom: 0.5rem;
`;

export default Login;
