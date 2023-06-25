import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import IsUserLoggedContext from '../contexts/IsUserLoggedContext';

const Header = ({ onLogout, email }) => {
  const location = useLocation();
  const isLoggedIn = useContext(IsUserLoggedContext);
  const mobileHeaderRef = useRef(null);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const linkByLocation = {
    "/sign-in": { url: "/sign-up", text: "Регистрация" },
    "/sign-up": { url: "/sign-in", text: "Войти" },
  }

  function handleBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen)

  }

  return (
    <>
      {isLoggedIn && (
        <div
          className={`mobile-header ${isBurgerOpen ? "" : "mobile-header_hidden"}`}
          ref={mobileHeaderRef}
          style={{
            maxHeight: isBurgerOpen ? `${mobileHeaderRef.current?.scrollHeight}px` : "0",
          }}
        >
          <p className="header__email">{email}</p>
          <button className="header__logout-button hoverable" onClick={onLogout}>Выйти</button>

        </div>

      )}
      <header className="header">
        <Link to="/">
          <img src={logo} alt="Место, логотип." className="header__logo" />

        </Link>

        <div className="header__right_type_desktop">
          {isLoggedIn ? (
            <>
              <p className="header__email">{email}</p>
              <button className="header__logout-button hoverable" onClick={onLogout}>Выйти</button>
            </>
          ) : (
            <Link
              to={linkByLocation[location.pathname]?.url}
              className='header__right-link hoverable'
            >
              {linkByLocation[location.pathname]?.text}
            </Link>
          )}
        </div>
        {isLoggedIn && (
          <div className="header__right_type_mobile" onClick={handleBurgerClick}>
            <div className={`header__burger ${isBurgerOpen ? "header__burger_is-open" : ""}`}></div>
          </div>

        )}
      </header>
    </>
  );
};

export default Header;