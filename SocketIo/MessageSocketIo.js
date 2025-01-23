// socket.js
const socketIo = require('socket.io');

const ConnectMessageSocket = (server) => {
  const io = socketIo(server);  // Create a socket connection on the provided server

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('message', (msg) => {
      console.log('Message received from client:', msg);
      // Broadcast the message to all other clients except the sender
      socket.broadcast.emit('receive_message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = ConnectMessageSocket;
