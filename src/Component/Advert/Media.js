
import config from '../../config.json'
import React, { useState, useEffect, state, useReducer } from "react";
import { Link } from 'react-router-dom';
const Media = ({advert}) =>{
    return(
        
        <Link className="advertList__box" to={"/offer/"+advert.title}>
            <div className="advertList__content">
                {/*advert.fileViewModel.path != null && <img className="advertList__image" src={config.apiRoot + "/" + advert.fileViewModel.path} />*/}
                {advert.fileViewModel.path == null && <img className="advertList__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png" />}
                {advert.fileViewModel.path != null && <div className="advertList__image" style={{ 
                    backgroundImage: "url("+(config.apiRoot + "/" + advert.fileViewModel.path.replace("\\","/"))+")"
                    }}/>}
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
                <div className="advertList__title advertList__title--price">
                    {advert.price} PLN
                </div>
            </div>
        </Link>

    )
}

export default Media;