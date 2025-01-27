const express = require('express')
const { CreateNewUser, LoginUser, getUserList, getUser } = require('../controllers/auth')
const AuthRouter = express.Router()

AuthRouter.post('/register', CreateNewUser)
AuthRouter.post('/login', LoginUser)
AuthRouter.get('/user', getUserList)
AuthRouter.get('/user/:id', getUser)

module.exports = AuthRouter