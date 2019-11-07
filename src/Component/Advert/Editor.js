import React, { useState, useEffect, state, isValidElement } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import FileToBase64 from '../FileToBase64';
import Cookies from 'js-cookie';
import config from '../../config.json'
const Editor = () => {


    const [advertDataValue, setAdvertDataValue] = useState([]);
    const updateadvertDataValue = e => {
        setAdvertDataValue({ ...advertDataValue, [e.name]: e.value })
        console.log(advertDataValue)
    }

    const [imagesGallery, setImagesGallery] = useState([]);


    const [producerList, setProducerList] = useState([]);
    const [modelList, setModelList] = useState([]);

    const [fuelList, setFuelList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [colorList, setColorList] = useState([{ value: "brown-beige", label: "Beżowy", name: "Color" }
        , { value: "brown-beige", label: "Beżowy", name: "Color" }
        , { value: "white", label: "Biały", name: "Color" }
        , { value: "dark-red", label: "Bordowy", name: "Color" }
        , { value: "brown", label: "Brązowy", name: "Color" }
        , { value: "black", label: "Czarny", name: "Color" }
        , { value: "red", label: "Czerwony", name: "Color" }
        , { value: "violet", label: "Fioletowy", name: "Color" }
        , { value: "blue", label: "Niebieski", name: "Color" }
        , { value: "silver", label: "Srebrny", name: "Color" }
        , { value: "grey", label: "Szary", name: "Color" }
        , { value: "green", label: "Zielony", name: "Color" }
        , { value: "yellow-gold", label: "Złoty", name: "Color" }
        , { value: "yellow", label: "Żółty", name: "Color" }
        , { value: "other", label: "Inny kolor", name: "Color" }]);

    const saveEquipment = (e) => {
        if (e.target.checked == true) {

            setEquipment([...equipment, e.target.value]);

        }
        else {

            setEquipment(equipment.filter(name => !name.includes(e.target.value)));
        }
    }


    useEffect(() => {
        getProducerList();
        getFuelList();
        getEquipmentList();
        const date = new Date();
        let yearProductionTmp = [];
        for (let x = date.getFullYear(); x >= 1900; --x) {
            yearProductionTmp.push({ value: x, label: x, name: "Year" });
        }
        setYearList(yearProductionTmp);
    }, []);


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
                        tmp.push({ value: x.idString, label: x.producentName, name: "CarProducent" })
                    ));
                setProducerList(tmp)


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
    const getModelList = async (id) => {
        setModelList([])

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
                        tmp.push({ value: x.idString, label: x.modelName, name: "CarModel" })
                    ));
                setModelList(tmp)


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

                if (res.succeeded)

                    res.fuelList.map(x => (
                        tmp.push({ value: x.idString, label: x.fuelName, name: "Fuel" })
                    ));
                setFuelList(tmp)

            })
    }

    const saveImage = (image) => {
        setImagesGallery([...imagesGallery, {
            Base64: image.base64,
            Name: image.name,
            Type: image.type
        }])

    }
    const removeImage = (index) => {
        setImagesGallery((imagesGallery).splice(index, 1))
    }

    useEffect(() => {

    }, [imagesGallery, yearList]);
    const submit = async () => {

        const obj = {
            ...advertDataValue,
            FileViewModels: imagesGallery,
            equipment
        }
        console.log(obj)
        await fetch(config.apiRoot + "/api/CarOffer", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(res => {

                console.log(res);
            })
    }
    return (
        <div className="advert-editor">
            <div className="advert-editor__box" >
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Marka  </div>
                        <Select className="advert-editor__select"
                            isDisabled={producerList.length <= 0 ? true : false}
                            options={producerList}
                            onChange={x => { updateadvertDataValue(x); getModelList(x.value); }}
                        />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Model</div>
                        <Select
                            isDisabled={modelList.length <= 0 ? true : false}
                            options={modelList}
                            onChange={x => { updateadvertDataValue(x); }}
                            value={modelList.length <= 0 || advertDataValue.CarModel == null ? "" : { value: advertDataValue.CarModel, label: advertDataValue.CarModel }}
                            className="advert-editor__select" />
                    </div>
                    {/*  <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Model</div>
                        <Select className="advert-editor__select" />
                    </div>*/ }
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle">Paliwo</div>
                        <div className="advert-editor__fieldset" value="">

                            {fuelList.length > 0 && fuelList.map(x => (
                                <>
                                    <input className="advert-editor__button--checkbox" type="radio" onChange={x => updateadvertDataValue(x.target)} name={x.name} id={`fuel-${x.value}`} value={x.value} />
                                    <label htmlFor={`fuel-${x.value}`} className="advert-editor__button">{x.label}</label>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Rok Produkcji:</div>
                        <Select
                            isDisabled={yearList.length <= 0 ? true : false}
                            options={yearList}
                            onChange={x => { updateadvertDataValue(x); }}
                            className="advert-editor__select" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Numer Vin  </div>
                        <input type="text" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="VinNumber" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Przebieg</div>
                        <input type="text" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="Mileage" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Krótki opis </div>
                        <input className="advert-editor__input advert-editor__input--large" onChange={x => updateadvertDataValue(x.target)} name="ShortDescription" />
                    </div>
                </div>
            </div>
            <div className="advert-editor__box" >
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Numer telefonu  </div>
                        <input type="tel" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="PhoneNumber" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Cena </div>
                        <input type="number" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="Price" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Kraj pochodzenia </div>
                        <input type="text" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="Country" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Opis </div>
                        <textarea className="advert-editor__input advert-editor__input--description" onChange={x => updateadvertDataValue(x.target)} name="Description" />
                    </div>
                </div>
            </div>
            <div className="advert-editor__box" >
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Kolor  </div>
                        <Select
                            isDisabled={colorList.length <= 0 ? true : false}
                            options={colorList}
                            onChange={x => { updateadvertDataValue(x); }}
                            className="advert-editor__select " />
                    </div>

                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Ilość drzwi  </div>
                        <Select
                            onChange={x => { updateadvertDataValue(x); }}
                            options={[{ value: "1", label: "1", name: "Door" }
                                , { value: "2", label: "2", name: "Door" }
                                , { value: "3", label: "3", name: "Door" }
                                , { value: "4", label: "4", name: "Door" }
                                , { value: "5", label: "5", name: "Door" }
                                , { value: "6", label: "6", name: "Door" }
                                , { value: "7", label: "7", name: "Door" }
                                , { value: "8", label: "8", name: "Door" }
                                , { value: "9", label: "9", name: "Door" }
                                , { value: "10", label: "10", name: "Door" }]}
                            className="advert-editor__select" />
                    </div>

                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Ilość siedzeń   </div>
                        <Select
                            onChange={x => { updateadvertDataValue(x); }}
                            options={[{ value: "1", label: "1", name: "Seat" }
                                , { value: "2", label: "2", name: "Seat" }
                                , { value: "3", label: "3", name: "Seat" }
                                , { value: "4", label: "4", name: "Seat" }
                                , { value: "5", label: "5", name: "Seat" }
                                , { value: "6", label: "6", name: "Seat" }
                                , { value: "7", label: "7", name: "Seat" }
                                , { value: "8", label: "8", name: "Seat" }
                                , { value: "9", label: "9", name: "Seat" }
                                , { value: "10", label: "10", name: "Seat" }]}
                            className="advert-editor__select" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Moc </div>
                        <input type="number" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="HoursePower" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Stan </div>
                        <Select
                            
                            onChange={x => { updateadvertDataValue(x); }}
                            options={[{ value: "new", label: "Nowy", name: "condition" }
                                , { value: "used", label: "Używany", name: "condition" }
                                , { value: "damaged", label: "Uszkodzony", name: "condition" }
                                , { value: "crashed", label: "Powypadkowy", name: "condition" }
                            ]}
                            className="advert-editor__select" />
                    </div>
                </div>

                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Wyposażenie  </div>
                        <div className="advert-editor__fieldset" >
                            {equipmentList.length > 0 && equipmentList.map(x => (
                                <>
                                    <input onChange={x => saveEquipment(x)} className="advert-editor__button--checkbox" type="checkbox" name={x.name} id={`equipment-${x.value}`} value={x.value} />
                                    <label htmlFor={`equipment-${x.value}`} className="advert-editor__button advert-editor__button--equipment">{x.label} </label>
                                </>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <div className="advert-editor__box" >
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Zdjęcia </div>
                        <FileToBase64
                            id="uploadPhoto"
                            className="advert-editor__hidden"
                            multiple={false}
                            name="upload"
                            onDone={x => saveImage(x)} />
                        {imagesGallery.length <= 0 && <div className="advert-editor__txt advert-editor__txt--no-photo">
                            Brak zdjęć
                            <label className="advert-editor__button advert-editor__button--upload advert-editor__button--red" htmlFor="uploadPhoto" >Kliknij, aby dodać</label>
                        </div>}

                        {imagesGallery.length > 0 &&
                            <>
                                <div className="advert-editor__gallery">
                                    {imagesGallery.map((image, index) => (

                                        <div className="advert-editor__gallery-item" key={"div" + index}>
                                            <img className="advert-editor__gallery-image" key={'img' + index} src={`${image.Base64}`} />
                                            <input className="advert-editor__button advert-editor__button--large" key={'inp' + index} type="button" value="usuń" onClick={() => removeImage(index)} />
                                        </div>
                                    ))
                                    }
                                </div>

                                <label className="advert-editor__button advert-editor__button--upload" htmlFor="uploadPhoto" >Dodaj Zdjęcie</label>
                            </>
                        }

                    </div>
                </div>
            </div>
            <div className="advert-editor__row">
                <div className="advert-editor__button  advert-editor__button--submit" onClick={x => submit()} >Dodaj Ogłoszenie</div>
            </div>
        </div>
    )
}


export default Editor;

