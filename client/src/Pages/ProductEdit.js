import React, { useState } from 'react';
// Components
import ImageModal from '../Components/ImageModal';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import { BtnLink, BtnRed, BtnGreen } from '../Components/Button';
import PageLoading from '../Components/PageLoading';
import MessageModal from '../Components/MessageModal';
import ConfirmMessageModal from '../Components/ConfirmMessageModal';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
import { useProductInputs } from '../hooks/useProductInputs';
import { useInputErrors } from '../hooks/useInputErrors';
import { useShowMsgModal } from '../hooks/useShowMsgModal';
import { useConfirmMsgModal } from '../hooks/useConfirmMsgModal';
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
	const {
		inputs,
		inputHandler,
		selectHandler,
		imageUploadInputHandler,
	} = useProductInputs(currentProduct);
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();
	// Retrieve token
	const { token } = useSelector((state) => state.user);
	// See if loading
	const { isLoading } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	// Display modal message
	const { showMsg, showModalMsgHandler } = useShowMsgModal();
	// Display Confirm Modal
	const { showConfirmModal, confirmModalhandler } = useConfirmMsgModal();

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
			const objDispatch = constructObj(inputs);
			// dispatch edit product action
			dispatch(
				updateProductAction(
					token,
					currentProduct._id,
					objDispatch,
					showModalMsgHandler
				)
			);
		};
		inputErrorHandler(errors, pass);
	};

	// Handle delete button
	const productDeleteHandler = () => {
		// Display confirmation modal
		confirmModalhandler();
	};

	// Handle delete confirmation
	const confirmDeleteHandler = () => {
		// Remove confirm modal
		confirmModalhandler();
		// dispatch delete action
		dispatch(
			deleteProductAction(currentProduct._id, token, showModalMsgHandler)
		);
	};

	return (
		<>
			{showConfirmModal && (
				<ConfirmMessageModal
					msg={`Delete product ${currentProduct.barcode} ?`}
					cancelHandler={confirmModalhandler}
					confirmHandler={confirmDeleteHandler}
				/>
			)}
			{showMsg.display && (
				<MessageModal
					msg={showMsg.msg}
					link={showMsg.link}
					linkTxt={showMsg.linkTxt}
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
					<EditImages
						images={JSON.parse(inputs.productImg)}
						imageUploadInputHandler={imageUploadInputHandler}
					/>
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
