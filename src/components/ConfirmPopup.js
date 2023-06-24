import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmPopup = ({ isOpen, onClose, isLoading, onSubmit }) => {
  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit();
  }
  return (
    <PopupWithForm 
      name="delete" 
      title="Вы уверены?" 
      isOpen={isOpen} 
      onClose={onClose} 
      buttonText="Удалить" 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
    />

  );
};

export default ConfirmPopup;