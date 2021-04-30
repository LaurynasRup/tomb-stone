import styled from 'styled-components';

const FilterRow = ({ filterValuesHandler, filterSelectHandler, types }) => {
	return (
		<FilterRowCont>
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
		</FilterRowCont>
	);
};

const FilterRowCont = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 1rem 0;
	select,
	input:not(input[type='checkbox']),
	.reserved-check {
		width: 14.2%;
		min-width: 120px;
		padding: 0.1rem 1rem;
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

export default FilterRow;
