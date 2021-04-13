import React from 'react';
// Styled Comps
import { Wrapper } from '../StyledComps/styledComponents';
import styled from 'styled-components';
// Components
import AllTypesTable from '../Components/AllTypesTable';
import { Btn } from '../Components/Button';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';
const TypesPage = () => {
	return (
		<Wrapper>
			<h1>All types</h1>
			<div className="line"></div>
			<AllTypesTable />
			<BtnWrapper>
				<Btn>
					{' '}
					<AiOutlinePlus /> &nbsp; Add new type
				</Btn>
			</BtnWrapper>
		</Wrapper>
	);
};

const BtnWrapper = styled.div`
	padding-top: 1.5rem;
	width: 100%;
	display: flex;
	justify-content: center;
`;

export default TypesPage;
