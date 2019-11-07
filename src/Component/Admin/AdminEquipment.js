import React, { useState, useEffect, state } from "react";
import { Link } from 'react-router-dom';
import config from '../../config.json'
import Cookies from 'js-cookie';
import Select from 'react-select';

const AdminEquipment = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [fuelList, setFuelList] = useState([]);
    const [showFuelContent, setShowFuelContent] = useState(false);
    const [showEquipmentContent, setShowEquipmentContent] = useState(false);

    const [equipmentData, setEquipmentData] = useState([])
    
    const [fuelData, setFuelData] = useState([])

    const updateFuelData = (e) => {
        setFuelData({ ...fuelData, [e.name]: e.value });
    }


    const saveEquipment = async () => {
        const ob = {
            Name: equipmentData.equipmentName
        }

        await fetch(config.apiRoot + "/api/Equipment/", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                setEquipmentData([])
                getEquipmentList();
            })
    }

    const saveFuel = async () => {
        const ob = {
            FuelName: fuelData.fuelName
        }

        await fetch(config.apiRoot + "/api/FuelType/", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                setFuelData([])
                getFuelList();
            })
    }

    const getEquipmentList = async () => {
        let tmp = [];
        await fetch(config.apiRoot + "/api/Equipment", {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.succeeded)

                    res.equipmentList.map(x => (
                        tmp.push({ value: x.idString, label: x.name, name: "Equipment" })
                    ));
                setEquipmentList(tmp)
            })
    }

    const getFuelList = async () => {
        let tmp = [];
        await fetch(config.apiRoot + "/api/FuelType", {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.succeeded)

                    res.fuelList.map(x => (
                        tmp.push({ value: x.idString, label: x.fuelName, name: "Fuel" })
                    ));
                setFuelList(tmp)
            })
    }

    const updateEquipment = async () => {
        const ob = {
            Name: equipmentData.newEquipmentName,
            IdString: equipmentData.Equipment
        }

        await fetch(config.apiRoot + "/api/Equipment/" + equipmentData.Equipment, {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.succeeded) {
                    setEquipmentData([])
                    getEquipmentList();

                }
            })
    }

    const updateFuel = async () => {
        const ob = {
            FuelName: fuelData.newFuelName,
            IdString: fuelData.Fuel
        }

        await fetch(config.apiRoot + "/api/FuelType/" +  fuelData.Fuel, {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.succeeded) {
                    setFuelData([]);
                    getFuelList();

                }
            })
    }

    const removeEquipment = async () => {
        await fetch(config.apiRoot + "/api/Equipment/" + equipmentData.Equipment, {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.succeeded) {
                    setEquipmentData([])
                    getEquipmentList();

                }
            })
    }

    const removeFuel = async () => {
        await fetch(config.apiRoot + "/api/FuelType/" +  fuelData.Fuel, {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res.succeeded) {
                    setFuelData([])
                    getFuelList();

                }
            })
    }

    useEffect(() => {
        getEquipmentList();
        getFuelList();
    }, []);

    return (
        <div className="dashboard-setting">
            <div className={`dashboard-setting__box dashboard-setting__box--admin ${showEquipmentContent ? "dashboard-setting__box--open" : ""}`} onClick={x => { setShowEquipmentContent(true); setShowFuelContent(false) }}>
                <div className="dashboard-setting__txt dashboard-setting__txt--title">Wyposażenie</div>
                <div className={`dashboard-setting__content  ${showEquipmentContent ? "dashboard-setting__content--open" : ""}`}>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Dodaj nowe wyposażenie</div>
                    <div className="dashboard-setting__row">
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Nazwa</div>
                        <input className="dashboard-setting__input dashboard-setting__input--admin-small" id="equipmentName" value={equipmentData.equipmentName ? equipmentData.equipmentName : ''} onChange={x => updateEquipmentData(x.target)} name="equipmentName" type="txt" />
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => saveEquipment()}>Dodaj</div>
                    </div>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Zarządanie wyposażeniem</div>
                    <div className="dashboard-setting__row">
                        <Select
                            options={equipmentList}
                            className="dashboard-setting__select"
                            onChange={x => updateEquipmentData(x)}

                        />
                        <input placeholder="Nowa nazwa" value={equipmentData.newEquipmentName ? equipmentData.newEquipmentName : ''}
                            onChange={x => updateEquipmentData(x.target)}
                            className="dashboard-setting__input dashboard-setting__input--admin-small"
                            id="newEquipmentName" name="newEquipmentName" type="txt" />
                    </div>
                    <div className="dashboard-setting__row dashboard-setting__row--position">
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => updateEquipment()} >Zmień nazwę</div>
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save dashboard-setting__button--red" onClick={x => removeEquipment()}>Usuń</div>
                    </div>
                </div>
            </div>

            <div className={`dashboard-setting__box dashboard-setting__box--admin ${showFuelContent ? "dashboard-setting__box--open" : ""}`} onClick={x => { setShowEquipmentContent(false); setShowFuelContent(true) }}>
                <div className="dashboard-setting__txt dashboard-setting__txt--title">Paliwo</div>
                <div className={`dashboard-setting__content  ${showFuelContent ? "dashboard-setting__content--open" : ""}`}>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Dodaj nowe rodzaj paliwa</div>
                    <div className="dashboard-setting__row">
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Nazwa</div>
                        <input className="dashboard-setting__input dashboard-setting__input--admin-small" id="fuelName" value={fuelData.fuelName ? fuelData.fuelName : ''} onChange={x => updateFuelData(x.target)} name="fuelName" type="txt" />
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => saveFuel()}>Dodaj</div>
                    </div>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Zarządanie paliwami</div>
                    <div className="dashboard-setting__row">
                        <Select
                            options={fuelList}
                            className="dashboard-setting__select"
                            onChange={x => updateFuelData(x)}

                        />
                        <input placeholder="Nowa nazwa" value={fuelData.newFuelName ? fuelData.newFuelName : ''}
                            onChange={x => updateFuelData(x.target)}
                            className="dashboard-setting__input dashboard-setting__input--admin-small"
                            id="newFuelName" name="newFuelName" type="txt" />
                    </div>
                    <div className="dashboard-setting__row dashboard-setting__row--position">
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => updateFuel()} >Zmień nazwę</div>
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save dashboard-setting__button--red" onClick={x => removeFuel()}>Usuń</div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default AdminEquipment;