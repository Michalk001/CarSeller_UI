import React, { useState, useEffect, state } from "react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import config from '../../config.json'
import { Redirect } from "react-router-dom";

const Login = ({ props, setIsLogin }) => {


    const [isError, setIsError] = useState(false);
    const [values, setValues] = useState(null);
    const updateValue = e => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const submit = async () => {


        if (values != null) {
            await fetch(config.apiRoot + "/api/Account/Login", {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(res => {

                    if (res.succeeded) {
                        const jwtDecode = require('jwt-decode');
                        const decoded = jwtDecode(res.token);
                        Cookies.set('token', res.token)
                        Cookies.set('firstName', res.firstName)
                        Cookies.set('secondName', res.secondName)
                        Cookies.set('phoneNumber', res.phoneNumber)
                        Cookies.set('expires', decoded.exp);
                        Cookies.set('email', decoded.email);
                        setIsLogin(true)
                        props.history.push("/account");
                    }
                    else {
                        setIsError(true);
                    }
                })
                .catch(error => console.log(error))
        }
    }
    useEffect(() => {

    }, [])


    return (
        <>
            <div className="user-banner">
                <div className="user-banner__txt user-banner__txt--title">Zaloguj się</div>
                <div className="user-banner__card--wrap ">
                    <div className="user-banner__card user-banner__card--login">
                        <span className="user-banner__button user-banner__button--active">Zaloguj się</span>
                    </div>
                    <div className="user-banner__card user-banner__card--register">
                        <Link className="user-banner__button" to="register">Utwórz konto</Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <form className="user-sign-box">
                    <div className="user-sign-box__content">
                        <div className="user-sign-box__txt">
                            Użytkownik
                        </div>
                        <input type="txt" className="user-sign-box__input" name="userName" onChange={x => updateValue(x)} />
                    </div>
                    <div className="user-sign-box__content">
                        <div className="user-sign-box__txt">
                            Hasło
                        </div>
                        <input type="password" className="user-sign-box__input" name="password" onChange={x => updateValue(x)} />
                    </div>
                    <div className="user-sign-box__content user-sign-box__content--button">
                        <div className="user-sign-box__button" onClick={x => submit()}>
                            Zaloguj
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Login;