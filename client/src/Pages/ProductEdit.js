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

const ProductEdit = () => {
	const [editable] = useState(true);
	// Find current product object
	const currentProduct = useFindByUrl();
	// Image modal handling
	const { imgOpen, setImgOpen, modalHandler } = useModalHandler();

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
			reserved: !inputs.reserved,
		});
	};

	const selectHandler = (e) => {
		// find image src
		const idx = e.target.selectedIndex;
		const el = e.target.childNodes[idx];
		const imgAttr = el.getAttribute('imgsrc');

		// update state with type name & img
		setInputs({
			...inputs,
			product: {
				product_type: e.target.value,
				type_img: imgAttr,
			},
		});
	};

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
						checkBoxHandler={checkBoxHandler}
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
