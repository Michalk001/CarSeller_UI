import React, { Component } from 'react';
import {
    Link

} from 'react-router-dom';
import { connect } from "react-redux";
import { carProducerFetched, fuelTypeFetched, carOfferListFetched } from "../actions";
import { MainInformationContainer } from "../Views/AdvertEditorForm/MainInformation";
import { SecondInformationContainer } from "../Views/AdvertEditorForm/SecondInformation";
import { EquipmentContainer } from "../Views/AdvertEditorForm/Equipment";
import FileToBase64 from './FileToBase64';
import Cookies from 'js-cookie';
import config from '../config.json';
class AdvertEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carProducerValue: '',
            carModelValue: '',
            fuelTypeValue: '',
            shortDescriptionValue: '',
            descriptionValue: '',
            equipmentValue: [],
            phoneNumberValue: '',
            yearProductionValue: '',
            priceValue: '',
            vinNumberValue: '',
            mileageValue: '',
            images: [],
            sellerType: "",
            door: "",
            seat: "",
            color: ""
        }


    }
    componentWillMount() {


    }
    onClickSubmit() {

        this.sendAdvert();
    }
    async sendAdvert() {



        const ob = {
            ShortDescription: this.state.shortDescriptionValue,
            Description: this.state.descriptionValue,
            PhoneNumber: this.state.phoneNumberValue,
            Equipment: this.state.equipmentValue,
            CarProducent: this.state.carProducerValue,
            CarModel: this.state.carModelValue,
            Fuel: this.state.fuelTypeValue,
            Year: this.state.yearProductionValue,
            Price: this.state.priceValue,
            VinNumber: this.state.vinNumberValue,
            Mileage: this.state.mileageValue,
            FileViewModels: this.state.images,
            Color: this.state.color,
            Seat: this.state.seat,
            Door: this.state.color,
            TypeSeller: this.state.sellerType

        };

        await fetch(config.apiRoot + "/api/CarOffer", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {

                console.log(res);
            })

    }

    onChangeEquipment = (equipmentValue, e) => {
        if (e.target.checked == true) {

            this.state.equipmentValue = equipmentValue.filter(name => !name.includes(e.target.id));
            this.state.equipmentValue.push(e.target.id);
        }
        else
            this.state.equipmentValue = equipmentValue.filter(name => !name.includes(e.target.id));

    }

    //to przekazuje

    shouldComponentUpdate(nextProps, nextState) {

        return nextProps.carModelValue != this.state.carModelValue;
        return false;
    }
    onChangeCarModel = (carModelValue) => {
        this.setState({
            carModelValue
        })

    }
    onChangeProducer = (carProducerValue) => {
        this.setState({
            carProducerValue
        })

    }

    onChangeFuelType = (fuelTypeValue) => {
        this.setState({
            fuelTypeValue
        })
    }
    onChangeShortDescription = (shortDescriptionValue) => {
        this.setState({
            shortDescriptionValue
        })
    }
    onChangeDescription = (descriptionValue) => {
        this.setState({
            descriptionValue
        })
    }
    onChangePhoneNumber = (phoneNumberValue) => {
        this.setState({
            phoneNumberValue
        })
    }
    onChangePrice = (priceValue) => {
        this.setState({
            priceValue
        })
    }

    onChangeVinNumber = (vinNumberValue) => {
        this.setState({
            vinNumberValue
        })
    }
    onChangeMileage = (mileageValue) => {
        this.setState({
            mileageValue
        })
    }


    onChangeYearProduction = (yearProductionValue) => {
        this.setState({
            yearProductionValue
        })
    }
    onChangeSellerType = (sellerType) => {
        this.setState({
            sellerType
        })
    }
    onChangeSeat = (seat) => {
        this.setState({
            seat
        })
    }

    onChangeDoor = (door) => {
        this.setState({
            door
        })
    }

    onChangeCarColor = (color) => {
        this.setState({
            color
        })
    }

    getImage = (images) => {

        var tmpImages = this.state.images;
        tmpImages.push({
            Base64: images.base64,
            Name: images.name,
            Type: images.type
        })
        this.setState({ images: tmpImages })
    }

    removeImage = (index) => {
        let a = this.state.images;
        a.splice(index, 1)
        this.setState({ images: a });
        console.log(a)
    }
    render() {
        return (
            <>


                <div className="editor-main_title">Twój Samochód: </div>
                <MainInformationContainer

                    onChangeProducer={this.onChangeProducer}
                    onChangeCarModel={this.onChangeCarModel}
                    onChangeFuelType={this.onChangeFuelType}
                    onChangeShortDescription={this.onChangeShortDescription}
                    onChangeYearProduction={this.onChangeYearProduction}
                    onChangeVinNumber={this.onChangeVinNumber}
                    onChangeMileage={this.onChangeMileage}
                    onChangeSellerType={this.onChangeSellerType}
                    state={this.state}
                />
                <SecondInformationContainer

                    onChangePhoneNumber={this.onChangePhoneNumber}
                    onChangePrice={this.onChangePrice}
                    onChangeDescription={this.onChangeDescription}
                    state={this.state}
                />

                <EquipmentContainer
                    props={this.props}
                    state={this.state}
                    onChangeEquipment={this.onChangeEquipment}
                    onChangeCarColor={this.onChangeCarColor}
                    onChangeDoor={this.onChangeDoor}
                    onChangeSeat={this.onChangeSeat}
                />

                <div className="editor-photo editor-box editor-box-photo">
                    <div className="editor-photo-content">
                        <div className="editor-subtitle">Zdjęcia:</div>
                        {this.state.images == 0 && <div className="editor-photo-no_photos">Brak zdjęć. Dodaj je</div>}
                        {this.state.images != 0 && <div className="editor-photo-image_box">


                            {this.state.images && this.state.images.map((image, index) => (

                                <div className="editor-photo-item" key={"div" + index}><img key={'img' + index} src={`${image.Base64}`} />
                                    <input key={'inp' + index} type="button" value="usuń" onClick={() => this.removeImage(index)} />
                                </div>
                            ))


                            }
                        </div>
                        }
                        <FileToBase64
                            id="upload_photo"
                            className="editor-photo-upload_button"
                            multiple={false}
                            onDone={x => this.getImage(x)} />
                        <label className="editor-photo-upload_label" htmlFor="upload_photo" >Dodaj Zdjęcie</label>
                    </div>
                </div>

                <div className="editor-send">
                    <input type="button" value="wyślij" onClick={x => this.onClickSubmit()} />
                </div>
            </>
        )
    }

}
export default AdvertEditor;

const mapStateToProps = (state) => {
    return {
        carProducer: state.carProducer,
        carModel: state.carModel,
        fuelType: state.fuelType,
        CarOfferList: state.carOfferList
    }
};
const mapDispatchToProps = { carProducerFetched, fuelTypeFetched, carOfferListFetched };

export const AdvertEditorContainer = connect(mapStateToProps, mapDispatchToProps)(AdvertEditor); 