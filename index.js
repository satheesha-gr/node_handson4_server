const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

app.use(express.json());

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv')
dotenv.config()

app.post('/register', authRoutes.registerUser);
app.post('/login', authRoutes.loginUser);

const port = process.env.PORT || 4040

app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})