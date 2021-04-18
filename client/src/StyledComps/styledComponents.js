import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 92vh;
	padding: 3rem;
	overflow: ${(props) => (props.imgOpen ? 'hidden' : 'auto')};
	h1 {
		font-weight: 400;
		margin-bottom: 1rem;
		@media (max-width: 600px) {
			font-size: 1.5rem;
		}
	}
	.line {
		width: 100%;
		height: 1px;
		background: #32394d;
		margin-bottom: 1rem;
	}
	@media (max-width: 600px) {
		padding: 1.5rem;
	}
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	.btns-right {
		display: inherit;
		button {
			&:last-of-type {
				margin-left: 0.5rem;
			}
		}
	}
	.btn-red {
		border: solid 1px red;
	}
	.btn-green {
	}
`;
