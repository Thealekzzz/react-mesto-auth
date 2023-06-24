import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({ name, link });
  }

  useEffect(() => {
    setLink("");
    setName("");
  }, [isOpen]);

  return (
    <PopupWithForm name="new-place" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Создать">
      <label>
        <input 
          required 
          minLength="2" 
          maxLength="30" 
          type="text" 
          className="popup__input popup__input_data_title" 
          id="input-title" 
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Название" 
        />
        <span className="popup__input-error input-title-error"></span>

      </label>

      <label>
        <input 
          required 
          type="url" 
          className="popup__input popup__input_data_image-url" 
          id="new-place-url" 
          name="link" 
          value={link}
          onChange={e => setLink(e.target.value)}
          placeholder="Ссылка на картинку" 
        />
        <span className="popup__input-error new-place-url-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;