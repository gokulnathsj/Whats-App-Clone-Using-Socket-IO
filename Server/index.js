const io = require("socket.io")(8000)
const users = {}
io.on('connection', socket => {
    socket.on('user-joined', name => {
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('new-user-joined', name);
    })
    socket.on('sent', message => {
        console.log(users)
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('end', users[socket.id]);
        delete users[socket.id];
    })
})