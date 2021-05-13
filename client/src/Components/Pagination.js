import styled from 'styled-components';

const Pagination = ({ spltArray, countHandler }) => {
	return (
		<>
			{spltArray.length > 1 && (
				<Wrapper>
					<div className="inner_wrapper">
						<select name="pagination" id="pagination" onChange={countHandler}>
							{spltArray.map((item, idx) => (
								<option value={idx + 1} key={idx}>
									Page {idx + 1}
								</option>
							))}
						</select>
					</div>
				</Wrapper>
			)}
		</>
	);
};

const Wrapper = styled.div`
	width: 100;
	margin: 1rem 0;
	display: flex;
	justify-content: center;

	.inner_wrapper {
		display: flex;
		align-items: center;
	}

	.inner_wrapper #pagination {
		cursor: pointer;
		padding: 0.1rem 1rem;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		border-radius: 10px;
		letter-spacing: 1px;
		border: solid 1px #32394d;
		outline-width: 0;
		@media (max-width: 600px) {
			font-size: 0.9rem;
			padding: 0.1rem 0.3rem;
		}
	}
`;

export default Pagination;
