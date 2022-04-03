import { useState } from 'react';

export const useModalHandler = () => {
  const [imgOpen, setImgOpen] = useState({
    open: false,
    src: '',
  });
  const modalHandler = e => {
    e.stopPropagation();
    const image = e.target.dataset.image
      ? e.target.dataset.image
      : e.target.src;
    if (image) {
      setImgOpen({
        ...imgOpen,
        open: !imgOpen.open,
        src: image,
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
