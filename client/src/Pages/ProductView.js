import React, { useState } from 'react';
// Components
import ImageModal from '../Components/ImageModal';
import ImageCarousel from '../Components/ImageCarousel';
import ProductDetails from '../Components/ProductDetails';
import { BtnLink } from '../Components/Button';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
import { useProductInputs } from '../hooks/useProductInputs';
// Icons
import { BsArrowLeft } from 'react-icons/bs';
// Redux
import { useSelector } from 'react-redux';

const ProductView = () => {
	const [editable] = useState(false);
	// Image modal handling
	const { imgOpen, modalHandler } = useModalHandler();
	// Find current product object
	const currentProduct = useFindByUrl();
	// Grab user inputs
	const { inputs, inputHandler, selectHandler } = useProductInputs(
		currentProduct,
		currentProduct.edited_by
	);
	// Grab user type
	const { userType } = useSelector((state) => state.user);
	console.log(userType);

	return (
		<>
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			{currentProduct && (
				<Wrapper imgOpen={imgOpen.open}>
					<h1>Product {currentProduct.barcode}</h1>
					<div className="line" />
					<ProductDetails
						inputs={inputs}
						inputHandler={inputHandler}
						currentProduct={currentProduct}
						selectHandler={selectHandler}
						editable={editable}
						modalHandler={modalHandler}
					/>
					<ImageCarousel
						modalHandler={modalHandler}
						images={currentProduct.product_img}
					/>
					<ButtonsWrapper>
						<BtnLink link="/home">
							<BsArrowLeft size={20} />
							<span style={{ paddingLeft: '0.2rem' }}>Back</span>
						</BtnLink>
						{userType === 'admin' && (
							<div className="btns-right">
								<BtnLink link={`/product_edit/${currentProduct._id}`}>
									Edit
								</BtnLink>
							</div>
						)}
					</ButtonsWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default ProductView;
