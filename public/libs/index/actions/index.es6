import { CHATMESSAGE, USERNAME, SOCKET } from '../constant/index.es6';

export function createChatMessage(data){
    return {
        type: CHATMESSAGE,
        data: data
    }
}

export function createUserName(data){
    return {
        type: USERNAME,
        data: data
    }
}

export function sendMsg(data){
    SOCKET.emit('chat message', {
        sort: data.sort,
        name: data.name,
        msg: data.msg,
        date: new Date()
    });
}