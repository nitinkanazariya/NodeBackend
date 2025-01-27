// socket.js
const socketIo = require('socket.io');

const ConnectMessageSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (msg) => {

      socket.broadcast.emit('receive_message', msg);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = ConnectMessageSocket;




// const socketIo = require('socket.io');

// const ConnectMessageSocket = (server) => {
//   const io = socketIo(server);
//   let users = {}; // Store users with their socket ids

//   io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Register the user with their socket id
//     socket.on('register', (userId) => {
//       users[userId] = socket.id; // Associate the userId with the socketId
//       console.log('User registered with ID:', userId);
//     });

//     // Handle receiving a message and send it to the specific user
//     socket.on('message', (data) => {
//       const { receiverId, message } = data;

//       // Find the socket ID of the receiver
//       const receiverSocketId = users[receiverId];

//       if (receiverSocketId) {
//         // Emit the message only to the intended recipient
//         io.to(receiverSocketId).emit('receive_message', message);
//         console.log(`Message sent to user ${receiverId}`);
//       } else {
//         console.log('Receiver is not connected');
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);

//       // Clean up the user-to-socket mapping when the user disconnects
//       for (const userId in users) {
//         if (users[userId] === socket.id) {
//           delete users[userId];
//           break;
//         }
//       }
//     });
//   });
// };

// module.exports = ConnectMessageSocket;
