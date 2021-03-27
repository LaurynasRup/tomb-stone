import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
	const history = useHistory();
	if (!currentProduct) {
		history.push('/home');
	}
	return (
		<>
			{imgOpen.open && <ImageModal modalHandler={modalHandler} img={imgOpen} />}
			<Wrapper imgOpen={imgOpen.open}>
				<h1>Product {currentProduct.barcode}</h1>
				<div className="line" />
				<ProductDetails
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
						<BtnLink link={`/product_edit/${currentProduct._id}`}>Edit</BtnLink>
					</div>
				</ButtonsWrapper>
			</Wrapper>
		</>
	);
};

export default ProductView;
