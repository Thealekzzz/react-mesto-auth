import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Сохранить">
      <label>
        <input 
          required 
          value={name} 
          onChange={(evt) => setName(evt.target.value)}
          minLength="2" 
          maxLength="40" 
          type="text" 
          className="popup__input popup__input_data_name" 
          id="input-name" 
          name="name" 
          placeholder="Имя" 
        />
        <span className="popup__input-error input-name-error"></span>
      </label>

      <label>
        <input 
          required minLength="2" 
          value={description} 
          onChange={(evt) => setDescription(evt.target.value)}
          maxLength="200" 
          type="text" 
          className="popup__input popup__input_data_about" 
          id="input-about" 
          name="about" 
          placeholder="О себе"
        />
        <span className="popup__input-error input-about-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;