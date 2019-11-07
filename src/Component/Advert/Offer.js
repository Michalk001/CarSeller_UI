import React, { useState, useEffect, state, useReducer } from "react";
import { Link } from 'react-router-dom';
import config from '../../config.json'
import Cookies from 'js-cookie';
import ImageGallery from 'react-image-gallery';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Offer = (props) => {
  

    const [offer, setOffer] = useState(null);
    const [images, setImages] = useState(null);

    const getOffer = async () => {

        const id = props.match.params.id;
        await fetch(config.apiRoot + "/api/CarOffer/" + id, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.succeeded == true) {
                    if (res.carOffer.fileViewModels != null) {
                        let tmp = [];
                        res.carOffer.fileViewModels.map(x => {
                            if (x.type == "image")
                                tmp.push({ thumbnail: config.apiRoot + "/" + x.path, original: config.apiRoot + "/" + x.path });
                        })
                        setImages(tmp)

                    }
                    setOffer(res.carOffer)


                }

            })
        return null;
    }

    useEffect(() => {
        getOffer()

    }, [props])
    useEffect(() => {

    })

    return (

        <div className="advertOffer--white">
            <div className="container advertOffer">
                {offer != null &&
                    <>
                        <div className="advertOffer__top">
                            <div className="advertOffer__summary"> {console.log(offer)}
                                <div className="advertOffer__txt advertOffer__txt--model">{offer.carProducent} {offer.carModel}</div>
                                <div className="advertOffer__txt advertOffer__txt--summaryInfo">
                                    <div>{offer.year}</div>
                                    <div>{offer.mileage} km</div>
                                    <div>{offer.fuel}</div>
                                </div>
                                <div className="advertOffer__txt advertOffer__txt--price">{offer.price}</div>
                                <div className="advertOffer__txt advertOffer__txt--personType">{ offer.businessProfile == "false" ? <> Osoba prywatna</> : <> Firma</>}</div>
                               { offer.userName != null && <div className="advertOffer__txt advertOffer__txt--personName">{ offer.userName}</div> }
                                <div className="advertOffer__txt advertOffer__txt--phone"><i className="fas fa-phone-alt advertOffer__txt--fa" />{offer.phoneNumber}</div>
                            </div>
                            <div className="advertOffer__gallery">
                                {images && <ImageGallery items={images} />}
                            </div>

                        </div>
                        <div className="advertOffer__details">
                            <div className="advertOffer__txt advertOffer__txt--title">Szczegóły</div>
                            <div className="advertOffer__details advertOffer__details--content ">
                                <div className="advertOffer__txt advertOffer__txt--details-content">
                                    <span className="advertOffer__txt--details-content--label">Marka pojazdu</span>
                                    <span className="advertOffer__txt--details--content--value">{offer.carProducent}</span>
                                </div>
                                <div className="advertOffer__txt advertOffer__txt--details-content">
                                    <span className="advertOffer__txt--details-content--label">Model pojazdu</span>
                                    <span className="advertOffer__txt--details--content--value">{offer.carModel}</span>
                                </div>
                                <div className="advertOffer__txt advertOffer__txt--details-content">
                                    <span className="advertOffer__txt--details-content--label">Rok Produkcji</span>
                                    <span className="advertOffer__txt--details--content--value">{offer.year}</span>
                                </div>

                                {offer.fuel != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Paliwo</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.fuel}</span>
                                    </div>
                                }
                                {offer.mileage != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Przebieg</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.mileage}</span>
                                    </div>
                                }
                                {offer.seat != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Liczba siedzeń</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.seat}</span>
                                    </div>
                                }
                                {offer.door != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Liczba drzwi</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.door}</span>
                                    </div>
                                }
                                {offer.country != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Kraj pochodzenia</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.country}</span>
                                    </div>
                                }
                                {offer.hoursePower != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Moc silnika</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.hoursePower}</span>
                                    </div>
                                }
                                {offer.color != "" &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Kolor</span>
                                        <span className="advertOffer__txt--details--content--value">{offer.color}</span>
                                    </div>
                                }
                                {offer.businessProfile != null &&
                                    <div className="advertOffer__txt advertOffer__txt--details-content">
                                        <span className="advertOffer__txt--details-content--label">Sprzedający</span>
                                        <span className="advertOffer__txt--details--content--value">{ offer.businessProfile == "false" ? <> Osoba prywatna</> : <> Firma</>}</span>
                                    </div>
                                }
                             
                            </div>
                        </div>
                        <div className="advertOffer__details">
                            <div className="advertOffer__txt advertOffer__txt--title">Wyposażenie</div>
                            <div className="advertOffer__details advertOffer__details--content ">
                                {offer.equipment.map(x =>

                                    <div className="advertOffer__txt advertOffer__txt--details-content advertOffer__txt--equipment"><i className="far fa-check-circle"></i>{x}</div>
                                )}

                            </div>
                        </div>
                        <div className="advertOffer__details">
                            <div className="advertOffer__txt advertOffer__txt--title">Opis</div>
                            <div className="advertOffer__details advertOffer__details--content advertOffer__details--description  advertOffer__details--last">
                                {offer.description}
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Offer;