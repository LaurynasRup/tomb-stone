import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
// Compoenents
import ProductOpen from '../Components/ProductOpen';
const ProductView = () => {
	const [editable] = useState(false);
	const [imgOpen, setImgOpen] = useState({
		open: false,
		src: '',
	});
	const closeModalHandler = (e) => {
		const imgSrc = e.target.src;
		if (imgSrc) {
			setImgOpen({
				...imgOpen,
				open: !imgOpen.open,
				src: imgSrc,
			});
		} else {
			setImgOpen({
				...imgOpen,
				open: !imgOpen.open,
				src: '',
			});
		}
	};
	const location = useLocation();
	// Grab product id from the url
	const pathArray = location.pathname.split('/');
	const productId = pathArray[pathArray.length - 1];
	// find product in products array
	const currentProduct = useSelector((state) =>
		state.products.products.find((el) => el._id === productId)
	);
	const history = useHistory();
	if (!currentProduct) {
		history.push('/home');
	}
	return (
		<Wrapper imgOpen={imgOpen.open}>
			{currentProduct && (
				<ProductOpen
					currentProduct={currentProduct}
					closeModalHandler={closeModalHandler}
					imgOpen={imgOpen}
					setImgOpen={setImgOpen}
					editable={editable}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 92vh;
	padding: 3rem;
	overflow: ${(props) => (props.imgOpen ? 'hidden' : 'auto')};
`;

export default ProductView;
