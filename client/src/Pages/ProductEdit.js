import React, { useState } from 'react';
// Components
import ImageModal from '../Components/ImageModal';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import { BtnLink, BtnRed, BtnGreen } from '../Components/Button';
import PageLoading from '../Components/PageLoading';
import SuccessModal from '../Components/SuccessModal';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
import { useProductInputs } from '../hooks/useProductInputs';
import { useProductUpdated } from '../hooks/useProductUpdated';
import { useProductDeleted } from '../hooks/useProductDeleted';
import { useInputErrors } from '../hooks/useInputErrors';
// Custom functions
import { constructObj } from '../functions/constructDispatchObj';
import { removeFromArray } from '../functions/removeFromArray';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	updateProductAction,
	deleteProductAction,
} from '../Redux/actions/productsAction';

const ProductEdit = () => {
	const [editable] = useState(true);
	// Find current product object
	const currentProduct = useFindByUrl();

	// Image modal handling
	const { imgOpen, modalHandler } = useModalHandler();

	// Grab user inputs
	const { inputs, inputHandler, selectHandler } = useProductInputs(
		currentProduct
	);
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();

	// Retrieve token
	const { token } = useSelector((state) => state.user);
	// See if loading
	const { isLoading } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	// has updated succesfully
	const { updated, updatedHandler } = useProductUpdated();
	// was deleted succesfully
	const { deleted, deleteHandler } = useProductDeleted();

	// Handle submit button
	const submitHandler = async () => {
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
		// Check for errors
		const pass = () => {
			// construct the obj
			const objDispatch = constructObj(inputs, currentProduct);
			// dispatch edit product action
			dispatch(
				updateProductAction(
					token,
					currentProduct._id,
					objDispatch,
					updatedHandler
				)
			);
		};
		inputErrorHandler(errors, pass);
	};

	// Handle delete button
	const productDeleteHandler = () => {
		console.log(currentProduct._id);
		dispatch(deleteProductAction(currentProduct._id, token, deleteHandler));
	};

	return (
		<>
			{updated.success && (
				<SuccessModal
					msg="Item has been updated succesfully"
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
			{deleted.success && (
				<SuccessModal
					msg="Item has been deleted succesfully"
					link="/home"
					linkTxt="Go back"
				/>
			)}
			{deleted.error && (
				<SuccessModal
					msg="Something went wrong"
					link="/home"
					linkTxt="Go back"
				/>
			)}
			{isLoading && <PageLoading />}
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			{currentProduct && (
				<Wrapper>
					<h1>Edit Product {currentProduct.barcode}</h1>
					<div className="line" />
					<ProductDetails
						inputs={inputs}
						inputHandler={inputHandler}
						inputErrors={inputErrors}
						selectHandler={selectHandler}
						currentProduct={currentProduct}
						editable={editable}
						modalHandler={modalHandler}
					/>
					<EditImages images={JSON.parse(currentProduct.product_img)} />
					<ButtonsWrapper>
						<BtnLink link={`/product_view/${currentProduct._id}`}>
							Cancel
						</BtnLink>
						<div className="btns-right">
							<BtnRed handler={productDeleteHandler}>Delete Product</BtnRed>
							<BtnGreen handler={submitHandler}>Save Changes</BtnGreen>
						</div>
					</ButtonsWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default ProductEdit;
