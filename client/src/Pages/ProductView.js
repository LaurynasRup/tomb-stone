import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Imprted styled comps
import { Wrapper } from '../StyledComps/styledComponents';
// Components
import ProductOpen from '../Components/ProductOpen';
// Hooks
import { useFindByUrl } from '../hooks/useFindByUrl';
const ProductView = () => {
	const [editable] = useState(false);
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
	const currentProduct = useFindByUrl();
	const history = useHistory();
	if (!currentProduct) {
		history.push('/home');
	}
	return (
		<Wrapper imgOpen={imgOpen.open}>
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

export default ProductView;
