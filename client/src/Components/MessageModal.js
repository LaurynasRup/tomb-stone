import React from 'react';
// Components
import { BtnLink } from './Button';
// Styled
import styled from 'styled-components';

const SuccessModal = ({ msg, link, linkTxt }) => {
	return (
		<ModalOuter>
			<div className="inner">
				<p>{msg}</p>
				<BtnLink link={link}>{linkTxt}</BtnLink>
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
`;

export default SuccessModal;
