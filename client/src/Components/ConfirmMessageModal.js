import React from 'react';
// Styled
import styled from 'styled-components';
// Components
import { BtnGreen, BtnRed } from './Button';

const ConfirmMessageModal = ({ msg, cancelHandler, confirmHandler }) => {
	return (
		<Wrapper>
			<div className="inner">
				<p>{msg}</p>
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
			margin-bottom: 1.5rem;
			text-align: center;
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
