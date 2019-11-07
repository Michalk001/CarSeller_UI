export const carProducer= (state = [], action) => { // (1)
    switch (action.type) { // (2)
      case 'FETCH_CARPRODUCER_SUCCESS':
        return [
          ...action.carProducer
        ]
      default:
        return state
    }
  }