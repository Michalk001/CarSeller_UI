import { Component } from 'react';
import React, { useState, useEffect, state } from "react";
import {
    Link

} from 'react-router-dom';
import AdvertListContainer from "../Views/AdvertList"
import { connect } from "react-redux";
import { carOfferListFetched, paramsSearchFetched } from "../actions";
import { withRouter } from "react-router-dom";
import config from '../config.json';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carProducerValue: '',
            carModelValue: '',
            fuelTypeValue: '',
            carProducerList: '',
            carModelList: '',
            fuelTypeList: '',
            yearProduction: [],
            yearProductionMax: [],
            yearMinProductionValue: "",
            yearMaxProductionValue: ""
        }
        const date = new Date();
        let yearProductionTmp = [];
        for (let x = date.getFullYear(); x >= 1900; --x) {
            yearProductionTmp.push(x);
        }
        this.state.yearProduction = yearProductionTmp;
        this.state.yearProductionMax = yearProductionTmp;
        this.getCarProducerList();
        this.getFuelTypeList();

    }

    getCarProducerList = async () => {
        const res = await fetch(config.apiRoot + "/api/CarProducent");
        const carProducer = await res.json();
       
        this.setState({
            carProducerList: carProducer.carProducerList
        })
        this.onChangeCarModel('');


    }

    getCarModelList = async (id) => {
        const res = await fetch(config.apiRoot + "/api/CarProducent/" + id);
        const carModel = await res.json();
        if (carModel == undefined)
            this.setState({
                carModelList: []
            })
        else
            this.setState({
                carModelList: carModel.modelList
            })
        this.onChangeCarModel('')
    }

    getFuelTypeList = async () => {
        const res = await fetch(config.apiRoot + "/api/FuelType/");
        const fuelType = await res.json();
        this.setState({
            fuelTypeList: fuelType.fuelList
        })

    }
    onChangeProducer = (carProducerValue) => {
        console.log(carProducerValue)

        this.setState({
            carProducerValue: carProducerValue
        })
    }
    onChangeCarModel = (carModelValue) => {
        this.setState({
            carModelValue: carModelValue
        })
    }
    onChangeFuelType = (fuelTypeValue) => {
        this.setState({
            fuelTypeValue: fuelTypeValue
        })
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.carOfferList == this.props.carOfferList) {

        }

        if (nextProps.carModelList != this.state.carModelList)
            return true;
        return false;
    }
    onSearch = async () => {
        this.props.paramsSearchFetched([`producer=${this.state.carProducerValue}&model=${this.state.carModelValue}&fuel=${this.state.fuelTypeValue}`])
        this.props.history.push(`/Advert/page=1&producer=${this.state.carProducerValue}&model=${this.state.carModelValue}&fuel=${this.state.fuelTypeValue}`);
        console.log(this.props.paramsSearch);
    }


    onChangeYearMinProduction = (value) => {
        this.setState({
            yearMinProductionValue: value
        })
        const date = new Date();
        let yearProductionTmp = [];
        for (let x = date.getFullYear(); x >= value; --x) {
            yearProductionTmp.push(x);
        }
        this.setState({
            yearProductionMax: yearProductionTmp
        })
    }

    onChangeYearMaxProduction = (value) => {
        this.setState({
            yearMaxProductionValue: value
        })
    }
    

    render() {

        return (

            <>
                <div className="advert-search">
                    <span className="select-group__1 ">
                        <div className="select-group-title"> Producent i Model:</div>
                        <select className="select-group select-group-1" value={this.state.carProducerValue} name="carProducer" onChange={x => { this.onChangeProducer(x.target.value); this.getCarModelList(x.target.value) }}>
                            <option value="" disabled >Producent</option>
                            {this.state.carProducerList && this.state.carProducerList.length > 0 && this.state.carProducerList.map(x => (
                                <option key={x.idString} value={x.idString}>{x.producentName}</option>
                            ))}
                        </select>
                        <select className="select-group select-group-2" value={this.state.carModelValue} onChange={x => this.onChangeCarModel(x.target.value)} name="carModel"  >
                            <option value="" disabled >Model</option>
                            {this.state.carModelList && this.state.carModelList.length > 0 && this.state.carModelList.map(x => (
                                <option key={x.idString} value={x.idString}>{x.modelName} </option>
                            ))}
                        </select>
                    </span>
                    <span className="select-group__2 ">
                        <div className="select-group-title select-group-title-2"> Cena</div>
                        <input type="number" placeholder="od" className="select-group select-group-price select-group-price-1" id="minPrice" />

                        <input type="number" placeholder="do" className="select-group select-group-price select-group-price-2" id="maxPrice" />
                    </span>

                    <span className="select-group__3 ">
                        <div className="select-group-title select-group-title-3"> Rok produkcji</div>
                        <select value={this.state.yearMinProductionValue} onChange={x => this.onChangeYearMinProduction(x.target.value)} className="select-group select-group-3" name="yearMinProduction">
                            <option value="" disabled >Od</option>
                            <option value=""  >Dowolne</option>
                            {
                                this.state.yearProduction && this.state.yearProduction.map(x => (

                                    <option key={x} value={x}>{x}</option>
                                ))
                            }
                        </select>
                        <select value={this.state.yearMaxProductionValue} onChange={x => this.onChangeYearMaxProduction(x.target.value)} className="select-group select-group-4" name="yearMaxProduction">
                            <option value="" disabled >Do</option>
                            <option value=""  >Dowolne</option>
                            {
                                this.state.yearProductionMax && this.state.yearProductionMax.map(x => (

                                    <option key={x} value={x}>{x}</option>
                                ))
                            }
                        </select>
                    </span>

                    <span className="select-group__4 ">
                        <div className="select-group-title select-group-title-4"> Przebieg</div>
                        <input type="number" placeholder="od" className="select-group select-group-mileage select-group-mileage-1" id="minMileage" />

                        <input type="number" placeholder="do" className="select-group select-group-mileage select-group-mileage-2" id="maxMileage" />
                    </span>


                    <div className="fuel">

                        <div className="fuel-title">
                            Rodzaj paliwa:
                    </div>
                        <fieldset value={this.state.fuelTypeValue} onChange={x => this.onChangeFuelType(x.target.value)}>
                            {
                                this.state.fuelTypeList && this.state.fuelTypeList.length > 0 && this.state.fuelTypeList.map(x => (
                                    <label key={x.idString} id={x.idString} className={this.state.fuelTypeValue != undefined && this.state.fuelTypeValue == x.idString && 'active'} >
                                        <input type="radio" key={x.idString} value={x.idString} name="fuelType" /> {x.fuelName} </label>
                                ))

                            }
                            <label key="all" id='all' className={this.state.fuelTypeValue != undefined && this.state.fuelTypeValue == '' && 'active'} >
                                <input type="radio" key="all" value='' name="fuelType" /> Wszystkie
                        </label>
                        </fieldset>
                    </div>
                    <div className="submitButton" onClick={this.onSearch} > Wyszukaj </div>

                </div>


            </>

        )
    }

}

export default Main;

const mapStateToProps = (state) => {
    return {
        carOfferList: state.carOfferList,
        paramsSearch: state.paramsSearch
    }
};
const mapDispatchToProps = { carOfferListFetched, paramsSearchFetched };

export const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main); 