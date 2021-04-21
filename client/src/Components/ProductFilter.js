import React, { useState } from 'react';
//Icons
import { FaSlidersH } from 'react-icons/fa';
// Styled
import styled from 'styled-components';
// Redux
import { useSelector } from 'react-redux';

const ProductFilter = ({
	filterValuesHandler,
	filterSelectHandler,
	clearInputs,
}) => {
	// Grab product types
	const types = Object.values(useSelector((state) => state.types.types));
	// Show & hide filter
	const [showFilter, setShowFilter] = useState(false);

	const displayFilterHandler = () => {
		if (!showFilter) {
			setShowFilter(true);
		} else {
			clearInputs();
			setShowFilter(false);
		}
	};

	return (
		<div>
			<FilterWrapper showFilter={showFilter}>
				<div>
					<Btn showFilter={showFilter} onClick={displayFilterHandler}>
						<FaSlidersH size={20} />
					</Btn>
				</div>
				{showFilter && (
					<FilterRow>
						<input
							id="barcode"
							type="number"
							placeholder="Barcode..."
							onChange={filterValuesHandler}
						/>
						<select
							name="types-select"
							id="type"
							defaultValue=""
							onChange={filterSelectHandler}
						>
							<option value="" id="DEFAULT">
								Type
							</option>
							{types.map((type) => (
								<option key={type._id} id={type.type_id} value={type.type_id}>
									{type.name} - {type.type_id}
								</option>
							))}
						</select>
						<input
							id="length"
							type="number"
							placeholder="Length..."
							onChange={filterValuesHandler}
						/>
						<input
							id="height"
							type="number"
							placeholder="Height..."
							onChange={filterValuesHandler}
						/>
						<input
							id="width"
							type="number"
							placeholder="Width..."
							onChange={filterValuesHandler}
						/>
						<input
							id="place"
							type="text"
							placeholder="Place..."
							onChange={filterValuesHandler}
						/>
						<select
							name="reserved-select"
							id="reserved"
							defaultValue=""
							onChange={filterSelectHandler}
						>
							<option value="" id="DEFAULT">
								All
							</option>
							<option value={true} id="select-reserved">
								Reserved
							</option>
							<option value={false} id="select-not-reserved">
								Not Reserved
							</option>
						</select>
					</FilterRow>
				)}
			</FilterWrapper>
		</div>
	);
};

const FilterWrapper = styled.div`
	margin-bottom: ${(props) => (props.showFilter ? '0' : '1rem')};
	width: 100%;
	display: flex;
	flex-direction: column;
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

const FilterRow = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 1rem 0;
	select,
	input:not(input[type='checkbox']),
	.reserved-check {
		width: 14.2%;
		min-width: 150px;
		padding: 0.3rem 1rem;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		border-radius: 5px;
		letter-spacing: 1px;
		border: solid 1px #a3a3a3;
		outline-width: 0;
		&:focus {
			border: solid 1px black;
		}
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	.reserved-check {
		display: flex;
		align-items: center;
		label {
			color: grey;
		}
	}
`;

export default ProductFilter;
