import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const inputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    const newUrl = inputRef.current.value;

    onUpdateAvatar({
      avatar: newUrl,
    });
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Сохранить">
      <label>
        <input ref={inputRef} required type="url" className="popup__input popup__input_data_image-url" id="avatar-url" name="link" placeholder="Ссылка на аватар" />
        <span className="popup__input-error avatar-url-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;