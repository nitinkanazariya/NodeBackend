const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const authRouter = require('./routes/login');
const stripeRoute = require('./routes/stripe');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/', stripeRoute)


// Socket Io 
app.get('/', (req, res) => {
  res.send('Socket.io Server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  // socket.emit('receive_message', 'Hello from server'); 
  socket.on('message', (msg) => {
    console.log('Message received from client:', msg);
    socket.broadcast.emit('receive_message', msg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
