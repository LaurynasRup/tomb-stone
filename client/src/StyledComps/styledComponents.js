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

export const ModalWrapper = styled.div`
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
		width: 40%;
		min-width: 500px;
		padding: 1.5rem;
		border-radius: 10px;
		background-color: rgba(255, 255, 255);
		display: flex;
		flex-direction: column;
		@media (max-width: 600px) {
			font-size: 1rem;
			min-width: 350px;
		}

		h1 {
			font-weight: 400;
			margin-bottom: 0.5rem;
		}

		.line {
			width: 100%;
			height: 1px;
			background: #32394d;
			margin-bottom: 1.5rem;
		}
	}
`;

export const StyledForm = styled.form`
	.form-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		.form-control {
			display: flex;
			flex-direction: column;
			width: 49%;
		}
		.form-control-inline {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.form-control input {
			width: 100%;
			padding: 0.15rem 1rem;
			font-family: 'Montserrat', sans-serif;
			font-size: 1rem;
			border-radius: 10px;
			letter-spacing: 1px;
			border: solid 1px #a3a3a3;
			outline-width: 0;
			::-webkit-input-placeholder {
				font-size: 0.8rem;
			}
			::-moz-placeholder {
				font-size: 0.8rem;
			}
			:-ms-input-placeholder {
				font-size: 0.8rem;
			}
			:-moz-placeholder {
				font-size: 0.8rem;
			}
			@media (max-width: 600px) {
				font-size: 0.9rem;
				padding: 0.15rem 0.5rem;
				letter-spacing: 0px;
			}
			&:focus {
				border: solid 1px black;
			}
		}

		.form-control-inline input {
			width: auto;
		}

		.form-control label {
			padding: 0 0 0.3rem 0.2rem;
			font-size: 1.2rem;
			@media (max-width: 600px) {
				font-size: 0.9rem;
			}
		}
	}
`;
