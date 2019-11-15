const initialState = {
    data: [],
    userName: "Type your username...",
    roomName: "",
    roomId: "",
    messages: "",
    replyInput: "Type a message...",
    messagesLength: 0
}

const reducer = (state=initialState, action) =>{
    const newState = {...state}
    if(action.type==="FETCH_ALL_ROOMS"){
        newState.data = action.data
    }

    if(action.type==="USER_NAME"){
        newState.userName = action.userName
    }

    if(action.type === "CHAT_ROOM_INFO"){
        newState.roomName = action.roomName
        newState.users = action.users
        newState.messages = action.messages
        newState.roomId = action.roomId
    }

    if(action.type === "REPLY_INPUT"){
        newState.replyInput = action.replyInput
    }

    if(action.type === "UPDATE_MESSAGES"){
        newState.messages = action.messages
        newState.messagesLength = action.messagesLength
    }
    return newState
}

export default reducer