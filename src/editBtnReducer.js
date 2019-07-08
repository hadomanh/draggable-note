const editBtnInitialState = false
const editBtnReducer = (state = editBtnInitialState, action) => {
    switch (action.type) {
        case "editClicked":
            return !state
        case "closeEditForm":
            return false
        default:
            return state
    }
}

export default editBtnReducer;