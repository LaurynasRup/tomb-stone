import React, { useState } from 'react';
// Styled Comps
import { Wrapper } from '../StyledComps/styledComponents';
import styled from 'styled-components';
// Components
import AllTypesTable from '../Components/AllTypesTable';
import { Btn } from '../Components/Button';
import AddTypeModal from '../Components/AddTypeModal';
import MessageModal from '../Components/MessageModal';
import ConfirmMessageModal from '../Components/ConfirmMessageModal';
// Hooks
import { useShowMsgModal } from '../hooks/useShowMsgModal';
import { useConfirmMsgModal } from '../hooks/useConfirmMsgModal';
// Functions
import { findPublicId } from '../functions/findPublicId';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewTypeAction,
	removeTypeAction,
} from '../Redux/actions/typesAction';
const TypesPage = () => {
	const { types } = useSelector(state => state.types);
	const typesArray = Object.values(types);
	// Control Add type modal display
	const [displayAddTypeModal, setDisplayAddTypeModal] = useState(false);
	// Track inputs
	const [typeInputs, setTypeInputs] = useState({
		name: '',
		type_id: '',
		image: '',
	});
	// Set error message
	const [typeInputError, setTypeInputError] = useState(null);
	// Display modal message
	const { showMsg, showModalMsgHandler } = useShowMsgModal();
	// Display Confirm Modal
	const { showConfirmModal, confirmModalhandler } = useConfirmMsgModal();
	const [typeToDeleteID, setTypeToDeleteId] = useState({
		name_id: '',
		id: '',
	});
	// Input handler
	const typeInputHandler = e => {
		setTypeInputs({
			...typeInputs,
			[e.target.id]: e.target.value,
		});
	};

	// Image inputs handler
	const typeImgInputHandler = imgStr => {
		setTypeInputs({
			...typeInputs,
			image: imgStr,
		});
	};
	// Clear all inputs
	const clearAllInputs = () => {
		setTypeInputs({ name: '', type_id: '', image: '' });
	};
	// Open Add Type Modal
	const openModalHandler = () => {
		setDisplayAddTypeModal(!displayAddTypeModal);
	};
	// Close modal on outer div click
	const closeModalhandler = e => {
		if (e.target.classList.contains('outer')) {
			// Set type input error empty
			setTypeInputError(null);
			clearAllInputs();
			openModalHandler();
		}
	};
	const dispatch = useDispatch();

	// Submit data
	const submitType = () => {
		// Set type input error empty
		setTypeInputError(null);
		// Check if the same type exists
		if (typeInputs.name !== '' && typeInputs.type_id) {
			const typesArray = Object.values(types);
			// check if same name already exist
			const matchName = typesArray.some(
				el =>
					el.name.trim().toLowerCase() === typeInputs.name.trim().toLowerCase()
			);

			// Check if code already exists
			const matchCode = typesArray.some(
				el =>
					el.type_id.trim().toLowerCase() ===
					typeInputs.type_id.trim().toLowerCase()
			);

			if (matchName && matchCode) {
				return setTypeInputError('* Name & Code already exist');
			}

			if (matchName) {
				return setTypeInputError('* Name already exist');
			}

			if (matchCode) {
				return setTypeInputError('* Code already exist');
			}
		}

		if (
			typeInputs.name !== '' &&
			typeInputs.type_id !== '' &&
			typeInputs.image !== '' &&
			typeInputError === null
		) {
			dispatch(addNewTypeAction(typeInputs, showModalMsgHandler));
			openModalHandler();
		}
	};

	// Handle delete button
	const productDeleteHandler = (name_id, id) => {
		// Set id of type to be deleted
		setTypeToDeleteId({ name_id, id });
		// Display confirmation modal
		confirmModalhandler();
	};
	// Handle delete confirmation
	const confirmDeleteHandler = async () => {
		// Find type img
		const typeImg = typesArray.find(el => el._id === typeToDeleteID.id).image;
		// Grab public id from img url
		const public_id = findPublicId(typeImg);
		// Remove confirm modal
		confirmModalhandler();
		// dispatch delete action
		// await axios.post(`/api/upload_images/destroy`, { public_id });
		dispatch(
			removeTypeAction(typeToDeleteID.id, showModalMsgHandler, public_id)
		);
		setTypeToDeleteId({ name_id: '', id: '' });
	};

	return (
		<>
			{showConfirmModal && (
				<ConfirmMessageModal
					msg={`Delete Type ${typeToDeleteID.name_id} ?`}
					cancelHandler={confirmModalhandler}
					confirmHandler={confirmDeleteHandler}
				/>
			)}
			{showMsg.display && (
				<MessageModal
					msg={showMsg.msg}
					link={showMsg.link}
					linkTxt={showMsg.linkTxt}
				/>
			)}
			{displayAddTypeModal && (
				<AddTypeModal
					typeInputs={typeInputs}
					typeInputHandler={typeInputHandler}
					typeImgInputHandler={typeImgInputHandler}
					submitType={submitType}
					closeModalhandler={closeModalhandler}
					typeInputError={typeInputError}
				/>
			)}
			<Wrapper>
				<h1>All types</h1>
				<div className="line"></div>
				<div className="container_overflowx_scroll">
					<AllTypesTable
						productDeleteHandler={productDeleteHandler}
						typesArray={typesArray}
					/>
				</div>
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
