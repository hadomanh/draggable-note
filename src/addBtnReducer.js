const addBtnInitialState = false;
const addBtnReducer = (state = addBtnInitialState, action) => {
    switch (action.type) {
        case "addClicked":
            return !state
        case "closeAddForm":
            return false
        default:
            return state
    }
}

export default addBtnReducer;