const express=require('express')
const { CreateNewUser } = require('../controllers/auth')
const AuthRouter=express.Router()

AuthRouter.post('/register',CreateNewUser)

module.exports=AuthRouter