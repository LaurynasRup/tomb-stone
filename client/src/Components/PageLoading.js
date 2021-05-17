import React from 'react';
import styled, { keyframes } from 'styled-components';

const PageLoading = () => {
	return (
		<Wrapper>
			<div className="container">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</Wrapper>
	);
};
const loadAnim = keyframes`
    0% {
        transform: translateY(0px)
    }
    100% {
        transform: translateY(-15px)
    }
    
`;

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	.container {
		display: flex;
		div {
			height: 10px;
			width: 10px;
			border-radius: 50%;
			background: white;
			margin: 0 5px;
			animation: ${loadAnim} 0.4s ease-in-out infinite alternate;
			&:nth-of-type(2) {
				animation-delay: 0.1s;
			}
			&:nth-of-type(3) {
				animation-delay: 0.2s;
			}
		}
	}
`;
export default PageLoading;
