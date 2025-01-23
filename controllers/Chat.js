
const CHAT = require('../modal/realTimeChat')

const CreateNewMessage = async (req, res) => {
  const { senderId, message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Please provide a message.' });
  }
  else {
    const newMessage = new CHAT({
      senderId,
      message
    });
    await newMessage.save();
    res.status(200).json({message:'message send successfully!',status_Code:200});
  }

}

const getMessages=async(req,res)=>{

  const messages=await CHAT.find()
  res.status(200).json({messages,status_code:200});


}
module.exports={CreateNewMessage,getMessages}