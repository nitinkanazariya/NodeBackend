
const CHAT = require('../modal/realTimeChat');
const USER = require('../modal/user');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();


const CreateNewMessage = async (req, res) => {
  const { senderId, message, receiverId } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Please provide a message.' });
  }

  if (!receiverId || !senderId) {
    return res.status(400).json({ message: 'Please provide receiver id and sender id.' });
  }
  else {
    const newMessage = new CHAT({
      senderId,
      message,
      receiverId
    });
    await newMessage.save();
    res.status(200).json({ message: 'message send successfully!', status_Code: 200 });
  }

}

const getMessages = async (req, res) => {
  const messages = await CHAT.find()
  res.status(200).json({ messages, status_code: 200 });


}



const getUserMessage = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided or token is malformed.' });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const loginUserId = decode.user.id
  if (!loginUserId) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
  const messages = await CHAT.find({
    $or: [
      { senderId: loginUserId, receiverId: userId },
      { senderId: userId, receiverId: loginUserId },
    ]
  })
  // console.log(messages);
  res.status(200).json({ messages, status_code: 200 });

}


module.exports = { CreateNewMessage, getMessages, getUserMessage }