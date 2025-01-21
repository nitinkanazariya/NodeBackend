const express = require('express');
const { loginController, registerController, getProfileController } = require('../controllers/authCtrl');
const authRouter = express.Router();

authRouter.post('/login', loginController)
authRouter.post('/register', registerController)
authRouter.get('/get-profile', getProfileController)

module.exports = authRouter;