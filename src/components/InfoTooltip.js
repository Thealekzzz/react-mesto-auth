import React from 'react';
import Popup from './Popup';

import successIcon from "../images/done.svg";
import errorIcon from "../images/error.svg";

const InfoTooltip = ({ isOpen, isSuccessful, onClose }) => {
  return (
    <Popup
      isOpen={isOpen} 
      onClose={onClose}
      extraClassName="popup_type_tooltip"
    >
      <img src={isSuccessful ? successIcon : errorIcon} alt="" className="popup__status-image" />
      <p className="popup__status-message">
        {isSuccessful
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."
        }
      </p>
    </Popup>
  );
};

export default InfoTooltip;