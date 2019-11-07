export const isLogin = (state = [], action) => { // (1)
    
    switch (action.type) { // (2)
      case 'FETCH_ISLOGIN_SUCCESS':
        return [
          ...action.isLogin
        ]
      default:
        return state
    }
  }