'use strict';

function sendLog(io, msg) {
    io.emit('chat message', {
        sort: 1,
        name: '',
        msg: msg,
        theme: 0,
        headImg: 0,
        date: new Date()
    });
}

module.exports.index = function (io) {

    io.set('heartbeat interval', 60000);
    io.set('heartbeat timeout', 5000);

    var chatUser = [],
        oldChatUser = [],
        userCount = 0;

    io.on('connection', function (socket) {
        console.log('A user connect.');
        userCount++;
        socket.on('chat message', function (data) {
            console.log(JSON.stringify(data));
            io.emit('chat message', data);
        });
        socket.on('chat check', function (data, type) {
            chatUser.push(data);
            if (!type) {
                oldChatUser.push(data);
            }
            if (chatUser.length === userCount) {
                oldChatUser.forEach(function (item, index) {
                    if (chatUser.indexOf(item) < 0) {
                        io.emit('chat message', {
                            sort: 1,
                            name: item,
                            msg: 'leave out.',
                            theme: 0,
                            headImg: 0,
                            date: new Date()
                        });
                    }
                });
                oldChatUser.length = 0;
                oldChatUser = chatUser.slice(0);
                sendLog(io, 'There are ' + userCount + ' people');
            }
        });
        socket.on('chat clear', function () {
            chatUser.length = 0;
            oldChatUser.length = 0;
        });
        socket.on('disconnect', function () {
            console.log('A user disconnect.');
            userCount--;
            chatUser.length = 0;
            io.emit('chat check');
        });
    });
};