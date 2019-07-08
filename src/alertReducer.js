const alertInitialState = {
    status: true,
    title: "Khởi tạo thành công",
    content: "info"
}
const alertReducer = (state = alertInitialState, action) => {
    switch (action.type) {
        case "alertOn":
            return {title: action.title, content: action.content, status: true}
        case "alertOff":
            return {...state, status: false}
        default:
            return state
    }
}

export default alertReducer;