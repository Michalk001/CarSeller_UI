import Select from 'react-select';
import React, { useState, useEffect, state, useReducer } from "react";
import { Link } from 'react-router-dom';
import config from '../../config.json'
import Cookies from 'js-cookie';

import Creatable from 'react-select/creatable';
import SelectCustomStyle from '../../Untiles/SelectCustomStyle.js';
import ReactLoading from 'react-loading';

const AdvertMain = (props) => {

    const [condition, setCondition] = useState('');
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxMilage, setMaxMilage] = useState('');
    const [minMilage, setMinMilage] = useState('');
    const [fuel, setFuel] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carProducer, setCarProducer] = useState('');

    const [priceMinArray, setPriceMinArray] = useState(getMinPrice());
    const [priceMaxArray, setPriceMxArray] = useState(getMaxPrice());
    const [yearArray, setYearArray] = useState(getYearArray());
    const [milageArray, setMilageArray] = useState(getMilageArray());
    const [producerList, setProducerList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [fuelList, setFuelList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    function getMilageArray() {
        let tmp = [];

        tmp.push({ value: "20000", label: "20000 km" });
        tmp.push({ value: "50000", label: "50000 km" });
        tmp.push({ value: "100000", label: "100000 km" });
        tmp.push({ value: "200000", label: "200000 km" });
        tmp.push({ value: "250000", label: "250000 km" });
        tmp.push({ value: "300000", label: "300000 km" });

        return tmp;
    }

    function getYearArray() {
        let tmp = [];
        const date = new Date();
        for (let x = date.getFullYear(); x >= 1900; --x) {
            tmp.push({ value: x, label: x });
        }
        return tmp;
    }
    function getMinPrice() {
        let tmp = [];
        tmp.push({ value: 2000, label: 2000 + " PLN" });
        for (let x = 1; x <= 12; ++x) {
            tmp.push({ value: 5000 * x, label: 5000 * x + " PLN" });
        }
        return tmp;
    }
    function getMaxPrice() {
        let tmp = getMinPrice();
        tmp.push({ value: 80000, label: "80000 PLN" });
        tmp.push({ value: 100000, label: "100000 PLN" });
        tmp.push({ value: 200000, label: "200000 PLN" });
        tmp.push({ value: 500000, label: "500000 PLN" });
        tmp.push({ value: 1000000, label: "1000000 PLN" });
        tmp.push({ value: 5000000, label: "5000000 PLN" });
        return tmp;
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
                        tmp.push({ value: x.idString, label: x.fuelName })
                    ));
                setFuelList(tmp)
                setIsLoad(true);
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
                        tmp.push({ value: x.idString, label: x.producentName })
                    ));
                setProducerList(tmp)


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
                        tmp.push({ value: x.idString, label: x.modelName })
                    ));
                setModelList(tmp)


            })
    }

    const onSubmit = () => {
        props.history.push(`/Advert/producer=${carProducer}&model=${carModel}&fuel=${fuel}/1`);
    }

    useEffect(() => {
        getProducerList();
        getFuelList();
    }, [modelList])

    return (
        <div className="container">

            <div className="search-min">
                <div className="search-min__box search-min__box--row">
                    <div className="search-min__row">
                        <label className={`search-min__txt search-min__txt--condition ${condition == '' ? "search-min__txt--activeCondition" : ""} `} >
                            <input style={{ display: "none" }} type="radio" name="status" value='' onClick={x => setCondition(x.target.value)} />
                            Wszystkie
                        </label>
                        <label className={`search-min__txt search-min__txt--condition ${condition == 'new' ? "search-min__txt--activeCondition" : ""} `}>
                            <input style={{ display: "none" }} type="radio" value="new" name="status" onClick={x => setCondition(x.target.value)} />
                            Nowe
                        </label>
                        <label className={`search-min__txt search-min__txt--condition search-min__txt--condition-last ${condition == 'used' ? "search-min__txt--activeCondition" : ""} `}>
                            <input style={{ display: "none" }} type="radio" value="used" name="status" onClick={x => setCondition(x.target.value)} />
                            Używawne
                        </label>
                    </div>
                </div>
                
                <div className="search-min__box">
                    <div className="search-min__txt"> Marka i Model</div>
                    <div className="search-min__row">
                        <Select
                            className="search-min__select"
                            isDisabled={producerList.length <= 0 ? true : false}
                            onChange={(x) => { x != null ? (setCarProducer(x.value), getModelList(x.value), setCarModel('')) : (setModelList([]), setCarProducer(''), setCarModel('')) }}
                            options={producerList}
                            placeholder="Marka"
                            isClearable={true}
                            styles={SelectCustomStyle}
                        />
                        <Select
                            className="search-min__select"
                            isDisabled={modelList.length <= 0 ? true : false}
                            options={modelList}
                            placeholder="Model"
                            isClearable={true}
                            onChange={(x) => { x != null ? setCarModel(x.value) : (setCarModel('')) }}
                            styles={SelectCustomStyle}
                        />
                    </div>
                </div>
                <div className="search-min__box">
                    <div className="search-min__txt"> Rok Produkcji</div>
                    <div className="search-min__row">
                        <Select
                            className="search-min__select"
                            options={yearArray}
                            placeholder="od"
                            isClearable={true}

                            onChange={(x) => { x != null ? setMinYear(x.value) : setMinYear(''); if (minYear > maxYear) setMinYear('') }}
                            styles={SelectCustomStyle}
                        />
                        <Select
                            className="search-min__select"
                            options={yearArray}
                            placeholder="do"
                            isClearable={true}

                            onChange={(x) => { x != null ? setMaxYear(x.value) : setMaxYear(''); if (minYear > maxYear) setMinYear('') }}
                            styles={SelectCustomStyle}

                        />
                    </div>
                </div>
                <div className="search-min__box">
                
                    <div className="search-min__txt"> Cena</div>
                    <div className="search-min__row">
                        {<Creatable
                            className="search-min__select"
                            isDisabled={priceMinArray.length <= 0 ? true : false}
                            options={priceMinArray}
                            value
                            onChange={(x) => { (x != null && Number.isInteger(x)) ? setMinPrice(x.value) : setMinPrice(''); if (minPrice > maxPrice) setMinPrice('') }}
                            isClearable={true}
                            placeholder="od"
                            styles={SelectCustomStyle}
                        />}
                        <Creatable
                            className="search-min__select"
                            isDisabled={priceMaxArray.length <= 0 ? true : false}
                            options={priceMaxArray}
                            onChange={(x) => { (x != null && Number.isInteger(x)) ? setMaxPrice(x.value) : setMaxPrice(''); if (minPrice > maxPrice) setMinPrice('') }}
                            isClearable={true}
                            placeholder="do"
                            styles={SelectCustomStyle}
                        />
                    </div>
                </div>
                <div className="search-min__box">
                    <div className="search-min__txt"> Przebieg</div>
                    <div className="search-min__row">
                        <Creatable
                            className="search-min__select"
                            isDisabled={milageArray.length <= 0 ? true : false}
                            options={milageArray}
                            onChange={(x) => { x != null ? setMinMilage(x.value) : setMinMilage(''); if (minPrice > maxPrice) setMinMilage('') }}
                            isClearable={true}
                            placeholder="do"
                            styles={SelectCustomStyle}
                        />
                        <Creatable
                            className="search-min__select"
                            isDisabled={milageArray.length <= 0 ? true : false}
                            options={milageArray}
                            onChange={(x) => { x != null ? setMaxMilage(x.value) : setMaxMilage(''); if (minPrice > maxPrice) setMinMilage('') }}
                            isClearable={true}
                            placeholder="do"
                            styles={SelectCustomStyle}
                        />
                    </div>
                </div>
                <div className="search-min__box search-min__box--fuel">
                    <div className="search-min__txt search-min__txt--bold"> Rodzaj Paliwa</div>
                    <div className="search-min__row search-min__row--fuel">
                        <fieldset className="search-min__fieldset " value={fuel} onChange={x => setFuel(x.target.value)}>
                            {fuelList.length > 0 && fuelList.map(x => (
                                <label id={x.value} className={`search-min__button ${fuel == x.value ? "search-min__button--active" : ""} `}>

                                    <input style={{ display: "none" }} type="radio" key={x.value} value={x.value} name="fuelType" />     {x.label}
                                </label>

                            ))
                            }
                            <label id="all" className={`search-min__button ${fuel == null || fuel == '' ? "search-min__button--active" : ""} `}>
                                <input style={{ display: "none" }} type="radio" key="all" value={''} name="fuelType" />      Wszystkie
                            </label>
                        </fieldset>
                    </div>
                </div>
                <div className="search-min__button--box">
                    <div className="search-min__button search-min__button--search" onClick={x => onSubmit()}>
                        Szukaj
                </div>
                </div>
            </div>
        </div>
    )

}

export default AdvertMain;