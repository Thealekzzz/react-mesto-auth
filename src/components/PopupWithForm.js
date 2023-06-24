import React, { useContext, useEffect, useRef } from 'react';
import Popup from './Popup';
import ValidationOptionsContext from '../contexts/ValidationOptionsContext';

const PopupWithForm = ({ name, title, isOpen, onClose, children, buttonText, onSubmit, isLoading }) => {
	const formRef = useRef();
	const buttonRef = useRef();

	const validationOptions = useContext(ValidationOptionsContext);


	useEffect(() => {
		const formElement = formRef.current;
		const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
		const buttonElement = buttonRef.current;

		function setEventListeners() {
			inputList.forEach(inputElement => {
				inputElement.addEventListener("input", () => {
					checkInputValidity(inputElement);
					toggleButtonState();
				});
			});
		}

		function checkInputValidity(inputElement) {
			const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

			if (inputElement.validity.valid) {
				hideInputError(errorElement, inputElement);

			} else {
				showInputError(errorElement, inputElement, inputElement.validationMessage);

			}
		}

		function showInputError(errorElement, inputElement, validationMessage) {
			inputElement.classList.add(validationOptions.inputErrorClass);
			errorElement.classList.add(validationOptions.errorClass);
			errorElement.textContent = validationMessage;

		}

		function hideInputError(errorElement, inputElement) {
			inputElement.classList.remove(validationOptions.inputErrorClass);
			errorElement.classList.remove(validationOptions.errorClass);
			errorElement.textContent = "";

		}

		function toggleButtonState() {
			const isFormValid = inputList.every(inputElement => inputElement.validity.valid);

			if (isFormValid) {
				buttonElement.classList.remove(validationOptions.inactiveButtonClass);
				buttonElement.removeAttribute("disabled");
				buttonElement.classList.add("hoverable");

			} else {
				buttonElement.classList.add(validationOptions.inactiveButtonClass);
				buttonElement.setAttribute("disabled", true);
				buttonElement.classList.remove("hoverable");

			}
		}

		setEventListeners();

	}, [formRef, buttonRef, validationOptions]);


	return (
		<Popup name={name} isOpen={isOpen} onClose={onClose}>
			<h2 className="popup__title">{title}</h2>
			<button onClick={onClose} className="popup__close-button popup__close-button_type_edit hoverable" type="button"
				aria-label="Закрыть всплывающее окно, кнопка"></button>

			<form className={`popup__form popup__form_type_${name}`} name={`${name}-form`} onSubmit={onSubmit} ref={formRef}>
				{children}

				<button ref={buttonRef} type="submit" className={`popup__submit-button hoverable hoverable_level_low ${isLoading ? "popup__submit-button_disabled" : ""}`} disabled={isLoading}>
					{isLoading
						? <span className="spinner"></span>
						: buttonText}
				</button>
			</form>

		</Popup>
	);
};

export default PopupWithForm;