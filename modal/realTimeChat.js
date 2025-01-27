const mongoose = require('mongoose');

// Define the schema for the chat messages
const chatSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
    trim: true
  },

  receiverId: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now  // Automatically set the timestamp when a message is created
  },


},
  { versionKey: false });

// Create the model based on the schema
const Chat = mongoose.model('Chat', chatSchema, 'Chat');

module.exports = Chat;
