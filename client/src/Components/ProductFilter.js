import React from 'react';
//Icons
import { FaSlidersH } from 'react-icons/fa';
// Styled
import styled from 'styled-components';

const ProductFilter = ({ sortHandler, showFilter, displayFilterHandler }) => {
	return (
		<div>
			<FilterWrapper showFilter={showFilter}>
				<div className="filter">
					<Btn showFilter={showFilter} onClick={displayFilterHandler}>
						<FaSlidersH size={20} />
					</Btn>
					<select id="product_sort" onChange={sortHandler}>
						<option value="">-- Sort by --</option>
						<option value="length_asc">Length &nbsp;&uarr;</option>
						<option value="length_desc">Length &nbsp;&darr;</option>
						<option value="height_asc">Height &nbsp;&uarr;</option>
						<option value="height_desc">Height &nbsp;&darr;</option>
						<option value="width_asc">Width &nbsp;&uarr;</option>
						<option value="width_desc">Width &nbsp;&darr;</option>
					</select>
				</div>
			</FilterWrapper>
		</div>
	);
};

const FilterWrapper = styled.div`
	margin-bottom: ${(props) => (props.showFilter ? '0' : '1rem')};
	display: flex;
	flex-direction: column;

	.filter {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		/* min-width: 250px; */
	}

	.filter #product_sort {
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

const Btn = styled.button`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.2rem;
	border: solid 1px #32394d;
	border-radius: 5px;
	background: ${(props) => (props.showFilter ? '#32394d' : 'transparent')};

	outline-width: 0;
	transition: all 0.2s ease;
	svg {
		transition: color 0.2s ease;
		color: ${(props) => (props.showFilter ? '#e2e2e2' : '#32394d')};
	}
	&:hover {
		background: #32394d;
		svg {
			color: #e2e2e2;
		}
	}
`;

export default ProductFilter;
