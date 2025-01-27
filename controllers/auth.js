const USER = require("../modal/user")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();


const CreateNewUser = async (req, res) => {
  const { name, email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'required email or password', status_code: 400 })
  }
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email); // Returns tr ue if email matches the regex, otherwise false.
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format', status_code: 400 })
  }

  const AlredyExist = await USER.findOne({ email })
  if (AlredyExist) {
    return res.status(400).json({ message: 'User already exist', status_code: 400 })
  }
  else {
    const userId = await USER.find()
    const user = new USER({ id: userId.length + 1, email, name, password })
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '10y' });
    user.save()
    res.status(201).json({ message: 'user created successfully', status_code: 200, user: user, token: token })
  }
}

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password })
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '10y' });

  if (!email, !password) {
    return res.status(400).json({ message: 'required email or password', status_code: 400 })
  }
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password', status_code: 401 })
  }
  res.status(200).json({ message: "success", status_code: 200, data: user, token: token })
  console.log(token);

}

const getUserList = async (req, res) => {
  const token = req.headers['authorization'].replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }
  const decode = jwt?.verify(token, process?.env?.JWT_SECRET)
  const Id = decode?.user?.id
  if (!Id) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  const users = await USER.find({ id: { $ne: Id } })
  res.status(200).json({ users, status_code: 200, message: 'find user Successfully!' });

}
const getUser = async (req, res) => {
  const id = parseInt(req.params.id)
  const user = await USER.findOne({ id: id })

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid user id', status_code: 400 })
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found', status_code: 404 })
  }
  res.status(200).json({ user, status_code: 200 });


}
module.exports = { CreateNewUser, LoginUser, getUserList, getUser }