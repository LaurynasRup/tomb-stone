import React, { useState } from 'react';
// Styled Comps
import { Wrapper } from '../StyledComps/styledComponents';
import styled from 'styled-components';
// Components
import AllTypesTable from '../Components/AllTypesTable';
import { Btn } from '../Components/Button';
import AddTypeModal from '../Components/AddTypeModal';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';
// Redux
import { useDispatch } from 'react-redux';
import { addNewTypeAction } from '../Redux/actions/typesAction';
const TypesPage = () => {
	// Control Add type modal display
	const [displayAddTypeModal, setDisplayAddTypeModal] = useState(false);
	// Track inputs
	const [typeInputs, setTypeInputs] = useState({
		name: '',
		type_id: '',
		image: '',
	});

	// Input handler
	const typeInputHandler = (e) => {
		setTypeInputs({
			...typeInputs,
			[e.target.id]: e.target.value,
		});
	};

	const typeImgInputHandler = (imgStr) => {
		setTypeInputs({
			...typeInputs,
			image: imgStr,
		});
	};

	const openModalHandler = () => {
		setDisplayAddTypeModal(!displayAddTypeModal);
	};
	const dispatch = useDispatch();
	// Submit data
	const submitType = () => {
		if (
			typeInputs.name !== '' &&
			typeInputs.type_id !== '' &&
			typeInputs.image !== ''
		) {
			console.log('dipatching');
			dispatch(addNewTypeAction(typeInputs));
		} else {
			console.log('not dispatching');
		}
	};
	return (
		<>
			{displayAddTypeModal && (
				<AddTypeModal
					openModalHandler={openModalHandler}
					typeInputs={typeInputs}
					typeInputHandler={typeInputHandler}
					typeImgInputHandler={typeImgInputHandler}
					submitType={submitType}
				/>
			)}
			<Wrapper>
				<h1>All types</h1>
				<div className="line"></div>
				<AllTypesTable />
				<BtnWrapper>
					<Btn handler={openModalHandler}>
						{' '}
						<AiOutlinePlus /> &nbsp; Add new type
					</Btn>
				</BtnWrapper>
			</Wrapper>
		</>
	);
};

const BtnWrapper = styled.div`
	padding-top: 1.5rem;
	width: 100%;
	display: flex;
	justify-content: center;
`;

export default TypesPage;
