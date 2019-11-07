
import config from '../../config.json'
import React, { useState, useEffect, state, useReducer } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import RemoveBox from '../Confirm/RemoveBox'


const Media = ({ advert }) => {
    const txtRemove = "Czy na pewno chcesz usunąć ogłoszenie?\nPo usunięciu przywrócenie ogłoszenia jest niemożliwe";
    const [confirmBox, setConfirmBox] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    
    useEffect(() =>{
        if(isDeleted)
        {
            removeAdvert(advert.title);
        }
    },[isDeleted])

    const removeAdvert = async (title) => {


        await fetch(config.apiRoot + "/api/CarOffer/" + title, {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setIsDeleted(true);
            })
    }
    return (
        <>
            {confirmBox && < RemoveBox txt={txtRemove} callback={(x) => { setConfirmBox(false); setIsDeleted(x) }} />}
            <div className="advertList__box advertList__box--user-advert" >
                <div className="advertList__content">
                    {isDeleted && <div className="dashboard-advert__deleted-advert"><div className="dashboard-advert__txt dashboard-advert__txt--deleted-advert">USUNIĘTO</div></div>}
                    {advert.fileViewModel.path == null && <img className="advertList__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png" />}
                    {advert.fileViewModel.path != null && <div className="advertList__image" style={{
                        backgroundImage: "url(" + (config.apiRoot + "/" + advert.fileViewModel.path.replace("\\", "/")) + ")"
                    }} />}
                    <div className="advertList__content--txt">
                        <div className="advertList__title advertList__title--model">
                            {advert.producentName} {advert.modelName}
                        </div>
                        <div className="advertList__title advertList__title--short">
                            {advert.shortDescription}
                        </div>
                        <div className="advertList__content--information">
                            <div className="advertList__title advertList__title--information advertList__title--year">{advert.year} </div>
                            <div className="advertList__title advertList__title--information advertList__title--milage">{advert.mileage && <>km</>}</div>
                            <div className="advertList__title advertList__title--information advertList__title--fuel">{advert.fuel}</div>
                        </div>


                    </div>
                    <div className="dashboard-advert__media-button-position">
                        <Link className="dashboard-advert__button dashboard-advert__button--show" to={"/offer/" + advert.title}><div>Pokaż</div></Link>
                        <Link className="dashboard-advert__button dashboard-advert__button--edit" to={"/account/offer/edit/" + advert.title} ><div>Edytuj</div></Link>
                        <div className="dashboard-advert__button dashboard-advert__button--red dashboard-advert__button--remove" onClick={x => setConfirmBox(true)} >Usuń</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Media;