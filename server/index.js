const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors =  require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

//creating of app object
const app = express();
//creating of http server
const server = http.createServer(app);
//socket.io API
const io = socketio(server);

app.use(cors());

//launching server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        //adding user to users array
        const { error, user } = addUser({ id:socket.id, name, room });

        //error alert if username is taken
        if (error) return callback(error);

        //sending welcome message only to the sender
        socket.emit('message', {user:'admin', text: `${user.name}, welcome to the room ${user.room}`});
        //sending message about new user in the room to everybody exept sender
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined!`})

        //joining room
        socket.join(user.room);

        //updating users in the room
        io.to(user.room).emit('roomData', {room:user.room, users: getUsersInRoom(user.room)})
    });

    socket.on('sendMessage', (message, callback) => {
        //getting user object from users array
        const user = getUser(socket.id);
        //getting time of message sending
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let time;
        if (minutes < 10) {
            time = `${hours}:0${minutes}`;
        } else {
            time = `${hours}:${minutes}`;
        }

        //sending message to everyone in the room including sender
        io.to(user.room).emit('message', {user: user.name, text:message, time: time});

        //deleting message from state variable
        callback();
    });
    
    socket.on('disconnect', () => {
        //removing of user from users array
        const user = removeUser(socket.id);

        if(user) {
            //sending message about user's leaving 
            io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left`});
            //updating users in the room
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }

        
    });
});



