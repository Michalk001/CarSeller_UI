function isLoginReducer(state, action) {
    switch (action.type) {
        case true:
            return true;
        case false:
            return false;
    }
}

export default isLoginReducer;