export const paramsSearch = (state = "", action) => { // (1)
    switch (action.type) { // (2)
      case 'FETCH_PARAMSSEARCH_SUCCESS':
        return [
          ...action.paramsSearch
        ]
      default:
        return state
    }
  }