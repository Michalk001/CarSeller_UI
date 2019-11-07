import React, { useState, useEffect, state, isValidElement } from "react";
import Cookies from 'js-cookie';
import Editor from './Editor'
import config from '../../config.json'

const AddOffer = () => {

    const submit = async (obj) => {

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
        <> 
            <Editor submit={submit} advertValue={null} />
        </>

    )

}



export default AddOffer;