import React, { useState, useEffect, state } from "react";
import {
  Link

} from 'react-router-dom';
import Cookies from 'js-cookie';


const Header = ({ props, isLoginR }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  useEffect(() => {
    if (Cookies.get('token')) {
      const jwtDecode = require('jwt-decode');
      const decoded = jwtDecode(Cookies.get('token'));

      if (decoded.exp) {
        if (decoded.exp > (new Date() / 1000)) {
          setIsLogin(true)
          if (decoded.role.includes("Admin")) {
            setIsAdmin(true)
          }
        }
        else {
          setIsLogin(false)
        }
      }
    }

  }, [props, isLoginR])
  return (
    <div className="header">
      <Link to="/"><span className="header__logo" /></Link>
      <ul className="classic-menu">
        {isLogin && isAdmin && <li className="classic-menu__element">
          <Link className="classic-menu__link" to="/admin">Panel administratora</Link>
        </li>}
        <li className="classic-menu__element">
          {!isLogin && <Link className="classic-menu__link" to="/account/register">Utwórz Konto</Link>}
          {isLogin && <Link className="classic-menu__link" to="/advertAdd">Dodaj ogloszenie</Link>}

        </li>
        <li className="classic-menu__element">
          {isLogin && <Link className="classic-menu__link" to="/account">{Cookies.get('firstName')} {Cookies.get('secondName')}</Link>}
          {!isLogin && <Link className="classic-menu__link" to="/account/login">Zaloguj</Link>}
        </li>

      </ul>
      <div className="hamburger">
        <div className="hamburger__button" onClick={x => { isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true) }}>
          <div className={`hamburger__bars ${isMenuOpen ? 'hamburger__bars--top-active' : ""}`}></div>
          <div className={`hamburger__bars hamburger__bars--middle ${isMenuOpen ? 'hamburger__bars--middle-active' : ""}`}></div>
          <div className={`hamburger__bars hamburger__bars--bottom ${isMenuOpen ? 'hamburger__bars--bottom-active' : ""}`}></div>
        </div>
        <div className={`hamburger__menu ${isMenuOpen ? 'hamburger__menu--active' : ""}`} >
          <ul className="hamburger__menu-lista">
            <li className="hamburger__menu-element">
              {isLogin && <Link onClick={x => setIsMenuOpen(false)} className="hamburger__menu-link" to="/account">{Cookies.get('firstName')} {Cookies.get('secondName')}</Link>}
              {!isLogin && <Link onClick={x => setIsMenuOpen(false)} className="hamburger__menu-link" to="/account/login">Zaloguj</Link>}
            </li>
            {isLogin && isAdmin && <li  className="hamburger__menu-element">
              <Link  className="hamburger__menu-link" to="/admin"  onClick={x => setIsMenuOpen(false)}>Panel administratora</Link>
            </li>}
            <li className="hamburger__menu-element" >
              {!isLogin && <Link onClick={x => setIsMenuOpen(false)} className="hamburger__menu-link" to="/account/register">Utwórz Konto</Link>}
              {isLogin && <Link onClick={x => setIsMenuOpen(false)} className="hamburger__menu-link" to="/advertAdd">Dodaj ogloszenie</Link>}
            </li>

          </ul>
        </div>
      </div>
    </div>
  )


}
export default Header;