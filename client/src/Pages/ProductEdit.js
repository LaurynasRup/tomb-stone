import React, { useState } from 'react';
// Components
import ImageModal from '../Components/ImageModal';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import { BtnLink, BtnRed, BtnGreen } from '../Components/Button';
import PageLoading from '../Components/PageLoading';
import MessageModal from '../Components/MessageModal';
import ConfirmMessageModal from '../Components/ConfirmMessageModal';
import BarcodeModal from '../Components/BarcodeModal';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
import { useBarcodeModal } from '../hooks/useBarcodeModal';
import { useProductInputs } from '../hooks/useProductInputs';
import { useInputErrors } from '../hooks/useInputErrors';
import { useShowMsgModal } from '../hooks/useShowMsgModal';
import { useConfirmMsgModal } from '../hooks/useConfirmMsgModal';
// Custom functions
import { addProduct } from '../functions/addProduct';
import { onDetected } from '../functions/onDetected';
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
	// Image Modal handling
	const { imgOpen, modalHandler } = useModalHandler();
	// Grab Current User
	const { name } = useSelector((state) => state.user);
	// Grab user inputs
	const {
		inputs,
		inputHandler,
		selectHandler,
		imageUploadInputHandler,
		barcodeInputHandler,
	} = useProductInputs(currentProduct, name);
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
	// Barcode result
	const [result, setResult] = useState(inputs.barcode);
	// Barcode Modal Handling
	const { barcodeModalOpen, barcodeModalHandler } = useBarcodeModal(
		result,
		barcodeInputHandler,
		setResult
	);

	// Handle submit button
	const submitHandler = () => {
		addProduct(
			inputs,
			dispatch,
			updateProductAction,
			token,
			showModalMsgHandler,
			currentProduct._id,
			inputErrorHandler
		);
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
			{barcodeModalOpen && (
				<BarcodeModal
					barcodeModalHandler={barcodeModalHandler}
					onDetected={onDetected}
					result={result}
					setResult={setResult}
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
						barcodeModalHandler={barcodeModalHandler}
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
							<BtnRed handler={productDeleteHandler}>Delete</BtnRed>
							<BtnGreen handler={submitHandler}>Save</BtnGreen>
						</div>
					</ButtonsWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default ProductEdit;
