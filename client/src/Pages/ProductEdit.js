import React, { useState } from 'react';
// Components
import ImageModal from '../Components/ImageModal';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import { BtnLink, BtnRed, BtnGreen } from '../Components/Button';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
import { useProductInputs } from '../hooks/useProductInputs';

const ProductEdit = () => {
	const [editable] = useState(true);
	// Find current product object
	const currentProduct = useFindByUrl();

	// Image modal handling
	const { imgOpen, setImgOpen, modalHandler } = useModalHandler();

	// Grab user inputs
	const { inputs, inputHandler, selectHandler } = useProductInputs(
		currentProduct
	);

	return (
		<>
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			{currentProduct && (
				<Wrapper>
					<h1>Edit Product {currentProduct.barcode}</h1>
					<div className="line" />
					<ProductDetails
						inputs={inputs}
						inputHandler={inputHandler}
						selectHandler={selectHandler}
						currentProduct={currentProduct}
						editable={editable}
						modalHandler={modalHandler}
						imgOpen={imgOpen}
						setImgOpen={setImgOpen}
					/>
					<EditImages images={JSON.parse(currentProduct.product_img)} />
					<ButtonsWrapper>
						<BtnLink link={`/product_view/${currentProduct._id}`}>
							Cancel
						</BtnLink>
						<div className="btns-right">
							<BtnRed>Delete Product</BtnRed>
							<BtnGreen>Save Changes</BtnGreen>
						</div>
					</ButtonsWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default ProductEdit;
