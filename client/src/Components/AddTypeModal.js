import React, { useRef, useState } from 'react';
// Styled
import styled from 'styled-components';
// React icons
import { AiOutlineCloudUpload } from 'react-icons/ai';
// Components
import { BtnGreen } from '../Components/Button';
import axios from 'axios';

const AddTypeModal = ({
	typeInputs,
	typeInputHandler,
	typeImgInputHandler,
	submitType,
	closeModalhandler,
}) => {
	// state to track file input name
	const [customText, setCustomtext] = useState('No file chosen...');
	// State to track uploaded file
	const [previewSource, setPreviewSource] = useState(null);
	// Handle upload file custom button
	const uploadFilRef = useRef();
	const openFileInput = () => {
		uploadFilRef.current.click();
	};
	// Handle File Change
	const fileChangeHandler = () => {
		// If there is file selected
		if (uploadFilRef.current.value) {
			// Set custom text to file name
			setCustomtext(`${uploadFilRef.current.files[0].name}`);
			// init File Reader
			const reader = new FileReader();
			// read file as data & set state with read file
			reader.readAsDataURL(uploadFilRef.current.files[0]);
			reader.onloadend = () => {
				setPreviewSource(reader.result);
			};
		}
	};
	// Handle upload image Btn
	const uploadBtnHandler = () => {
		// If no file is set - return
		if (!previewSource) return;
		// If there is a file
		uploadImage(previewSource);
	};
	// Image upload async function
	const uploadImage = async (file) => {
		try {
			//upload image
			const response = await axios.post('/api/upload_images', {
				data: file,
				upload_preset: 'stone_types',
			});
			const data = await response;
			// Store data in the inputs object
			typeImgInputHandler(data.data.data);
			// set custom text to success
			setCustomtext('File uploaded');
		} catch (error) {
			// set custom text to error
			setCustomtext("Can't upload file");
		}
	};
	return (
		<Wrapper className="outer" onClick={closeModalhandler}>
			<div className="inner">
				<h1>Add new type</h1>
				<div className="line"></div>
				<form>
					<div className="form-control">
						<label htmlFor="type_name">Type name</label>
						<input
							type="text"
							id="name"
							placeholder="Enter type name"
							value={typeInputs.name}
							onChange={typeInputHandler}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="type_id">Type ID</label>
						<input
							type="text"
							id="type_id"
							placeholder="Enter type ID"
							value={typeInputs.type_id}
							onChange={typeInputHandler}
						/>
					</div>
				</form>
				<div className="file-input">
					<div className="input_cont">
						<input
							type="file"
							id="add_img"
							aaccept="image/*"
							hidden="hidden"
							onChange={fileChangeHandler}
							ref={uploadFilRef}
						/>
						<button type="button" id="file-input-btn" onClick={openFileInput}>
							Select File
						</button>
					</div>
					<button type="button" id="upload_file_btn" onClick={uploadBtnHandler}>
						<AiOutlineCloudUpload /> &nbsp; Upload
					</button>
				</div>
				<span className="custom_text">{customText}</span>
				<BtnGreen handler={submitType}>Store new type</BtnGreen>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
	.inner {
		width: 40%;
		min-width: 400px;
		padding: 1.5rem;
		border-radius: 10px;
		background-color: rgba(255, 255, 255);
		display: flex;
		flex-direction: column;

		h1 {
			font-weight: 400;
			margin-bottom: 0.5rem;
		}

		.line {
			width: 100%;
			height: 1px;
			background: #32394d;
			margin-bottom: 1.5rem;
		}

		form {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1rem;

			.form-control {
				display: flex;
				flex-direction: column;
				width: 49%;
				label {
					padding: 0 0 0.3rem 0.2rem;
					font-size: 1.2rem;
				}

				input {
					width: 100%;
					padding: 0.15rem 1rem;
					font-family: 'Montserrat', sans-serif;
					font-size: 1rem;
					border-radius: 10px;
					letter-spacing: 1px;
					border: solid 1px #a3a3a3;
					outline-width: 0;
				}
				input:focus {
					border: solid 1px black;
				}
			}
		}

		.file-input {
			display: flex;
			justify-content: space-between;
			align-items: center;

			button {
				cursor: pointer;
				padding: 0.2rem 1rem;
				background-color: transparent;
				border-radius: 10px;
				border: solid 1px #32394d;
				color: #32394d;
				display: inline-flex;
				align-items: center;
				font-family: 'Montserrat', sans-serif;
				font-size: 1rem;
				margin: 0 0.5rem 0.5rem 0;
				outline-width: 0;
				transition: all 0.2s ease;
				&:hover {
					background: #32394d;
					color: #fff;
				}
				@media (max-width: 600px) {
					font-size: 0.9rem;
					padding: 0.1rem 1.3rem;
				}
			}
		}
	}
	.custom_text {
		margin: 1rem 0;
		font-size: 0.95rem;
		color: #888888;
	}
`;

export default AddTypeModal;
