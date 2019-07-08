const noteInitialState = {};
const noteReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case "seeNote":
            return {...action.note}
        default:
            return state
    }
}

export default noteReducer;