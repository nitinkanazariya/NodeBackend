const express = require('express')
const { CreateNewMessage, getMessages, getUserMessage } = require('../controllers/Chat')
const ChatRouter = express.Router()

ChatRouter.post('/send_message', CreateNewMessage)
ChatRouter.get('/messages', getMessages)
ChatRouter.get('/messages/:id', getUserMessage)




module.exports = ChatRouter;