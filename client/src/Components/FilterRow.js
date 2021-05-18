import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';

const FilterRow = ({
	filterValuesHandler,
	filterSelectHandler,
	types,
	barcodeModalHandler,
	filterInputs,
}) => {
	return (
		<FilterRowCont>
			<div className="barcode-input-cont">
				<input
					id="barcode"
					type="text"
					placeholder="Barcode..."
					value={filterInputs.barcode}
					onChange={filterValuesHandler}
				/>
				<CameraBtn onClick={barcodeModalHandler}>
					<FaCamera />
				</CameraBtn>
			</div>
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
	input:not(input#barcode),
	.barcode-input-cont,
	.reserved-check {
		width: 14.2%;
		min-width: 120px;
		padding: 0.1rem 0.5rem;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		border-radius: 5px;
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

	.barcode-input-cont {
		padding: 0;
		border: none;
		position: relative;
	}

	input#barcode {
		height: 100%;
		width: 100%;
	}
`;

const CameraBtn = styled.button`
	position: absolute;
	right: 0;
	top: 1px;
	height: 95%;
	cursor: pointer;
	padding: 0.1rem 0.5rem;
	border-radius: 3px;
	border: none;
	font-size: 0.9rem;
	background: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #32394d;
	transition: all 0.3s ease;
	outline-width: 0;
	&:hover {
		color: white;
		background: #32394d;
	}
`;

export default FilterRow;
