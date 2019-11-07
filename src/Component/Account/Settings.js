import React, { useState, useEffect, state } from "react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import config from '../../config.json';
const Settings = (props) => {

    const [openContactData, setOpenContactData] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [contactDataValues, setContactDataValues] = useState(null);
    const [passwordValues, setPasswordValues] = useState([]);
    const [busyEmail, setBusyEmail] = useState(false);
    const [contactError, setContactError] = useState(false);
    const [mismatchPassword, setMismatchPassword] = useState(false);
    const [toShortPassword, setToShortPassword] = useState(false);
    const [samePassword, setSamePassword] = useState(true);
    const updateContactDataValues = e => {
        setContactDataValues({ ...contactDataValues, [e.target.name]: e.target.value })
    }

    const updatePasswordValues = e => {
        setPasswordValues({ ...passwordValues, [e.target.name]: e.target.value })
    }

    const onChangeData = async () => {

        await fetch(config.apiRoot + "/api/account/ChangeData", {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(contactDataValues)
        })
            .then(res => res.json())
            .then(res => {
                if (!res.succeeded) {
                    res.code.map(x => {
                        if (x == "BusyEmail")
                            setBusyEmail(true)
                    })
                }
                else
                    setContactError(true);
            })
            .catch(error => console.error('Error:', error));
    }


    const onChangePassword = async () => {
        if (passwordValues.passwordNew != null && passwordValues.passwordNewRepeat != null)
            if (passwordValues.passwordNew === passwordValues.passwordNewRepeat) {
                if(passwordValues.passwordNew.length < 8)
                    {
                        setToShortPassword(true);
                        return;
                    }

                await fetch(config.apiRoot + "/api/account/ChangePasword", {
                    method: "put",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': 'Bearer ' + Cookies.get('token'),
                    },
                    body: JSON.stringify(passwordValues)
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        if (!res.succeeded) {
                            res.errors.map(x => {
                                if (x.code == "PasswordMismatch")
                                    setMismatchPassword(true);
                                if (x.code == "PasswordTooShort")
                                    setToShortPassword(true)
                            })
                        }
                        else {
                            setPasswordChange(true)
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
            else {
                setSamePassword(false);
                console.log("Non")
            }
        else {
            setSamePassword(false);
        }
    }


    return (<>
        <div className="dashboard-banner">
            <div className="dashboard-banner__txt">
                Ustawienia
                </div>
            <div className="dashboard-banner__card-wrap">
                <div className="dashboard-banner__card dashboard-banner__card--advert" to="/advertAdd">

                    <Link className="dashboard-banner__button dashboard-banner__button--active" to="/account/">
                        Ogłoszenia
                   </Link>
                </div>
                <div className="dashboard-banner__card dashboard-banner__card--settings">
                    <div className="dashboard-banner__button" >Ustawienia</div>
                </div>
            </div>
        </div>
        <div className="dashboard-setting">
            <div className={`dashboard-setting__box ${openContactData ? "dashboard-setting__box--open" : ""}`} onClick={x => { setOpenContactData(true); setOpenPassword(false) }}>
                <div className="dashboard-setting__txt dashboard-setting__txt--title">Zmień dane kontaktowe</div>
                <div className={`dashboard-setting__content ${openContactData ? "dashboard-setting__content--open" : ""}`}>
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Miasto</div>
                    <input className="dashboard-setting__input" id="city" name="city" type="txt"  onChange={x => updateContactDataValues(x)} />
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Kod Pocztowy</div>
                    <input className="dashboard-setting__input" id="postCode" name="postCode" type="txt" onChange={x => updateContactDataValues(x)} />
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Email</div>
                    <input className="dashboard-setting__input" id="email" name="email" type="email" onChange={x => updateContactDataValues(x)} />
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Numer Telefonu</div>
                    <input className="dashboard-setting__input" id="phone" name="phoneNumber" type="number" onChange={x => updateContactDataValues(x)} />
                    {busyEmail && <div className="dashboard-setting__txt dashboard-setting__txt--error-box">Adres email jest zajęty</div>}
                    {contactError && <div className="dashboard-setting__txt dashboard-setting__txt--error-box">Hasło wymaga minimum 8 znaków</div>}
                    <div className="dashboard-setting__button" onClick={x => onChangeData()}>Zaktualizuj</div>
                </div>
            </div>
            <div className={`dashboard-setting__box dashboard-setting__box--password  ${openPassword ? "dashboard-setting__box--open" : ""}`} onClick={x => { setOpenContactData(false); setOpenPassword(true) }}>
                <div className="dashboard-setting__txt dashboard-setting__txt--title">Zmień dane kontaktowe</div>
                <div className={`dashboard-setting__content ${openPassword ? "dashboard-setting__content--open" : ""}`}>
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Stare hasło</div>
                    <input className="dashboard-setting__input" id="passwordOld" name="passwordOld" type="password" onChange={x => updatePasswordValues(x)} />
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Nowe Hasło</div>
                    <input className="dashboard-setting__input" id="passwordNew" name="passwordNew" type="password" onChange={x => updatePasswordValues(x)} />
                    <div className="dashboard-setting__txt dashboard-setting__txt--content">Powtórz Nowe Hasło</div>
                    <input className="dashboard-setting__input" id="passwordNewRepeat" name="passwordNewRepeat" type="password" onChange={x => updatePasswordValues(x)} />
                    {toShortPassword && <div className="dashboard-setting__txt dashboard-setting__txt--error-box">Hasło wymaga minimum 8 znaków</div>}
                    {!samePassword && <div className="dashboard-setting__txt dashboard-setting__txt--error-box">Hasła nie są takie same</div>}
                    {mismatchPassword && <div className="dashboard-setting__txt dashboard-setting__txt--error-box">Aktualne hasło jest błędne</div>}
                    <div className="dashboard-setting__button" onClick={x => onChangePassword()}>Zaktualizuj</div>
                </div>
            </div>
        </div>
    </>)

}

export default Settings