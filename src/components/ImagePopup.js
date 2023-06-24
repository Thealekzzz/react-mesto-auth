import React from 'react';
import Popup from './Popup';

const ImagePopup = ({ selectedCard, onClose }) => {
    return (
        <Popup name={"view"} extraClassName="popup__container_type_view" isOpen={selectedCard.name} onClose={onClose}>
            <img src={selectedCard.link} alt={`${selectedCard.name}, фото`} className="popup__image" />
            <p className="popup__caption">{selectedCard.name}</p>

            <button onClick={onClose} className="popup__close-button popup__close-button_type_view hoverable" type="button"
                aria-label="Кнопка закрыть всплывающее окно"></button>
        </Popup>
    );
};

export default ImagePopup;