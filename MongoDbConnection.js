const DbUrl = 'mongodb+srv://nitinkanazariya61506:uHYYCgfrFRJyCPLO@nodebaba.zwvtw4c.mongodb.net/DemoApplication?retryWrites=true&w=majority'
const mongoose = require('mongoose')

const ConnectDb = () => {
  mongoose.connect(DbUrl)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    })
}
module.exports = ConnectDb;