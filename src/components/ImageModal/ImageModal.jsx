import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
    </Modal>
  );
};

export default ImageModal;