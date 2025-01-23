const USER = require("../modal/user")

const CreateNewUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'required email or password', status_code: 400 })
  }
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email); // Returns true if email matches the regex, otherwise false.
  }

  if(!validateEmail(email)){
    return res.status(400).json({ message: 'Invalid email format', status_code: 400 })
  }

  const AlredyExist = await USER.findOne({ email })
  if (AlredyExist) {
    return res.status(400).json({ message: 'User already exist', status_code: 400 })
  }
  else {
    const userId = await USER.find()
    const user = new USER({ id: userId.length + 1, email, name, password })
    user.save()
    res.status(201).json({ message: 'user created successfully', id: userId.length + 1,status_code: 200 })
  }
}

module.exports = { CreateNewUser }