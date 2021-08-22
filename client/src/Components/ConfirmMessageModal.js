import React from 'react';
// Styled
import styled from 'styled-components';
// Components
import { BtnGreen, BtnRed } from './Button';

const ConfirmMessageModal = ({
	msg,
	cancelHandler,
	confirmHandler,
	input = false,
	confirmModalInputHandler = null,
	confirmModalInput = null,
}) => {
	return (
		<Wrapper>
			<div className="inner">
				<p>{msg}</p>
				{input && (
					<>
						<input
							type="text"
							placeholder="Enter Reason"
							className={`${'delete-reason'} ${
								confirmModalInput.inputError || confirmModalInput.lengthError
									? 'error'
									: ''
							}`}
							onChange={
								confirmModalInputHandler ? confirmModalInputHandler : null
							}
						/>
						{confirmModalInput.inputError && (
							<small>* Reason is required</small>
						)}
						{confirmModalInput.lengthError && (
							<small>* Minimum 5 characters</small>
						)}
					</>
				)}
				<div className="btns">
					<BtnRed handler={cancelHandler}>Cancel</BtnRed> <span>&nbsp;</span>
					<BtnGreen handler={confirmHandler}>Confirm</BtnGreen>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 10;
	.inner {
		padding: 1.5rem;
		border-radius: 10px;
		background-color: rgba(255, 255, 255);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		p {
			font-size: 1.3rem;
			margin-bottom: 1rem;
			text-align: center;
		}

		.delete-reason {
			width: 100%;
			padding: 0.3rem 1rem;
			margin-bottom: 1rem;
			font-size: 1rem;
			font-family: 'Montserrat', sans-serif;
			border-radius: 10px;
			letter-spacing: 1px;
			border: solid 1px #a3a3a3;
			outline-width: 0;
		}
		.delete-reason.error {
			border: solid 1px #8b240a;
		}

		small {
			color: #8b240a;
			margin-bottom: 1rem;
			width: 100%;
			padding-left: 0.5rem;
		}
	}
	.btns {
		width: 100%;
		display: flex;
		justify-content: space-around;

		.second {
			margin-left: 1rem;
		}
	}
`;

export default ConfirmMessageModal;
