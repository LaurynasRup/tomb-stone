import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = ({ spltArray, currentPage, countHandler }) => {
	return (
		<>
			{spltArray.length > 1 && (
				<Wrapper>
					<div className="inner_wrapper">
						<BsChevronLeft
							size={25}
							className={currentPage === 1 ? 'dec hidden' : 'dec'}
							onClick={countHandler}
						/>
						{spltArray.map((item, idx) => (
							<p
								key={idx + 1}
								className={currentPage === idx + 1 ? 'active' : ''}
							>
								{idx + 1}
							</p>
						))}
						<BsChevronRight
							size={25}
							onClick={countHandler}
							className={
								currentPage === spltArray.length ? 'inc hidden' : 'inc'
							}
						/>
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
		p {
			margin: 0 0.5rem;
			color: lightgray;
			&.active {
				color: black;
			}
		}
		svg {
			cursor: pointer;
			margin: 0 1rem;
		}
		svg.hidden {
			visibility: hidden;
		}
	}
`;

export default Pagination;
