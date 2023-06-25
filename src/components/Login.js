import React, { useContext, useState } from 'react';
import authApi from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import { Navigate, useNavigate } from 'react-router-dom';
import IsUserLoggedContext from '../contexts/IsUserLoggedContext';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const isLoggedIn = useContext(IsUserLoggedContext);

  function handleFormChange(evt) {
    const {name, value} = evt.target;

    setFormValue(prev => ({
      ...prev,
      [name]: value
    }))
    
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    authApi.login(formValue)
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

        <button className="form__button hoverable hoverable_level_low" type='submit'>Войти</button>
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