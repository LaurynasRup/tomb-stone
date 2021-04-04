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
// Custom functions
import { consctructObj } from '../functions/constructDispatchObj';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProductAction } from '../Redux/actions/productsAction';

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
	console.log(currentProduct);
	// Manage errors
	const [inputErrors, setInputErrors] = useState({
		show: false,
		errors: [],
	});

	// Retrieve token
	const { token } = useSelector((state) => state.user);
	// See if loading
	const { isLoading } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	// has updated succesfully
	const [updated, setUpdated] = useState(false);

	const updatedHandler = () => {
		setUpdated(true);
	};

	// Handle submit button
	const submitHandler = async () => {
		const errors = [];
		// if reserved - if no reserve id, push error
		if (inputs.reserved && !inputs.reserveId) {
			errors.push('reserveId');
		}
		// grab input object entries
		const inputsArray = Object.entries(inputs);
		let pureInputs = inputsArray.filter((el) => el[0] !== 'reserved');
		pureInputs = pureInputs.filter((el) => el[0] !== 'reserveId');
		pureInputs = pureInputs.filter((el) => el[0] !== 'comments');
		pureInputs = pureInputs.filter((el) => el[0] !== 'product');
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
			const objDispatch = consctructObj(inputs, currentProduct);
			// dispatch edit product action
			dispatch(
				updateProductAction(
					token,
					currentProduct._id,
					objDispatch,
					updatedHandler
				)
			);
		}
	};

	return (
		<>
			{updated && <SuccessModal />}
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
							<BtnRed>Delete Product</BtnRed>
							<BtnGreen handler={submitHandler}>Save Changes</BtnGreen>
						</div>
					</ButtonsWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default ProductEdit;
