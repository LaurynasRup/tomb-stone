import React, { useState } from 'react';
// Components
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import ImageModal from '../Components/ImageModal';
import { BtnLink, BtnGreen } from '../Components/Button';
import PageLoading from '../Components/PageLoading';
import MessageModal from '../Components/MessageModal';
// Hooks
import { useProductInputs } from '../hooks/useProductInputs';
import { useModalHandler } from '../hooks/useModalHandler';
import { useInputErrors } from '../hooks/useInputErrors';
import { useShowMsgModal } from '../hooks/useShowMsgModal';
// Functions
import { emptyInputObj } from '../functions/emptyInputObj';
import { addProduct } from '../functions/addProduct';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addProductAction } from '../Redux/actions/productsAction';
const ProductAdd = () => {
	// Can edit form details
	const [editable] = useState(true);
	// Create en empty obj
	const emptyObj = emptyInputObj;
	// Grab Current User
	const { name } = useSelector((state) => state.user);
	const {
		inputs,
		inputHandler,
		selectHandler,
		imageUploadInputHandler,
	} = useProductInputs(emptyObj, name);
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();
	// Image modal
	const { imgOpen, modalHandler } = useModalHandler();

	// Grab token
	const { token } = useSelector((state) => state.user);
	// See if loading
	const { isLoading } = useSelector((state) => state.products);

	const dispatch = useDispatch();

	// display modal message
	const { showMsg, showModalMsgHandler } = useShowMsgModal();

	// Handle submit
	const submitHandler = () => {
		addProduct(
			inputs,
			dispatch,
			addProductAction,
			token,
			showModalMsgHandler,
			'',
			inputErrorHandler
		);
	};
	return (
		<>
			{showMsg.display && (
				<MessageModal
					msg={showMsg.msg}
					link={showMsg.link}
					linkTxt={showMsg.linkTxt}
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
