import { useHistory } from 'react-router-dom';
// Icons
import { MdDone } from 'react-icons/md';
// Styled Comps
import { StyledTable } from '../StyledComps/styledComponents';
const ProductTable = ({ products, isLoading }) => {
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
							<th>Barcode</th>
							<th>Type</th>
							<th>Length</th>
							<th>Height</th>
							<th>Width</th>
							<th className="location">Place</th>
							<th>Reserved</th>
						</tr>
					</thead>
					<tbody>
						{products.map((prod) => (
							<tr
								key={prod._id}
								id={prod._id}
								onClick={() => openProductHandler(prod._id)}
							>
								<td>{prod.barcode}</td>
								<td>{prod.product.product_type} </td>
								<td>{prod.dimensions.long}</td>
								<td>{prod.dimensions.short}</td>
								<td>{prod.dimensions.width}</td>
								<td>{prod.warehouse_location}</td>
								<td className="mid">
									{prod.reserved.isReserved ? <MdDone size={20} /> : ''}
								</td>
							</tr>
						))}
					</tbody>
				</StyledTable>
			)}
		</>
	);
};

export default ProductTable;
