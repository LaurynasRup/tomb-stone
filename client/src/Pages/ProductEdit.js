import React, { useState } from 'react';
// Components
import ImageModal from '../Components/ImageModal';
import ProductDetails from '../Components/ProductDetails';
import EditImages from '../Components/EditImages';
import { BtnLink, Btn } from '../Components/Button';
// Styled comps
import { Wrapper, ButtonsWrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
import { useModalHandler } from '../hooks/useModalHandler';
// Icons
import { BsArrowLeft } from 'react-icons/bs';

const ProductEdit = () => {
	const [editable] = useState(true);
	// Find current product object
	const currentProduct = useFindByUrl();
	// Image modal handling
	const { imgOpen, setImgOpen, modalHandler } = useModalHandler();
	console.log(JSON.parse(currentProduct.product_img));
	return (
		<>
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			<Wrapper>
				<h1>Edit Product {currentProduct.barcode}</h1>
				<div className="line" />
				<ProductDetails
					currentProduct={currentProduct}
					editable={editable}
					modalHandler={modalHandler}
					imgOpen={imgOpen}
					setImgOpen={setImgOpen}
				/>
				<EditImages images={JSON.parse(currentProduct.product_img)} />
				<ButtonsWrapper>
					<BtnLink link={`/product_view/${currentProduct._id}`}>
						<BsArrowLeft size={20} />
						<span style={{ paddingLeft: '0.2rem' }}>Back</span>
					</BtnLink>
					<Btn>Save changes</Btn>
				</ButtonsWrapper>
			</Wrapper>
		</>
	);
};

export default ProductEdit;
