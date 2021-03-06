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
var totalMessage = [];
module.exports.index = function (io) {

    io.set('heartbeat interval', 60000);
    io.set('heartbeat timeout', 5000);

    var loginUser = [];

    io.on('connection', function (socket) {
        console.log('A user connect.');

        socket.on('chat login', function (data) {
            data.skId = socket.id;
            data.socket = socket;
            loginUser.push(data);

            socket.emit('chat initial', totalMessage);
            io.emit('chat message', {
                sort: 1,
                name: data.userName,
                msg: 'join in.',
                theme: 0,
                headImg: 0,
                date: new Date()
            });
            sendLog(io, 'There are ' + loginUser.length + ' users.');
        });

        socket.on('chat message', function (data) {
            console.log(JSON.stringify(data));
            totalMessage.push(data);
            io.emit('chat message', data);
        });
        socket.on('chat clear', function () {
            loginUser.length = 0;
        });
        socket.on('disconnect', function () {
            console.log('A user disconnect.');
            loginUser = loginUser.filter(function (item, index) {
                if (item.skId === socket.id) {
                    io.emit('chat message', {
                        sort: 1,
                        name: item.userName,
                        msg: 'leave out.',
                        theme: 0,
                        headImg: 0,
                        date: new Date()
                    });
                }
                return item.skId !== socket.id;
            });
            sendLog(io, 'There are ' + loginUser.length + ' users.');
        });
    });
};