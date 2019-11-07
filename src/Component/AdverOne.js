import { Component } from 'react';
import React, { useState, useEffect, state } from "react";
import {
    Link

} from 'react-router-dom';
import config from '../config.json';
import Footer from "../Footer"
import Header from "../Header";
import ImageGallery from 'react-image-gallery';
const AdvertOne = (props) => {

    const [offer, setOffer] = useState(null);
    const [images, setImages] = useState(null);
    const getOffer = async () => {
        const id = props.match.params.id;
        const res = await fetch(config.apiRoot + "/api/CarOffer/" + id);
        const offer = await res.json();

        if (offer.fileViewModels != null) {
            let images = []
            offer.fileViewModels.forEach(element => {
        
                images.push({ thumbnail: config.apiRoot + "/" + element.path, original: config.apiRoot + "/" + element.path })
            });
            setImages(images);
        }

        setOffer(offer);
    }

    useEffect(() => {
        getOffer();

    }, [props])
    return (

        <>
            {offer && <div className="header-offer">
                <div className="header-offer-title">

                    <span className="header-offer-title-left">
                        <span className="header-offer-title-1">{offer.carProducent} {offer.carModel} </span>
                        <span className="header-offer-title-year header-offer-title-2">{offer.year} </span>
                        <span className="header-offer-title-2">{offer.mileage} {offer.mileage && <>km</>} </span>
                        <span className="header-offer-title-2">{offer.fuel}</span>

                    </span>
                    <span className="header-offer-title-price">{offer.price} </span>
                </div>
                <div className="header-offer-phone_number">
                    <span>598 726 987</span>
                </div>

            </div>}
            {offer &&
                <div className="offer">

                    <div className="offer-first">
                        <div className="offer-box_seller">
                            <div className="offer-box_seller-type">osoba prywatna</div>
                            <div className="offer-box_seller-name">Imie</div>
                            <span className="offer-box_seller-phone">598 726 987</span>
                        </div>
                        <div className="offer-gallery">
                            {images && <ImageGallery items={images} />}
                            {!images && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png" />}
                        </div>
                    </div>
                    <div className="offer-detalis">
                        <div className="offer-detalis-title">Szczegóły</div>
                        <div className="offer-detalis-columns">
                            <div className="offer-detalis-columns-first">
                                <div className="offer-detalis-columns-first-1">
                                    <div> Oferta od </div>
                                    <div> Marka pojazdu </div>
                                    <div> Model pojazdu </div>
                                    <div> Rok produkcji </div>
                                    <div> Przebieg </div>
                                    <div> Rodzaj paliwa </div>

                                </div>
                                <div className="offer-detalis-columns-first-2">
                                    <div>{offer.typeSeller}</div>
                                    <div>{offer.carProducent}</div>
                                    <div>{offer.carModel} </div>
                                    <div>{offer.year} </div>
                                    <div>{offer.mileage} km </div>
                                    <div>{offer.fuel}</div>
                                </div>
                            </div>
                            <div className="offer-detalis-columns-second">
                                <div className="offer-detalis-columns-second-1">
                                    <div> Liczba drzwi </div>
                                    <div> Liczba miejsc</div>
                                    <div> Kolor </div>
                                    <div> Moc </div>
                                    <div> Kraj pochodzenia </div>
                                    <div> Stan </div>

                                </div>
                                <div className="offer-detalis-columns-second-2">
                                    <div>{offer.door}</div>
                                    <div>{offer.seat}</div>
                                    <div>{offer.color} </div>
                                    <div>{offer.hoursePower} km</div>
                                    <div>{offer.country} </div>
                                    <div>{offer.condition}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offer-equipment">
                        <div className="offer-equipment-title">Wyposażenie </div>
                        <div className="offer-equipment-list">
                            {offer && offer.equipment && offer.equipment.map(x => (
                                <div key={x} className="offer-equipment-list-text">
                                    {x}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className="offer-description">
                        <div className="offer-description-title">Opis </div>
                        <div className="offer-description-txt">
                            {offer && offer.description && <> {offer.description} </>}
                        </div>
                    </div>

                </div>

            }

        </>
    )

}

export default AdvertOne;