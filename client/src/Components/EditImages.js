import React, { useRef, useState } from 'react';
// styled
import styled from 'styled-components';
// React icons
import { AiOutlineCloudUpload } from 'react-icons/ai';
// components
import PageLoading from '../Components/PageLoading';
// axios
import axios from 'axios';

const EditImages = ({ images, imageUploadInputHandler }) => {
	const [isLoading, setIsLoading] = useState(false);
	const fileBtnHandler = () => {
		fileInputRef.current.click();
	};
	const [customText, setCustomText] = useState(['No file chosen...']);
	const [previewSource, setPreviewSource] = useState([]);
	const fileChangeHandler = () => {
		if (fileInputRef.current.value) {
			// get file name
			const filesArray = Array.from(fileInputRef.current.files);
			uploadFiles(filesArray);
			const fileNames = filesArray.map((file) => `${file.name};  `);
			setCustomText(fileNames);
		} else {
			setCustomText(['No file chosen...']);
		}
	};
	const uploadFiles = (array) => {
		const imgArr = [];
		array.forEach((file) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				imgArr.push(reader.result);
			};
		});
		setPreviewSource(imgArr);
	};
	const uploadImage = async (encodedImgArray) => {
		let imgArray = [];
		await encodedImgArray.forEach(async (image) => {
			setIsLoading(true);
			try {
				const response = await axios.post('/api/upload_images', {
					data: image,
					upload_preset: 'product_images',
				});
				const data = await response;
				imgArray.push(data.data.data);
			} catch (error) {
				console.log(error);
			}
			// All images uploaded ?
			if (encodedImgArray.length === imgArray.length) {
				console.log(imgArray);
				imageUploadInputHandler(imgArray);
				setIsLoading(false);
				setCustomText(['Images uploaded succesfully!']);
			}
		});
	};
	const uploadFilesHandler = () => {
		if (!previewSource.length > 0) return;
		uploadImage(previewSource);
	};
	const fileInputRef = useRef();
	return (
		<>
			{isLoading && <PageLoading />}
			<Outer>
				<div className="inputs">
					<div className="file-inp">
						<input
							type="file"
							id="add_img"
							aaccept="image/*"
							hidden="hidden"
							multiple="multiple"
							ref={fileInputRef}
							onChange={fileChangeHandler}
						/>
						<button type="button" id="file-input-btn" onClick={fileBtnHandler}>
							Select File
						</button>
						{customText.map((text, idx) => (
							<span id="custom-text" key={idx}>
								{text}
							</span>
						))}
					</div>
					<button
						type="button"
						id="upload-file-btn"
						onClick={uploadFilesHandler}
					>
						<AiOutlineCloudUpload /> &nbsp; Upload
					</button>
				</div>

				<div className="img-btns">
					{images.map((image, idx) => (
						<button className="img-btn" key={idx}>
							{`Image ${idx + 1}`} &nbsp;{' '}
						</button>
					))}
				</div>
				<div className="line"></div>
			</Outer>
		</>
	);
};

const Outer = styled.div`
	width: 100%;
	.inputs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.inputs .file-inp #custom-text {
		font-size: 0.95rem;
		color: #888888;
	}

	.img-btn,
	#file-input-btn,
	#upload-file-btn {
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
	}
	.line {
		margin-bottom: 2rem;
	}
	.img-btn {
		background: #32394d;
		color: #fff;
	}
`;

export default EditImages;
