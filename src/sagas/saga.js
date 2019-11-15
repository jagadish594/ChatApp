import {put, takeLatest, call, select, takeEvery, delay} from 'redux-saga/effects'
import Axios from 'axios'
import {getState} from './selectors'

const URL = `http://localhost:8080/api/rooms`

function fetchRoomData() {
    return Axios.get(`${URL}`)
}

function* requestFetchRooms(action) {
    try {
        const data = yield call(fetchRoomData);
        yield put({
            type: 'FETCH_ALL_ROOMS',
            data: data.data,
            userName: action.userName
        });
    } catch (error) {
        yield put(console.log(error));
    }
}


function fetchRoomUsers(roomId) {
    return Axios.get(`${URL}/${roomId}/`)
}

function fetchRoomMessages(roomId){
    return Axios.get(`${URL}/${roomId}/messages`)
}

function* fetchRoomInfo(action) {
    try {
        const usersData = yield call(fetchRoomUsers, action.roomId);
        const messagesData = yield call(fetchRoomMessages, action.roomId);
        yield put({
            type: 'CHAT_ROOM_INFO',
            users: usersData.data.users,
            roomName: usersData.data.name,
            messages: messagesData.data,
            roomId: action.roomId
        });

    } catch (error) {
        yield put(console.log(error));
    }
}

function postMessageToApi(myState){
    let roomId = myState.roomId
    return Axios.post(`${URL}/${roomId}/messages`, {
        name: myState.userName,
        message: myState.replyInput
    })
    .then(response => response.data)
    .catch(err => {
        throw err
      });
}

function* postMessage(){
    let myState = yield select(getState)
    try{
        yield call(postMessageToApi, myState)
    } catch (error) {
        yield put(console.log(error));
    }
}


function *checkNewMessages(){
    let myState = yield select(getState)
    while(true){
        const messages = yield call(fetchRoomMessages, myState.roomId)
        if(myState.messageLength !== messages.data.length){
            try{
                yield put({
                    type: 'UPDATE_MESSAGES',
                    messages: messages.data,
                    messageLength: messages.data.length
                });
            } catch (error) {
                yield put(console.log(error));
            }
        }
        delay(1000)
    }

}

export function *watchOnJoinChat(){
    yield takeLatest("JOIN_CHAT", requestFetchRooms) 
    yield takeLatest("CHAT_ROOM_DETAILS", fetchRoomInfo)
    yield takeLatest("SEND_MSG", postMessage) 
    yield takeEvery("CHECK_MSG", checkNewMessages)
}
