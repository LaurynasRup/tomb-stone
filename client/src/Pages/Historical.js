// React
import React, { useEffect, useState } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { historicalAction } from '../Redux/actions/productsAction';
// Styled Comps
import { Wrapper, StyledTable } from '../StyledComps/styledComponents';
// Components
import PageLoading from '../Components/PageLoading';
// Styled
import styled from 'styled-components';
//Icons
import { FaSlidersH } from 'react-icons/fa';

const Historical = () => {
	// State to track if filters are shown
	const [showFilter, setShowFilter] = useState(false);
	const displayFilterHandler = () => {
		if (!showFilter) {
			setShowFilter(true);
		} else {
			setShowFilter(false);
		}
	};
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
				<Btn onClick={displayFilterHandler}>
					<FaSlidersH size={20} />
				</Btn>
				<div className="container_overflowx_scroll">
					{showFilter && (
						<BarcodeInputCont>
							<input id="barcode" type="number" placeholder="Barcode..." />
						</BarcodeInputCont>
					)}
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

const Btn = styled.button`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.2rem;
	border: solid 1px #32394d;
	border-radius: 5px;
	background: ${props => (props.showFilter ? '#32394d' : 'transparent')};
	outline-width: 0;
	transition: all 0.2s ease;
	margin-bottom: 1rem;
	svg {
		transition: color 0.2s ease;
		color: ${props => (props.showFilter ? '#e2e2e2' : '#32394d')};
	}
	&:hover {
		background: #32394d;
		svg {
			color: #e2e2e2;
		}
	}
`;

const BarcodeInputCont = styled.div`
	margin-bottom: 1rem;
	input {
		width: 15%;
		min-width: 100px;
		padding: 0.1rem 0.5rem;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		border: solid 1px #a3a3a3;
		border-radius: 5px;
		outline-width: 0;
		&:focus {
			border: solid 1px black;
		}
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
`;

export default Historical;
