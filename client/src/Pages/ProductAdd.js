import React, { useState } from 'react';
// Components
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import ImageModal from '../Components/ImageModal';
import { BtnLink, BtnGreen } from '../Components/Button';
import PageLoading from '../Components/PageLoading';
import SuccessModal from '../Components/SuccessModal';
// Hooks
import { useProductInputs } from '../hooks/useProductInputs';
import { useModalHandler } from '../hooks/useModalHandler';
import { useInputErrors } from '../hooks/useInputErrors';
import { useProductUpdated } from '../hooks/useProductUpdated';
// Functions
import { emptyInputObj } from '../functions/emptyInputObj';
import { constructObj } from '../functions/constructDispatchObj';
import { removeFromArray } from '../functions/removeFromArray';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addProductAction } from '../Redux/actions/productsAction';
const ProductAdd = () => {
	// Can edit form details
	const [editable] = useState(true);
	// Create en empty obj
	const emptyObj = emptyInputObj;
	const { inputs, inputHandler, selectHandler } = useProductInputs(emptyObj);
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();
	// Image modal
	const { imgOpen, modalHandler } = useModalHandler();

	// Grab token
	const { token } = useSelector((state) => state.user);
	// See if loading
	const { isLoading } = useSelector((state) => state.products);

	const dispatch = useDispatch();

	// has updated succesfully
	const { updated, updatedHandler } = useProductUpdated();

	// Handle submit
	const submitHandler = () => {
		const errors = [];
		// if reserved - if no reserve id, push error
		if (inputs.reserved && !inputs.reserveId) {
			errors.push('reserveId');
		}
		// If no type selected, push error
		if (!inputs.product.product_type) errors.push('type');
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
		// check for errors
		const pass = () => {
			const objDispatch = constructObj(inputs, emptyObj);
			dispatch(addProductAction(token, objDispatch, updatedHandler));
		};
		inputErrorHandler(errors, pass);
	};
	return (
		<>
			{updated.success && (
				<SuccessModal
					msg="Item has been added succesfully"
					link="/home"
					linkTxt="Go back"
				/>
			)}
			{updated.error && (
				<SuccessModal
					msg="Something went wrong"
					link="/home"
					linkTxt="Go back"
				/>
			)}
			{isLoading && <PageLoading />}
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
				<EditImages images={JSON.parse(emptyObj.product_img)} />
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
