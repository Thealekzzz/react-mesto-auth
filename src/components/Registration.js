import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/auth';

const Registration = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  function handleFormChange(evt) {
    const { name, value } = evt.target;

    setFormValue(prev => ({
      ...prev,
      [name]: value
    }))

  }

  function handleSubmit(evt) {
    evt.preventDefault();

    authApi.register(formValue)
      .then((data) => {
        setIsTooltipOpen(true);
        setIsRegisterSuccessful(true);

        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsRegisterSuccessful(false);

      });
  }

  return (
    <>
      <form className='form form_type_sign' onSubmit={handleSubmit}>
        <h1 className="form__title">Регистрация</h1>

        <div className="form__inputs">

          <label>
            <input
              required
              minLength="2"
              type="text"
              className="form__input form__input_data_title"
              id="email-input"
              name="email"
              value={formValue.email}
              onChange={handleFormChange}
              placeholder="Email"
            />
            <span className="form__input-error email-input-error"></span>

          </label>
          <label>
            <input
              required
              minLength="2"
              type="password"
              className="form__input form__input_data_password"
              id="password-input"
              name="password"
              value={formValue.password}
              onChange={handleFormChange}
              placeholder="Пароль"
            />
            <span className="form__input-error password-input-error"></span>

          </label>
        </div>

        <div className="form__button-wrapper">
          <button className="form__button hoverable hoverable_level_low" type='submit'>Зарегистрироваться</button>
          <p className='form__extra-action'>Уже зарегистрированы? <Link to="/sign-in" className='hoverable'>Войти</Link></p>
        </div>

      </form>
      <InfoTooltip 
        isOpen={isTooltipOpen} 
        isSuccessful={isRegisterSuccessful} 
        onClose={() => setIsTooltipOpen(false)} 
      />
    </>
  );
};

export default Registration;