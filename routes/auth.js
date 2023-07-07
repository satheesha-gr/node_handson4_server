const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

const registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    if (users.find((user) => user.email === email)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    };

    users.push(user);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const token = jwt.sign({ email: user.email }, 'your-secret-key');

    res.json({message: 'User Logged in Successfully'})
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  registerUser,
  loginUser
};