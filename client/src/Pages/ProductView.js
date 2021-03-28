import React, { useState } from 'react';
// Compenents
import ImageModal from '../Components/ImageModal';
import ImageCarousel from '../Components/ImageCarousel';
import ProductDetails from '../Components/ProductDetails';
import { BtnLink } from '../Components/Button';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
// Icons
import { BsArrowLeft } from 'react-icons/bs';
const ProductView = () => {
	const [editable] = useState(false);
	// Image modal handling
	const { imgOpen, setImgOpen, modalHandler } = useModalHandler();
	// Find current product object
	const currentProduct = useFindByUrl();

	// State for product inputs
	const [inputs, setInputs] = useState({
		product: {
			product_type: currentProduct.product.product_type,
			type_img: currentProduct.product.type_img,
		},
		barcode: currentProduct.barcode,
		length: currentProduct.dimensions.short,
		height: currentProduct.dimensions.long,
		width: currentProduct.dimensions.width,
		location: currentProduct.warehouse_location,
		editedBy: currentProduct.edited_by,
		comments: currentProduct.comments,
		reserved: currentProduct.reserved.isReserved,
		reserveId: currentProduct.reserved.id,
	});

	const inputHandler = (e) => {
		setInputs({
			...inputs,
			[e.target.id]: e.target.value,
		});
	};
	const checkBoxHandler = (e) => {
		setInputs({
			...inputs,
			[e.target.id]: e.target.ckecked,
		});
	};
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
						checkBoxHandler={checkBoxHandler}
						currentProduct={currentProduct}
						editable={editable}
						modalHandler={modalHandler}
						imgOpen={imgOpen}
						setImgOpen={setImgOpen}
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
						<div className="btns-right">
							<BtnLink link="#">Split</BtnLink>
							<BtnLink link={`/product_edit/${currentProduct._id}`}>
								Edit
							</BtnLink>
						</div>
					</ButtonsWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default ProductView;
