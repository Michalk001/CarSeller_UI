import React, { useState, useEffect, state } from "react";
import { Link } from 'react-router-dom';
import config from '../../config.json'
import Cookies from 'js-cookie';
import Select from 'react-select';

const AdminDashboard = () => {

    const [showProducerContent, setShowProducerContent] = useState(false);
    const [showModelContent, setShowModelContent] = useState(false);

    const [modelList, setModelList] = useState([]);
    const [producerList, setProducerList] = useState([]);

    const [producerData, setProducerData] = useState([])
    const [modelData, setModelData] = useState([])

    const updateProducerData = (e) => {
        setProducerData({ ...producerData, [e.name]: e.value })

    }
    const updateModelData = (e) => {
        setModelData({ ...modelData, [e.name]: e.value })
        console.log(modelData)

    }
    const saveProducer = async () => {
        const ob = {
            ProducentName: producerData.producerName
        }

        await fetch(config.apiRoot + "/api/CarProducent/", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                getProducerList();
                setProducerData([])
            })

    }
    const saveModel = async () => {
        const ob = {
            ModelName: modelData.modelName,
            IdProducer: modelData.Producer
        }

        await fetch(config.apiRoot + "/api/CarModel/", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                setModelData([])
            })

    }
    const updateProducerName = async () => {
        const ob = {
            ProducentName: producerData.newProducerName,
            IdString: producerData.Producer
        }

        await fetch(config.apiRoot + "/api/CarProducent/" + producerData.Producer, {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                if (res.succeeded) {
                    setProducerData([])
                    getProducerList();

                }
            })
    }
    const updateModelName = async () => {
        const ob = {
            ModelName: modelData.newModelName,
            IdString: modelData.Model,
            IdProducer: modelData.Producer
        }

        await fetch(config.apiRoot + "/api/CarModel/" + modelData.Model, {
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
                    getModelList(modelData.Producer);
                    setModelData([])


                }
            })
    }
    const removeProducer = async () => {
        await fetch(config.apiRoot + "/api/CarProducent/" + producerData.Producer, {
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
                    setProducerData([])
                    getProducerList();

                }
            })
    }
    const removeModel = async () => {
        await fetch(config.apiRoot + "/api/CarModel/" + modelData.Producer + "/" + modelData.Model, {
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
                    getModelList(modelData.Producer);
                    setModelData([])

                }
            })
    }
    const getProducerList = async () => {
        let tmp = [];
        await fetch(config.apiRoot + "/api/CarProducent", {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.succeeded)

                    res.carProducerList.map(x => (
                        tmp.push({ value: x.idString, label: x.producentName, name: "Producer" })
                    ));
                setProducerList(tmp)


            })
    }
    const getModelList = async (id) => {
        let tmp = [];
        await fetch(config.apiRoot + "/api/CarProducent/" + id, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.succeeded)

                    res.modelList.map(x => (
                        tmp.push({ value: x.idString, label: x.modelName, name: "Model" })
                    ));
                setModelList(tmp)


            })
    }
    useEffect(() => {
        getProducerList();
    }, []);

    useEffect(() => {
    }, [modelList, producerList]);

    return (
        <div className="dashboard-setting">

            <div className={`dashboard-setting__box dashboard-setting__box--admin ${showProducerContent ? "dashboard-setting__box--open" : ""}`} onClick={x => { setShowProducerContent(true); setShowModelContent(false) }}>
                <div className="dashboard-setting__txt dashboard-setting__txt--title">Producenci</div>
                <div className={`dashboard-setting__content  ${showProducerContent ? "dashboard-setting__content--open" : ""}`}>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Dodaj Markę pojazdu</div>
                    <div className="dashboard-setting__row">
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Nazwa</div>
                        <input className="dashboard-setting__input dashboard-setting__input--admin-small" id="producerName" value={producerData.producerName ? producerData.producerName : ''} onChange={x => updateProducerData(x.target)} name="producerName" type="txt" />
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => saveProducer()}>Dodaj</div>
                    </div>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Zarządanie markami</div>
                    <div className="dashboard-setting__row">
                        <Select
                            options={producerList}
                            className="dashboard-setting__select"
                            onChange={x => updateProducerData(x)}

                        />
                        <input placeholder="Nowa nazwa" value={producerData.newProducerName ? producerData.newProducerName : ''}
                            onChange={x => updateProducerData(x.target)}
                            className="dashboard-setting__input dashboard-setting__input--admin-small"
                            id="newProducerName" name="newProducerName" type="txt" />
                    </div>
                    <div className="dashboard-setting__row dashboard-setting__row--position">
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => updateProducerName()} >Zmień nazwę</div>
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save dashboard-setting__button--red" onClick={x => removeProducer()}>Usuń</div>
                    </div>
                </div>
            </div>

            <div className={`dashboard-setting__box dashboard-setting__box--admin ${showModelContent ? "dashboard-setting__box--open" : ""}`} onClick={x => { setShowModelContent(true); setShowProducerContent(false) }}>
                <div className="dashboard-setting__txt dashboard-setting__txt--title">Modele pojazdów</div>
                <div className={`dashboard-setting__content  ${showModelContent ? "dashboard-setting__content--open" : ""}`}>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Dodaj Model pojazdu</div>
                    <div className="dashboard-setting__row">
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Producent</div>
                        <Select
                            onChange={x => updateModelData(x)}
                            options={producerList}
                            className="dashboard-setting__select"

                        />
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Model</div>
                        <input className="dashboard-setting__input dashboard-setting__input--admin-small"
                            value={modelData.ModelName ? modelData.ModelName : ''}
                            onChange={x => updateModelData(x.target)}
                            id="modelName" name="modelName" type="txt" />
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => saveModel()}>Dodaj</div>
                    </div>
                    <div className="dashboard-setting__txt dashboard-setting__txt--title dashboard-setting__txt--admin-section">Zarządanie markami</div>
                    <div className="dashboard-setting__row">
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Producent</div>
                        <Select
                            options={producerList}
                            onChange={x => { getModelList(x.value); updateModelData(x) }}
                            className="dashboard-setting__select"

                        />
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Model</div>
                        <Select
                            onChange={x => updateModelData(x)}
                            options={modelList}
                            className="dashboard-setting__select"

                        />
                    </div>
                    <div className="dashboard-setting__row">
                        <div className="dashboard-setting__txt dashboard-setting__txt--admin-label">Nowa nazwa</div>
                        <input className="dashboard-setting__input dashboard-setting__input--admin-small" id="newModelName" value={modelData.newModelName ? modelData.newModelName : ''} onChange={x => updateModelData(x.target)} name="newModelName" type="txt" />
                    </div>
                    <div className="dashboard-setting__row dashboard-setting__row--position">
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save" onClick={x => updateModelName()}>Zmień nazwę</div>
                        <div className="dashboard-setting__button dashboard-setting__button--admin-save dashboard-setting__button--red " onClick={x => removeModel()}>Usuń</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminDashboard;