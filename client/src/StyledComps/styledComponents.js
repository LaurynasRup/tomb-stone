import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	height: 92vh;
	padding: 3rem;
	overflow: ${(props) => (props.imgOpen ? 'hidden' : 'auto')};
	margin: 0 auto;
	h1 {
		font-weight: 400;
		margin-bottom: 1rem;
		@media (max-width: 600px) {
			font-size: 1.5rem;
		}
	}
	.line {
		width: 100%;
		max-width: 1200px;
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

export const StyledTable = styled.table`
	border-collapse: collapse;
	width: 100%;
	th {
		border-top: solid 1px #5c5c5c;
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;
		text-align: left;
		font-weight: 600;
		background: #d6d6d6;
		min-width: 120px;
	}
	tbody {
		tr {
			transition: background 0.2s ease;
			&:hover {
				background: #eeeeee;
			}
		}
	}
	td {
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;
		cursor: pointer;
	}
`;

export const BtnContCntr = styled.div`
	padding-top: 1.5rem;
	width: 100%;
	display: flex;
	justify-content: center;
`;
