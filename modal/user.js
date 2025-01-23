const { default: mongoose } = require('mongoose')
const Mongoose = require('mongoose')


const UserModal = new Mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
})
const USER = mongoose.model('User', UserModal, "User")

module.exports = USER;