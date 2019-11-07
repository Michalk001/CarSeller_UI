import React, { useState, useEffect, state } from "react";

const RemoveBox = ({ txt, callback }) => {

    return (
        <>
            <div className="confirm__background" />
            <div className="confirm__box">
                <div className="confirm__content">
                    <div className="confirm__txt">{txt}</div>
                    <div className="confirm__button-box">
                        <div className="confirm__button confirm__button--red" onClick={x => callback(true)}>Usuń</div>
                        <div className="confirm__button" onClick={x => callback(false)}>Anuluj</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RemoveBox;