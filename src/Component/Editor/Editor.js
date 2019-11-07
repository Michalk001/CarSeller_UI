import React, { useState, useEffect, state, isValidElement } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import FileToBase64 from '../FileToBase64';
import Cookies from 'js-cookie';
import config from '../../config.json'
const Editor = ({ submit, advertValue }) => {


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
    const [carModel, setCarModel] = useState("");
    const [colorList, setColorList] = useState([{ value: "brown-beige", label: "Beżowy", name: "color" }
        , { value: "brown-beige", label: "Beżowy", name: "color" }
        , { value: "white", label: "Biały", name: "color" }
        , { value: "dark-red", label: "Bordowy", name: "color" }
        , { value: "brown", label: "Brązowy", name: "color" }
        , { value: "black", label: "Czarny", name: "color" }
        , { value: "red", label: "Czerwony", name: "color" }
        , { value: "violet", label: "Fioletowy", name: "color" }
        , { value: "blue", label: "Niebieski", name: "color" }
        , { value: "silver", label: "Srebrny", name: "color" }
        , { value: "grey", label: "Szary", name: "color" }
        , { value: "green", label: "Zielony", name: "color" }
        , { value: "yellow-gold", label: "Złoty", name: "color" }
        , { value: "yellow", label: "Żółty", name: "color" }
        , { value: "other", label: "Inny kolor", name: "color" }]);

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
        if (advertValue != null) {
            
            setAdvertDataValue(advertValue)
            setCarModel(advertValue.carModel)
            setEquipment(advertValue.equipment)
            setImagesGallery(advertValue.fileViewModels)
            getModelList(advertValue.carProducent)
        }

        const date = new Date();
        let yearProductionTmp = [];
        for (let x = date.getFullYear(); x >= 1900; --x) {
            yearProductionTmp.push({ value: x, label: x, name: "year" });
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
                        tmp.push({ value: x.idString, label: x.producentName, name: "carProducent" })
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
                        tmp.push({ value: x.idString, label: x.name, name: "equipment" })
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
                        tmp.push({ value: x.idString, label: x.modelName, name: "carModel" })
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
                        tmp.push({ value: x.idString, label: x.fuelName, name: "fuel" })
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
        console.log(advertDataValue)
    }, [imagesGallery, yearList]);
    return (
        <div className="advert-editor">
            <div className="advert-editor__box" >
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Marka  </div>
                        <Select className="advert-editor__select"
                            isDisabled={producerList.length <= 0 ? true : false}
                            options={producerList}
                            value={advertDataValue.carProducent == null ? "" : { value: advertDataValue.carProducent, label: producerList.length > 0 ? producerList.find((x) => { return x.value == advertDataValue.carProducent }).label : "" }}
                            onChange={(x) => { getModelList(x.value); updateadvertDataValue(x);  setCarModel("") }  }  
                        />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Model</div> {console.log(carModel)}
                        <Select
                            isDisabled={modelList.length <= 0 ? true : false}
                            options={modelList}
                            onChange={x => { setCarModel(x.value); }}
                            value={carModel == "" ? "" : { value: carModel, label: modelList.length > 0 ? modelList.find((x) => { return x.value == carModel }).label : "" }}
                            className="advert-editor__select" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle">Paliwo</div>
                        <div className="advert-editor__fieldset" value="">

                            {fuelList.length > 0 && fuelList.map(x => (
                                <>
                                    <input checked={

                                        advertDataValue.fuel != null && advertDataValue.fuel.includes(x.value)

                                    } className="advert-editor__button--checkbox" type="radio" onChange={x => updateadvertDataValue(x.target)} name={x.name} id={`fuel-${x.value}`} value={x.value} />
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
                            value={advertDataValue.year == null ? "" : { value: advertDataValue.year, label: advertDataValue.year }}
                            onChange={x => { updateadvertDataValue(x); }}
                            className="advert-editor__select" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Numer Vin  </div>
                        <input value={advertDataValue.vinNumber} type="text" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="vinNumber" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Przebieg</div>
                        <input value={advertDataValue.mileage} type="text" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="mileage" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Krótki opis </div>
                        <input value={advertDataValue.shortDescription} className="advert-editor__input advert-editor__input--large" onChange={x => updateadvertDataValue(x.target)} name="shortDescription" />
                    </div>
                </div>
            </div>
            <div className="advert-editor__box" >
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Numer telefonu  </div>
                        <input value={advertDataValue.phoneNumber} type="tel" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="phoneNumber" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Cena </div>
                        <input value={advertDataValue.price} type="number" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="price" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Kraj pochodzenia </div>
                        <input value={advertDataValue.country} type="text" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="country" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content advert-editor__content--large">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Opis </div>
                        <textarea value={advertDataValue.description} className="advert-editor__input advert-editor__input--description" onChange={x => updateadvertDataValue(x.target)} name="description" />
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
                            value={advertDataValue.color == null ? "" : { value: advertDataValue.color, label: colorList.find((x) => { return x.value == advertDataValue.color }).label }}
                            onChange={x => { updateadvertDataValue(x); }}
                            className="advert-editor__select " />
                    </div>

                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Ilość drzwi  </div>
                        <Select
                            value={advertDataValue.door == null ? "" : { value: advertDataValue.door, label: advertDataValue.door }}
                            onChange={x => { updateadvertDataValue(x); }}
                            options={[{ value: "1", label: "1", name: "door" }
                                , { value: "2", label: "2", name: "door" }
                                , { value: "3", label: "3", name: "door" }
                                , { value: "4", label: "4", name: "door" }
                                , { value: "5", label: "5", name: "door" }
                                , { value: "6", label: "6", name: "door" }
                                , { value: "7", label: "7", name: "door" }
                                , { value: "8", label: "8", name: "door" }
                                , { value: "9", label: "9", name: "door" }
                                , { value: "10", label: "10", name: "door" }]}
                            className="advert-editor__select" />
                    </div>

                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Ilość siedzeń   </div>
                        <Select
                            value={advertDataValue.seat == null ? "" : { value: advertDataValue.seat, label: advertDataValue.seat }}
                            onChange={x => { updateadvertDataValue(x); }}
                            options={[{ value: "1", label: "1", name: "seat" }
                                , { value: "2", label: "2", name: "seat" }
                                , { value: "3", label: "3", name: "seat" }
                                , { value: "4", label: "4", name: "seat" }
                                , { value: "5", label: "5", name: "seat" }
                                , { value: "6", label: "6", name: "seat" }
                                , { value: "7", label: "7", name: "seat" }
                                , { value: "8", label: "8", name: "seat" }
                                , { value: "9", label: "9", name: "seat" }
                                , { value: "10", label: "10", name: "seat" }]}
                            className="advert-editor__select" />
                    </div>
                </div>
                <div className="advert-editor__row">
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Moc </div>

                        <input value={advertDataValue.hoursePower} type="number" className="advert-editor__input" onChange={x => updateadvertDataValue(x.target)} name="hoursePower" />
                    </div>
                    <div className="advert-editor__content">
                        <div className="advert-editor__txt advert-editor__txt--subtitle"> Stan </div>
                        <Select
                            value={advertDataValue.condition == null ? "" : { value: advertDataValue.condition, label: advertDataValue.condition }}
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
                                    <input checked={

                                        equipment != null && equipment.includes(x.value)

                                    } onChange={x => saveEquipment(x)} className="advert-editor__button--checkbox" type="checkbox" name={x.name} id={`equipment-${x.value}`} value={x.value} />
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
                                            <img className="advert-editor__gallery-image" key={'img' + index} src={image.Base64 != null ? `${image.Base64}` : config.apiRoot + "/" + image.path} />
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

            <div></div>

            <div className="advert-editor__row">
                <div className="advert-editor__button  advert-editor__button--submit" onClick={x => submit({
                    ...advertDataValue,
                    FileViewModels: imagesGallery,
                    equipment,
                    carModel
                })} >Zapisz zmiany</div>
            </div>
        </div>
    )
}


export default Editor;

