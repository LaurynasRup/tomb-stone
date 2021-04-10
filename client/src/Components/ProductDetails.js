import React from 'react';
// Styled
import styled from 'styled-components';
// Redux
import { useSelector } from 'react-redux';
// Fn to display error
import { displayError } from '../functions/displayErrorString';

const ProductDetails = ({
	editable,
	modalHandler,
	inputs,
	inputHandler,
	selectHandler,
	inputErrors,
}) => {
	// Grab product types from redux state
	const types = Object.values(useSelector((state) => state.types.types));

	return (
		<StyledForm>
			<div className="form-row">
				<div className="form-control">
					<div className="input-top">
						<label htmlFor="type">Type</label>
						{editable && (
							<small className="error-msg">
								{displayError(inputErrors.errors, 'type', '* Type is required')}
							</small>
						)}
					</div>
					<div className="select-control">
						<select
							id="type"
							name="type"
							defaultValue={inputs.product.product_type}
							onChange={selectHandler}
							disabled={editable ? false : true}
							readOnly={editable ? false : true}
						>
							<option value="" id="" imgsrc="">
								--- Select Type ---
							</option>
							{types.map((type) => (
								<option
									key={type._id}
									id={type.type_id}
									value={type.type_id}
									imgsrc={type.image}
								>
									{type.name} - {type.type_id}
								</option>
							))}
						</select>
						{inputs.product.type_img !== '' ? (
							<div className="texture" onClick={modalHandler}>
								<img src={inputs.product.type_img} alt="texture" />
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<div className="form-control">
					<div className="input-top">
						<label htmlFor="barcode">Barcode</label>
						{editable && (
							<small className="error-msg">
								{displayError(
									inputErrors.errors,
									'barcode',
									'* Barcode is required'
								)}
							</small>
						)}
					</div>
					<input
						type="number"
						id="barcode"
						value={inputs.barcode}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-control third">
					<div className="input-top">
						<label htmlFor="length">Length</label>
						{editable && (
							<small className="error-msg">
								{displayError(
									inputErrors.errors,
									'length',
									'* Length is required'
								)}
							</small>
						)}
					</div>
					<input
						type="number"
						id="length"
						value={inputs.length}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
				<div className="form-control third">
					<div className="input-top">
						<label htmlFor="height">Height</label>
						{editable && (
							<small className="error-msg">
								{displayError(
									inputErrors.errors,
									'height',
									'* height is required'
								)}
							</small>
						)}
					</div>
					<input
						type="number"
						id="height"
						value={inputs.height}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
				<div className="form-control third">
					<div className="input-top">
						<label htmlFor="width">Width</label>
						{editable && (
							<small className="error-msg">
								{displayError(
									inputErrors.errors,
									'width',
									'* Width is required'
								)}
							</small>
						)}
					</div>
					<input
						type="number"
						id="width"
						value={inputs.width}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-control">
					<div className="input-top">
						<label htmlFor="warehouse_location">Warehouse location</label>
						{editable && (
							<small className="error-msg">
								{displayError(
									inputErrors.errors,
									'location',
									'* Location is required'
								)}
							</small>
						)}
					</div>
					<input
						type="text"
						id="location"
						value={inputs.location}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
				<div className="form-control">
					<div className="input-top">
						<label htmlFor="last_edited">Edited by</label>
						{editable && (
							<small className="error-msg">
								{displayError(
									inputErrors.errors,
									'editedBy',
									'* Edited by is required'
								)}
							</small>
						)}
					</div>
					<input
						type="text"
						id="editedBy"
						value={inputs.editedBy}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-control full">
					<label htmlFor="comments">Comments</label>
					<textarea
						id="comments"
						defaultValue={inputs.comments}
						onChange={inputHandler}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					></textarea>
				</div>
			</div>
			<div className="form-row">
				<div className="form-control inline">
					<input
						type="checkbox"
						checked={inputs.reserved}
						onChange={inputHandler}
						id="reserved"
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
					<label htmlFor="comments">Reserved</label>
				</div>
				{inputs.reserved && (
					<div className="form-control inline">
						<div className="input-top">
							{editable && (
								<small className="error-msg">
									{displayError(
										inputErrors.errors,
										'reserveId',
										'* Reserveation ID is required'
									)}
								</small>
							)}
							<label htmlFor="reserved_id">Reservation ID</label>
						</div>
						<input
							type="text"
							id="reserveId"
							disabled={editable ? false : true}
							readOnly={editable ? false : true}
							value={inputs.reserveId}
							onChange={inputHandler}
						/>
					</div>
				)}
			</div>
		</StyledForm>
	);
};

const StyledForm = styled.form`
	width: 100%;
	.form-row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 1rem 0rem;
		min-width: 600px;
		@media (max-width: 600px) {
			flex-direction: column;
			min-width: 100%;
			padding: 0;
		}
	}
	.form-row:last-of-type {
		padding-bottom: 2rem;
	}
	.form-control {
		display: flex;
		flex-direction: column;
		width: 48%;
		min-width: 200px;
		.select-control {
			display: flex;
			align-items: center;
		}
		.texture {
			cursor: pointer;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			margin: 0rem 0.5rem;
			overflow: hidden;
			border: solid 1px #a3a3a3;
			img {
				width: 100%;
				height: 100%;
			}
		}
		@media (max-width: 600px) {
			width: 100%;
			padding: 0.3rem 0rem;
		}
		&.form-control.third {
			width: 28%;
			min-width: 100px;
			@media (max-width: 600px) {
				width: 100%;
				min-width: 200px;
			}
		}
		&.form-control.full {
			width: 100%;
			@media (max-width: 600px) {
				width: 100%;
			}
		}
		@media (max-width: 600px) {
			width: 100%;
		}
		label {
			padding: 0 0 0.3rem 0.2rem;
			font-size: 1.2rem;
		}
		.error-msg {
			color: red;
			padding-left: 1rem;
		}
		input,
		textarea,
		select {
			width: 100%;
			padding: 0.3rem 1rem;
			font-family: 'Montserrat', sans-serif;
			font-size: 1rem;
			border-radius: 10px;
			letter-spacing: 1px;
			border: solid 1px #a3a3a3;
			outline-width: 0;
		}
		input[type='number'] {
			-moz-appearance: textfield;
		}
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
		textarea#comments {
			resize: none;
			overflow: scroll;
		}
		select {
			width: 90%;
			padding: 0.28rem 1rem;
		}
		input#reserved {
			display: inline;
			width: auto;
		}

		input:focus,
		textarea:focus {
			border: solid 1px black;
		}
	}
	.form-control.inline {
		flex-direction: row;
		align-items: center;
		width: auto;
		label {
			padding: 0 1rem;
		}
		input {
			width: auto;
		}
	}
`;

export default ProductDetails;
