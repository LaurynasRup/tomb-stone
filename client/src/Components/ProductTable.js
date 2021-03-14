import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../Redux/actions/productsAction';
import axios from 'axios';
const ProductTable = () => {
	// Retrieve token
	const token = useSelector((state) => state.user.token);
	// Fetch products
	const dispatch = useDispatch();
	const [products, setProducts] = useState({});
	useEffect(async () => {
		dispatch(productsAction(token));
	}, [token]);

	// display products
	return (
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
				<tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr>
				<tr>
					<td>Plokste 2</td>
					<td>987654321</td>
					<td>300</td>
					<td>500</td>
					<td>15</td>
					<td>Vieta 65</td>
				</tr>
				<tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr>
				<tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr>
				<tr>
					<td>Plokste 2</td>
					<td>987654321</td>
					<td>300</td>
					<td>500</td>
					<td>15</td>
					<td>Vieta 65</td>
				</tr>
				<tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr>
				<tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr>
				<tr>
					<td>Plokste 2</td>
					<td>987654321</td>
					<td>300</td>
					<td>500</td>
					<td>15</td>
					<td>Vieta 65</td>
				</tr>
				<tr>
					<td>Plokste 1</td>
					<td>123456789</td>
					<td>100</td>
					<td>200</td>
					<td>10</td>
					<td>Vieta 1</td>
				</tr>
			</tbody>
		</StyledTable>
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
