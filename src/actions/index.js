
export const paramsSearchFetched = (paramsSearch) => ({
    type: 'FETCH_PARAMSSEARCH_SUCCESS',
    paramsSearch 
});

export const carProducerFetched = (carProducer) => ({
    type: 'FETCH_CARPRODUCER_SUCCESS',
    carProducer
});

export const fuelTypeFetched = (fuelType) => ({
    type: 'FETCH_FUELTYPE_SUCCESS',
    fuelType
});

export const carOfferListFetched = (carOfferList) => ({
    type: 'FETCH_CAROFFERLIST_SUCCESS',
    carOfferList
});

export const isLoginFetched = (isLogin) => ({
    type: 'FETCH_ISLOGIN_SUCCESS',
    isLogin
});