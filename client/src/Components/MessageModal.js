import React from 'react';
// Components
import { BtnLink, Btn } from './Button';
// Styled
import styled from 'styled-components';

const SuccessModal = ({ msg, link, linkTxt, handler, handlerText }) => {
	return (
		<ModalOuter>
			<div className="inner">
				<p>{msg}</p>
				{!handler && (
					<div className="btns">
						<BtnLink link={link}>{linkTxt}</BtnLink>
					</div>
				)}
				{handler && msg === 'Could not add new product' && (
					<BtnLink link={link}>{linkTxt}</BtnLink>
				)}
				{handler && msg !== 'Could not add new product' && (
					<div className="btns">
						<BtnLink link={link}>{linkTxt}</BtnLink>
						<Btn handler={handler}>{handlerText}</Btn>
					</div>
				)}
			</div>
		</ModalOuter>
	);
};

const ModalOuter = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
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
		}
	}

	.btns {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
`;

export default SuccessModal;
