import { Component } from 'react';
import React, { useState, useEffect, state } from "react";
import {
    Link

} from 'react-router-dom';
import AdvertListContainer from "../Views/AdvertList"
import { connect } from "react-redux";
import { carOfferListFetched, paramsSearchFetched } from "../actions";
import Header from "../Header";
import { withRouter } from "react-router-dom";
import Footer from "../Footer"

import Pagination from "./Pagination"
import config from '../config.json';
class Adverts extends Component {
    constructor(props) {
        super(props);


        this.state = {
            pagination: [],
            params: ''
        }
        console.log(this.props)
        this.getOffer(1);
    }

    getOffer = async (page) => {




        let params = ''
        let tmpParams = this.props.match.params.id

        if (tmpParams != 'undefined') {
            while (tmpParams[0] != '&') {
                tmpParams = tmpParams.substring(1);
            }
            if (tmpParams[0] == '&')
                tmpParams = tmpParams.substring(1);
            params += tmpParams;
        }
        params = "page=" + page + "&" + params;
        this.props.history.push(params);

        const query = `${config.apiRoot}/api/searchoffer?${params}`
        console.log(query)
        const res = await fetch(query);
        const carOffer = await res.json();

        this.setState({
            pagination: carOffer.pagination,
        })


        this.props.carOfferListFetched(carOffer.offerList);

    }
    changePageCallback = (page) => {

        this.getOffer(page);

    }
    render() {


        return (

            <>

                {this.props.carOfferList != '' &&
                    < div className="offer-list">
                        <AdvertListContainer

                        />

                        {this.state.pagination != 0 && <Pagination totalRecords={this.state.pagination.totalItems} changePageCallback={this.changePageCallback} pageLimit={this.state.pagination.itemsOnPage} pageNeighbours={1} />}
                    </div>
                    /* onClick={x => this.getOffer("page=" + (this.state.pagination.currentPage + 1) + "&" + this.props.paramsSearch)*/

                }


            </>

        )
    }

}
export default Adverts;

const mapStateToProps = (state) => {
    return {
        carOfferList: state.carOfferList,
        paramsSearch: state.paramsSearch
    }
};
const mapDispatchToProps = { carOfferListFetched, paramsSearchFetched };

export const AdvertsContainer = connect(mapStateToProps, mapDispatchToProps)(Adverts); 