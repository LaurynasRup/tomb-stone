// React
import React, { useState } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Styled Comps
import { Wrapper, StyledTable } from '../StyledComps/styledComponents';

const Historical = () => {
	// Dispatch action to get historical data
	return (
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
				</StyledTable>
			</div>
		</Wrapper>
	);
};

export default Historical;
