const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const router = require('./router');

const PORT = process.env.PORT || 8000;

const app = express();

const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      callback(error);
    }
    console.log(user);
    socket.join(room);

    socket.emit('message', {
      user: 'admin',
      text: `${name},welcome to the room ${room}`,
    });
    socket.broadcast.to(room).emit('message', {
      user: 'admin',
      text: `${name} has joined the room`,
    });

    // io.in(room).emit('roomData', { room, users: getUsersInRoom(room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.in(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.in(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left the room`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});
app.use(router);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
