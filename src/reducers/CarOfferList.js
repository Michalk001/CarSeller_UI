export const carOfferList = (state = [], action) => { // (1)
    
    switch (action.type) { // (2)
      case 'FETCH_CAROFFERLIST_SUCCESS':
        return [
          ...action.carOfferList
        ]
      default:
        return state
    }
  }