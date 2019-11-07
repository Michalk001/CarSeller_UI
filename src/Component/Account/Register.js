import React, { useState, useEffect, state } from "react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import config from '../../config.json'
import Select from 'react-select';

const Register = () => {

    const [typeSeller, setTypeSeller] = useState('0');
    const [values, setValues] = useState(null);
    const updateValue = e => {
        setValues({ ...values, [e.name]: e.value })
        console.log(values)
    }

    const submit = async () => {
        if (values != null)
            await fetch(config.apiRoot + "/api/Account/Register", {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(res => {

                    console.log(res.token);
                    if (res.succeeded)
                        if (res.token) {
                            Cookies.set('token', res.token)
                            Cookies.set('firstName', firstName)
                            Cookies.set('secondName', secondName)
                            Cookies.set('phoneNumber', phoneNumber)
                        }
                })
    }

    useEffect(() => {

    }, [])




    return (
        <>
            <div className="user-banner">
                <div className="user-banner__txt user-banner__txt--title">Utwórz konto</div>
                <div className="user-banner__card--wrap ">
                    <div className="user-banner__card user-banner__card--login">
                        <Link className="user-banner__button" to="login">Zaloguj się</Link>

                    </div>
                    <div className="user-banner__card user-banner__card--register">
                        <span className="user-banner__button user-banner__button--active">Utwórz konto</span>
                    </div>
                </div>
            </div>
            <div className="container">

                <div className="user-sign-box user-sign-box--register">
                    <div className="user-sign-box__content user-sign-box__content--register  user-sign-box__content--type-seler">
                        <div className="user-sign-box__txt">
                            Sprzedawca
                        </div>
                        <select className="user-sign-box__input" id="typeSeller" name="typeSeller" value={typeSeller} onInput={e => setTypeSeller(e.target.value)} onChange={x => updateValue(x)} >
                            <option className="user-sign-box__input--select-value" value="0">Prywatny</option>
                            <option className="user-sign-box__input--select-value" value="1">Biznesowy</option>
                        </select>
                    </div>
                    <div className="user-sign-box__content user-sign-box__content--register">
                        <div className="user-sign-box__txt">
                            Login
                        </div>
                        <input type="txt" className="user-sign-box__input" name="userName" onChange={x => updateValue(x.target)} />
                    </div>
                    <div className="user-sign-box__content user-sign-box__content--register">
                        <div className="user-sign-box__txt">
                            Hasło
                        </div>
                        <input type="password" className="user-sign-box__input" name="password" onChange={x => updateValue(x.target)} />
                    </div>
                    <div className="user-sign-box__content user-sign-box__content--register">
                        <div className="user-sign-box__txt">
                            E-mail
                        </div>
                        <input type="txt" className="user-sign-box__input" name="email" onChange={x => updateValue(x.target)} />
                    </div>
                    <div className="user-sign-box__content user-sign-box__content--register">
                        <div className="user-sign-box__txt">
                            Numer Telefonu
                        </div>
                        <input type="txt" className="user-sign-box__input" name="phoneNumber" onChange={x => updateValue(x.target)} />
                    </div>
                    {typeSeller == "0" && <> <div className="user-sign-box__content user-sign-box__content--register">
                        <div className="user-sign-box__txt">
                            Imie
                        </div>
                        <input type="txt" className="user-sign-box__input" name="firstName" onChange={x => updateValue(x.target)} />
                    </div>
                        <div className="user-sign-box__content user-sign-box__content--register">
                            <div className="user-sign-box__txt">
                                Nazwisko
                        </div>
                            <input type="txt" className="user-sign-box__input" name="secondName" onChange={x => updateValue(x.target)} />
                        </div>
                    </>}
                    {typeSeller == "1" && <div className="user-sign-box__content user-sign-box__content--register user-sign-box__content--company-name">
                        <div className="user-sign-box__txt">
                            Nazwa firmy
                        </div>
                        <input type="txt" className="user-sign-box__input" name="companyName" onChange={x => updateValue(x.target)} />
                    </div>
                    }
                    <div className="user-sign-box__content  user-sign-box__content--button  user-sign-box__content--button-register">
                        <div className="user-sign-box__button" onClick={x => submit()}>
                            Utwórz konto
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register;