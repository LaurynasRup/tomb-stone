import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../Redux/actions/productsAction';
import { typesAction } from '../Redux/actions/typesAction';
import { useHistory } from 'react-router-dom';
const ProductTable = () => {
	// Retrieve token
	const { token } = useSelector((state) => state.user);
	const { products, isLoading } = useSelector((state) => state.products);
	// Fetch products
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			// fetch products
			dispatch(productsAction(token));
			//fetch product types
			dispatch(typesAction());
		}
		// fetchTypes();
	}, [token, dispatch]);
	const history = useHistory();
	const openProductHandler = (id) => {
		history.push(`product_view/${id}`);
	};

	return (
		<>
			{!isLoading && (
				<StyledTable>
					<thead>
						<tr>
							<th>Type</th>
							<th>Barcode</th>
							<th>Length</th>
							<th>Height</th>
							<th>Width</th>
							<th>Place</th>
						</tr>
					</thead>
					<tbody>
						{/* <tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr> */}
						{products.map((prod) => (
							<tr
								key={prod._id}
								id={prod._id}
								onClick={() => openProductHandler(prod._id)}
							>
								<td>{prod.product.product_type} </td>
								<td>{prod.barcode}</td>
								<td>{prod.dimensions.short}</td>
								<td>{prod.dimensions.long}</td>
								<td>{prod.dimensions.width}</td>
								<td>{prod.warehouse_location}</td>
							</tr>
						))}
					</tbody>
				</StyledTable>
			)}
		</>
	);
};

const StyledTable = styled.table`
	border-collapse: collapse;
	width: 100%;
	th {
		border-top: solid 1px #5c5c5c;
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;
		text-align: left;
		font-weight: 600;
		background: #d6d6d6;
	}
	tbody {
		tr {
			transition: background 0.2s ease;
			&:hover {
				background: #eeeeee;
			}
		}
	}
	td {
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;
		cursor: pointer;
	}
`;

export default ProductTable;
