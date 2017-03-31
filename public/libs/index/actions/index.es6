$(function() {
    var socket = io('http://localhost:3000');
    $('form').submit(function(e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
});