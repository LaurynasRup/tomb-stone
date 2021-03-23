import React from 'react';
// Styled
import styled from 'styled-components';

const ProductDetails = ({ currentProduct, editable, modalHandler }) => {
	return (
		<StyledForm>
			<div className="form-row">
				<div className="form-control">
					<label htmlFor="type">Type</label>
					<div className="select-control">
						<select
							id="type"
							disabled={editable ? false : true}
							readOnly={editable ? false : true}
						>
							<option value={currentProduct.product.product_type}>
								{currentProduct.product.product_type}
							</option>
						</select>
						<div className="texture" onClick={modalHandler}>
							<img
								src="https://www.rubberduckbathrooms.co.uk/images/big/carrara-marble-slab-B-689.jpg"
								alt="texture"
							/>
						</div>
					</div>
				</div>
				<div className="form-control">
					<label htmlFor="barcode">Barcode</label>
					<input
						type="number"
						id="barcode"
						value={currentProduct.barcode}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-control third">
					<label htmlFor="length">Length</label>
					<input
						type="number"
						id="length"
						value={currentProduct.dimensions.short}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
				<div className="form-control third">
					<label htmlFor="height">Height</label>
					<input
						type="number"
						id="height"
						value={currentProduct.dimensions.long}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
				<div className="form-control third">
					<label htmlFor="width">Width</label>
					<input
						type="number"
						id="width"
						value={currentProduct.dimensions.width}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-control">
					<label htmlFor="warehouse_location">Warehouse location</label>
					<input
						type="text"
						id="warehouse-location"
						value={currentProduct.warehouse_location}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="last_edited">Edited by</label>
					<input
						type="text"
						id="last_edited"
						value={currentProduct.edited_by}
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
						defaultValue={currentProduct.comments}
						disabled={editable ? false : true}
						readOnly={editable ? false : true}
					></textarea>
				</div>
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
		}
		textarea#comments {
			resize: none;
			overflow: scroll;
		}
		select {
			width: 90%;
			padding: 0.28rem 1rem;
		}
	}
`;

export default ProductDetails;
