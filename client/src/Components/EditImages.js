import React from 'react';
// styled
import styled from 'styled-components';
// React icons
import { IoIosCloseCircle } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePhotograph } from 'react-icons/hi';

const EditImages = ({ images }) => {
	return (
		<Outer>
			<div className="inputs">
				<div className="file-inp">
					<input type="file" id="add_img" aaccept="image/*" />
					<label htmlFor="add_img">
						<AiOutlinePlus size={20} /> &nbsp; Add file
					</label>
				</div>
				<div className="take-photo">
					<div className="photo-inp">
						<HiOutlinePhotograph size={20} />
						&nbsp;
						<span>Take photo</span>
					</div>
				</div>
			</div>

			<div className="img-btns">
				{images.map((image, idx) => (
					<button className="img-btn">
						{`Image ${idx + 1}`} &nbsp; <IoIosCloseCircle size={20} />
					</button>
				))}
			</div>
			<div className="line"></div>
		</Outer>
	);
};

const Outer = styled.div`
	width: 100%;
	.inputs {
		display: flex;
	}
	.file-inp {
		input[type='file'] {
			display: none;
		}
	}
	.file-inp label,
	.take-photo .photo-inp {
		cursor: pointer;
		font-size: 1rem;
		color: white;
		background-color: #32394d;
		display: inline-flex;
		align-items: center;
		border-radius: 10px;
		padding: 0.2rem 1rem;
		margin: 1rem 0.5rem 2rem 0;
	}

	.img-btns .img-btn {
		cursor: pointer;
		padding: 0.2rem 1rem;
		background-color: transparent;
		border-radius: 10px;
		color: white;
		border: solid 1px #32394d;
		color: #32394d;
		display: inline-flex;
		align-items: center;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		margin: 0 0.5rem 0.5rem 0;
		outline-width: 0;
	}
	.line {
		margin-bottom: 2rem;
	}
`;

export default EditImages;
