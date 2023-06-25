import React from 'react';

const Popup = ({ name, isOpen, onClose, children, extraClassName }) => {
  function handlePopupClick() {
    onClose();
  }

  function handleContainerClick(evt) {
    evt.stopPropagation();
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onClick={handlePopupClick}>
      <div className={`popup__container ${extraClassName || ""}`} onClick={handleContainerClick}>
        <button onClick={onClose} className="popup__close-button popup__close-button_type_edit hoverable" type="button"
          aria-label="Закрыть всплывающее окно, кнопка"></button>

        {children}
      </div>
    </div>
  );
};

export default Popup;