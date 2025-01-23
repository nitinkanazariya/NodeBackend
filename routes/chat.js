const express = require('express')
const { CreateNewMessage, getMessages } = require('../controllers/Chat')
const ChatRouter = express.Router()

ChatRouter.post('/send_message', CreateNewMessage)
ChatRouter.get('/messages', getMessages)




module.exports = ChatRouter;