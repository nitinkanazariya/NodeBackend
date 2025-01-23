const express = require('express');
const http = require('http');

const stripeRoute = require('./routes/stripe');
const ConnectDb = require('./MongoDbConnection');
const ConnectMessageSocket=require('./SocketIo/MessageSocketIo');
const ChatRouter = require('./routes/chat');
const AuthRouter = require('./routes/auth');
const app = express();
const server = http.createServer(app);
ConnectDb()
app.use(express.json());

app.use('/api', stripeRoute)
app.use('/api',ChatRouter)
app.use('/api',AuthRouter)


// Socket Io 
app.get('/', (req, res) => {
  res.send('Socket.io Server is running');
});

ConnectMessageSocket(server);
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
