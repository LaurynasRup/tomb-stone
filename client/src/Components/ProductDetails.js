import React from 'react';
// Styled
import styled from 'styled-components';
// Redux
import { useSelector } from 'react-redux';
// Fn to display error
import { displayError } from '../functions/displayErrorString';
// Icons
import { FaCamera } from 'react-icons/fa';

const ProductDetails = ({
	editable,
	modalHandler,
	inputs,
	inputHandler,
	selectHandler,
	inputErrors,
	barcodeModalHandler,
}) => {
	// Grab product types from redux state
	const types = Object.values(useSelector(state => state.types.types));
	const errors = errStr => {
		if (inputErrors === undefined) return false;
		if (inputErrors.errors.includes(errStr)) return true;
	};

	errors();

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
							{types.map(type => (
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
								{displayError(
									inputErrors.errors,
									'matchBarcode',
									'* Barcode already in use'
								)}
							</small>
						)}
					</div>
					<div className="select-control">
						<input
							type="number"
							id="barcode"
							value={inputs.barcode}
							onChange={inputHandler}
							disabled={editable ? false : true}
							readOnly={editable ? false : true}
						/>
						{editable && (
							<CameraBtn onClick={barcodeModalHandler}>
								<FaCamera />
							</CameraBtn>
						)}
					</div>
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
						className={errors('dimensions_error') ? 'red_border' : ''}
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
						className={errors('dimensions_error') ? 'red_border' : ''}
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
						disabled={true}
						readOnly={true}
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
					<label htmlFor="comments">&nbsp; Reserved</label>
				</div>
				{inputs.reserved && (
					<div className="form-control inline second">
						<div className="input-top">
							<label htmlFor="reserved_id">Reservation ID</label>
						</div>
						<input
							type="text"
							id="reserveId"
							className={errors('reserveId') ? 'red_border' : ''}
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
	max-width: 1200px;
	.form-row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 1rem 0rem;
		min-width: 600px;
		@media (max-width: 650px) {
			flex-direction: column;
			min-width: 100%;
			padding: 0;
		}
	}
	.form-row:last-of-type {
		padding-bottom: 2rem;
		@media (max-width: 650px) {
			padding-top: 0.5rem;
		}
	}
	.form-control {
		display: flex;
		flex-direction: column;
		width: 48%;
		min-width: 200px;
		.select-control {
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;
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
		@media (max-width: 650px) {
			width: 100%;
			padding: 0.3rem 0rem;
		}
		&.form-control.third {
			width: 28%;
			min-width: 100px;
			@media (max-width: 650px) {
				width: 100%;
				min-width: 200px;
			}
		}
		&.form-control.full {
			width: 100%;
			@media (max-width: 650px) {
				width: 100%;
			}
		}
		@media (max-width: 650px) {
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
		input.red_border {
			border: solid 1px red;
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
		@media (max-width: 650px) {
			padding: 0 0 0.3rem 0.2rem;
		}
		label {
			padding: 0 1rem;
			@media (max-width: 650px) {
				padding: 0 0rem;
			}
		}
		input {
			width: auto;
		}
	}

	.form-control.inline.second {
		input {
			@media (max-width: 650px) {
				margin-top: 0.1rem;
				width: 100%;
			}
		}
		@media (max-width: 650px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}
`;

const CameraBtn = styled.button`
	position: absolute;
	right: 0;
	top: 0;
	height: 98%;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	font-size: 1rem;
	border-radius: 10px;
	border: solid 1px #32394d;
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

export default ProductDetails;
