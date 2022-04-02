import { useState } from 'react';

export const useModalHandler = () => {
  const [imgOpen, setImgOpen] = useState({
    open: false,
    src: '',
  });
  const modalHandler = e => {
    e.stopPropagation();
    const imgSrc = e.target.src;
    if (imgSrc) {
      setImgOpen({
        ...imgOpen,
        open: !imgOpen.open,
        src: imgSrc,
      });
    } else {
      setImgOpen({
        ...imgOpen,
        open: !imgOpen.open,
        src: '',
      });
    }
  };

  return { imgOpen, setImgOpen, modalHandler };
};
