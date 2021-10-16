import React, { useState } from 'react';
// Components
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import ImageModal from '../Components/ImageModal';
import { BtnLink, BtnGreen } from '../Components/Button';
import PageLoading from '../Components/PageLoading';
import MessageModal from '../Components/MessageModal';
import BarcodeModal from '../Components/BarcodeModal';
// Hooks
import { useProductInputs } from '../hooks/useProductInputs';
import { useModalHandler } from '../hooks/useModalHandler';
import { useBarcodeModal } from '../hooks/useBarcodeModal';
import { useInputErrors } from '../hooks/useInputErrors';
import { useShowMsgModal } from '../hooks/useShowMsgModal';
// Functions
import { emptyInputObj } from '../functions/emptyInputObj';
import { addProduct } from '../functions/addProduct';
import { onDetected } from '../functions/onDetected';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addProductAction } from '../Redux/actions/productsAction';
const ProductAdd = () => {
	// Can edit form details
	const [editable] = useState(true);
	// Create en empty obj
	const emptyObj = emptyInputObj;
	// Grab Current User
	const { name } = useSelector(state => state.user);
	// Grab all products
	const { products: allProducts } = useSelector(state => state.products);
	const {
		inputs,
		inputHandler,
		selectHandler,
		imageUploadInputHandler,
		barcodeInputHandler,
	} = useProductInputs(emptyObj, name);
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();
	// Image modal
	const { imgOpen, modalHandler } = useModalHandler();
	// Grab token
	const { token } = useSelector(state => state.user);
	// See if loading
	const { isLoading } = useSelector(state => state.products);

	const dispatch = useDispatch();

	// display modal message
	const { showMsg, showModalMsgHandler } = useShowMsgModal();

	// Barcode result
	const [result, setResult] = useState(inputs.barcode);
	// Barcode Modal Handling
	const { barcodeModalOpen, barcodeModalHandler } = useBarcodeModal(
		result,
		barcodeInputHandler,
		setResult
	);

	// Handle submit
	const submitHandler = () => {
		addProduct(
			inputs,
			dispatch,
			addProductAction,
			token,
			showModalMsgHandler,
			'',
			inputErrorHandler,
			allProducts
		);
	};
	return (
		<>
			{showMsg.display && (
				<MessageModal
					msg={showMsg.msg}
					link={showMsg.link}
					linkTxt={showMsg.linkTxt}
					handler={() => showModalMsgHandler('close')}
					handlerText="Add another"
				/>
			)}
			{isLoading && <PageLoading />}
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			{barcodeModalOpen && (
				<BarcodeModal
					barcodeModalHandler={barcodeModalHandler}
					onDetected={onDetected}
					result={result}
					setResult={setResult}
				/>
			)}
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
					barcodeModalHandler={barcodeModalHandler}
				/>
				<EditImages
					images={JSON.parse(inputs.productImg)}
					imageUploadInputHandler={imageUploadInputHandler}
				/>
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
