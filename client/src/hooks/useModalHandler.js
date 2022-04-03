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
      document.body.classList.add('no-scroll');
    } else {
      setImgOpen({
        ...imgOpen,
        open: !imgOpen.open,
        src: '',
      });
      document.body.classList.remove('no-scroll');
    }
  };

  return { imgOpen, setImgOpen, modalHandler };
};
