import styled from 'styled-components';
import { VscChromeClose } from 'react-icons/vsc';

const ImageModal = ({ img, modalHandler }) => {
  return (
    <ModalOuter className="outer">
      <img src={img.src} alt={img.src} />
      <div className="close-btn">
        <VscChromeClose size={40} onClick={modalHandler} />
      </div>
    </ModalOuter>
  );
};

const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 75%;
    height: 90%;
    object-fit: contain;
  }
  .close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    svg {
      color: #fff;
    }
  }
`;

export default ImageModal;
