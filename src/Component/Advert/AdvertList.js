import React, { useState, useEffect, state, useReducer } from "react";
import { Link } from 'react-router-dom';
import config from '../../config.json'
import Cookies from 'js-cookie';
import Pagination from "../Pagination"
import Media from "./Media"

const AdvertList = (props) => {

    const [urlParam, setUrlParam] = useState(() => {
        if (props.match.params.id)
            return props.match.params.id
        else
            return " "
    })

    const [pageNumberParam, setPageNumberParam] = useState(() => {
        if (props.match.params.page)
            if (props.match.params.page >= 1)
                return props.match.params.page;
            else
                return 1;
        else
            return 1;

    });

    const [pagination, setPagination] = useState(null);
    const [advertList, setAdvertList] = useState([]);


    const getOffer = async (page) => {
        const query = `${config.apiRoot}/api/searchoffer?${urlParam}&page=${page}`;
        await fetch(query, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.succeeded == true) {
                    setPagination(res.pagination);
                    setAdvertList(res.offerList);
                   
                }

            })

    }
 
    useEffect(() => {
        getOffer(pageNumberParam);
    }, [pageNumberParam]);

    return (
        <>
        <div className="advertList">
               {advertList.length > 0 && advertList.map(x => (
                    <Media advert={x}/>
               ))}
           
         
        </div>
         {pagination!=null &&  <Pagination totalRecords={pagination.totalItems} currentPage={pagination.currentyPage} changePageCallback={(x) => setPageNumberParam(x)} pageLimit={pagination.itemsOnPage} pageNeighbours={1} />}
                </>
    )
}

export default AdvertList;