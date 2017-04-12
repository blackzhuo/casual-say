import { CHATMESSAGE, USERNAME, THEME, HEADIMG, SOCKET } from '../constant/index.es6';

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

export function createTheme(data){
    return {
        type: THEME,
        data: data
    }
}

export function createHeadImg(data){
    return {
        type: HEADIMG,
        data: data
    }
}

export function sendMsg(SOCKET, data){
    SOCKET.emit('chat message', {
        sort: data.sort,
        name: data.name,
        msg: data.msg,
        theme: data.theme,
        headImg: data.headImg,
        date: new Date()
    });
}