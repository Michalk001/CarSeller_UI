export const fuelType = (state = [], action) => { // (1)
    switch (action.type) { // (2)
      case 'FETCH_FUELTYPE_SUCCESS':
        return [
          ...action.fuelType
        ]
      default:
        return state
    }
  }