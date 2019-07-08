const notebookInitialState = []

const notebookReducer = (state = notebookInitialState, action) => {
    switch (action.type) {
        case "init":
            return [...action.notebook]
        default:
            return state
    }
}

export default notebookReducer;