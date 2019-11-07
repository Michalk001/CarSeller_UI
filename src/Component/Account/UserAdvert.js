import React, { useState, useEffect, state } from "react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination'
import config from '../../config.json'
import Media from './Media'

const UserAdvert = (props) => {

    const [advert, setAdvert] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [acceptRemove, setAcceptRemove] = useState(0);
    const [confirmBox, setConfirmBox] = useState(false);
    const [titleAdvertRemove, setTitleAdvertRemove] = useState(false);

    const [pageNumberParam, setPageNumberParam] = useState(() => {
        if (props.match.params.page)
            if (props.match.params.page >= 1)
                return props.match.params.page;
            else
                return 1;
        else
            return 1;

    });

    useEffect(() => {
        getOffer(pageNumberParam);
    }, [pageNumberParam]);

    const getOffer = async (pageNumber) => {

        await fetch(config.apiRoot + "/api/UserAdvert?page=" + pageNumber, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.succeeded)
                    if (res.offerList.length > 0) {
                        setAdvert(res.offerList);
                        setPagination(res.pagination);
                    }
            })


    }





    

    return (
        <>
            <div className="dashboard-banner">
                <div className="dashboard-banner__txt">
                    Twoje ogłoszenia
                </div>
                <div className="dashboard-banner__card-wrap">
                    <div className="dashboard-banner__card dashboard-banner__card--advert" to="/advertAdd">
                        <div className="dashboard-banner__button" >Ogłoszenia</div>
                    </div>
                    <div className="dashboard-banner__card dashboard-banner__card--settings">
                        <Link className="dashboard-banner__button dashboard-banner__button--active" to="/account/setting">
                            Ustawienia
                   </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="dashboard-advert">
                    {(advert == null || advert.length <= 0) && <div className="dashboard-advert__empty">
                        <div className="dashboard-advert__txt">Aktualnie nie masz żadnego aktywnego Ogłoszenia</div>
                        <div>
                            <Link className="dashboard-advert__button dashboard-advert__button--red dashboard-advert__button--advert-add " to="/advertAdd">Dodaj Ogłoszenie</Link>
                        </div>
                    </div>
                    }
                    {advert != null && advert.length > 0 && advert.map(x => (<div>aaa</div> &&
                        <Media key={x.title} advert={x} />
                    ))
                    }
                    {pagination != null && <Pagination totalRecords={pagination.totalItems} currentPage={pagination.currentyPage} changePageCallback={(x) => setPageNumberParam(x)} pageLimit={pagination.itemsOnPage} pageNeighbours={1} />}

                </div>
            </div>
        </>
    )
}


export default UserAdvert;