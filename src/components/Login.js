import React, { useContext, useState } from 'react';
import authApi from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import { Navigate, useNavigate } from 'react-router-dom';
import IsUserLoggedContext from '../contexts/IsUserLoggedContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const {values, handleChange, handleBlur, isValid, errors } = useFormAndValidation();

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const isLoggedIn = useContext(IsUserLoggedContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    authApi.login(values)
    .then(data => {
      onLogin(data);
      navigate("/");
    })
    .catch(err => {
      setIsTooltipOpen(true);
      setIsLoginSuccessful(false);

    });
  }

  return (
    <>
      {isLoggedIn && <Navigate to="/" />}
      
      <form className='form form_type_sign' onSubmit={handleSubmit}>
        <h1 className="form__title">Вход</h1>

        <div className="form__inputs">

          <label className='form__label'>
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
            <span className="form__input-error email-input-error">{errors.email || ""}</span>

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
            <span className="form__input-error password-input-error">{errors.password || ""}</span>

          </label>
        </div>

        <button className="form__button hoverable hoverable_level_low" disabled={!isValid} type='submit'>Войти</button>
      </form>
      <InfoTooltip 
        isOpen={isTooltipOpen} 
        isSuccessful={isLoginSuccessful} 
        onClose={() => setIsTooltipOpen(false)} 
      />
    </>
  );
};

export default Login;