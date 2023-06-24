import React from 'react';

const Popup = ({ name, isOpen, onClose, children, extraClassName }) => {
  function handlePopupClick() {
    onClose();
  }

  function handleImageClick(evt) {
    evt.stopPropagation();
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onClick={handlePopupClick}>
      <div className={`popup__container ${extraClassName || ""}`} onClick={handleImageClick}>
        {children}
      </div>
    </div>
  );
};

export default Popup;