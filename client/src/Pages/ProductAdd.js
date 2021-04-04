import React, { useState } from 'react';
// Components
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import ImageModal from '../Components/ImageModal';
// Hooks
import { useProductInputs } from '../hooks/useProductInputs';
import { BtnLink, BtnGreen } from '../Components/Button';
import { useModalHandler } from '../hooks/useModalHandler';
// Functions
import { emptyInputObj } from '../functions/emptyInputObj';
import { consctructObj } from '../functions/constructDispatchObj';
import { removeFromArray } from '../functions/removeFromArray';
const ProductAdd = () => {
	// Can edit form details
	const [editable] = useState(true);
	// Create en empty obj
	const emptyObj = emptyInputObj;
	const { inputs, inputHandler, selectHandler } = useProductInputs(emptyObj);
	// Manage errors
	const [inputErrors, setInputErrors] = useState({
		show: false,
		errors: [],
	});
	// Image modal
	const { imgOpen, modalHandler } = useModalHandler();

	const submitHandler = () => {
		const errors = [];
		// if reserved - if no reserve id, push error
		if (inputs.reserved && !inputs.reserveId) {
			errors.push('reserveId');
		}
		// grab input object entries
		const inputsArray = Object.entries(inputs);
		let pureInputs = removeFromArray(inputsArray, [
			'reserved',
			'reserveId',
			'comments',
			'product',
		]);
		// if input is empty - push key into errors
		pureInputs.forEach((input) => {
			if (!input[1]) errors.push(input[0]);
		});
		// If errors array > 1 - set state to show & set array
		if (errors.length > 0) {
			setInputErrors({
				show: true,
				errors,
			});
		} else {
			// clear errors
			setInputErrors({
				show: false,
				errors,
			});
			// construct the obj
			const objDispatch = consctructObj(inputs, emptyInputObj);
			// dispatch edit product action
			console.log(objDispatch);
		}
	};
	return (
		<>
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			<Wrapper>
				<h1>Add New Product</h1>
				<div className="line" />
				<ProductDetails
					editable={editable}
					inputs={inputs}
					inputHandler={inputHandler}
					selectHandler={selectHandler}
					currentProduct={emptyObj}
					inputErrors={inputErrors}
					modalHandler={modalHandler}
				/>
				<EditImages images={emptyObj.product_img} />
				<ButtonsWrapper>
					<BtnLink link="/home">Cancel</BtnLink>
					<div className="btns-right">
						<BtnGreen handler={submitHandler}>Save Product</BtnGreen>
					</div>
				</ButtonsWrapper>
			</Wrapper>
		</>
	);
};

export default ProductAdd;
