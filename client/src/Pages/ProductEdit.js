import React, { useState } from 'react';
// Components
import ProductOpen from '../Components/ProductOpen';
// Styled
import styled from 'styled-components';
// Imprted styled comps
import { Wrapper } from '../StyledComps/styledComponents';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';

const ProductEdit = () => {
	const currentProduct = useFindByUrl();
	const [editable] = useState(true);
	const [imgOpen, setImgOpen] = useState({
		open: false,
		src: '',
	});
	const modalHandler = (e) => {
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
	console.log(currentProduct);
	return (
		<Wrapper>
			{currentProduct && (
				<ProductOpen
					currentProduct={currentProduct}
					modalHandler={modalHandler}
					imgOpen={imgOpen}
					setImgOpen={setImgOpen}
					editable={editable}
				/>
			)}
		</Wrapper>
	);
};

export default ProductEdit;
