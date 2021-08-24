// React
import React, { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { historicalAction } from '../Redux/actions/productsAction';
// Styled Comps
import { Wrapper, StyledTable } from '../StyledComps/styledComponents';
// Components
import PageLoading from '../Components/PageLoading';

const Historical = () => {
	// Retrieve token
	const { token } = useSelector(state => state.user);
	// Dispatch action to get historical data
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			// fetch products
			dispatch(historicalAction(token));
		}
	}, [dispatch, token]);

	// Retrieve historical products data
	const { products, isLoading } = useSelector(
		state => state.historical_products
	);

	return (
		<>
			{isLoading && <PageLoading />}
			<Wrapper>
				<h1>Historical</h1>
				<div className="line"></div>
				<div className="container_overflowx_scroll">
					<StyledTable>
						<thead>
							<tr>
								<th>Barcode</th>
								<th>Type</th>
								<th>Length</th>
								<th>Height</th>
								<th>Width</th>
								<th>Reason</th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product._id}>
									<td styles="cursor:default;">{product.barcode}</td>
									<td>{product.product.product_type}</td>
									<td>{product.dimensions.long}</td>
									<td>{product.dimensions.short}</td>
									<td>{product.dimensions.width}</td>
									<td>{product.delete_reason ? product.delete_reason : '-'}</td>
								</tr>
							))}
						</tbody>
					</StyledTable>
				</div>
			</Wrapper>
		</>
	);
};

export default Historical;
