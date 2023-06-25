import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/auth';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Registration = () => {
  const navigate = useNavigate();

  const {values, handleChange, handleBlur, isValid, errors } = useFormAndValidation();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();

    authApi.register(values)
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

          <label className="form__label">
            <input
              required
              minLength="2"
              type="email"
              className="form__input form__input_data_title"
              id="email-input"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
            />
            <span className="form__input-error email-input-error">{errors.email}</span>

          </label>
          <label className="form__label">
            <input
              required
              minLength="5"
              type="password"
              className="form__input form__input_data_password"
              id="password-input"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Пароль"
            />
            <span className="form__input-error password-input-error">{errors.password}</span>

          </label>
        </div>

        <div className="form__button-wrapper">
          <button className="form__button hoverable hoverable_level_low" disabled={!isValid} type='submit'>Зарегистрироваться</button>
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