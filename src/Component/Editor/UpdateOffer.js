import React, { useState, useEffect, state, isValidElement } from "react";
import Cookies from 'js-cookie';
import Editor from './Editor'
import config from '../../config.json'

const UpdateOffer = (props) => {


    const [advertDataValue, setAdvertDataValue] = useState(null);
    const [imagesGallery, setImagesGallery] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const getAdvert = async () => {

        await fetch(config.apiRoot + "/api/CarOfferEditor/" + props.match.params.id, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.succeeded == true) {
                    setAdvertDataValue(res.carOffer)
                    setEquipment(res.carOffer.equipment)
                    setImagesGallery(res.carOffer.fileViewModels)
    
                }

            })

    }

    useEffect(()=>{
        getAdvert();
    },[])

    const submit = async (obj) => {
        console.log(obj)
       await fetch(config.apiRoot + "/api/CarOfferEditor/1", {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)

            })
    }

    return (
        <>
        
        { advertDataValue != null && <Editor submit={submit} advertValue={ advertDataValue } />}
        </>

    )

}



export default UpdateOffer;