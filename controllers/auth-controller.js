const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const loginUser = (req, res, next) => {
    const { email, password } = req.body;
   
    User.userLogin(email, async (user) => {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      const token = jwt.sign({ id: user.id }, "mySecret");
   
      if (email === user.email && isPasswordValid) {
        res.status(200).cookie("token", token).send("Welcome user!");
      } else {
        res.status(401).send("Wrong email or password");
      }
    });
   };
   

const signUpUser = async (req, res) => {
  const { password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  User.signUpUser(email, hashedPassword);
  res.sendStatus(201);
};
   

const authenticationMiddleware = (req, res, next) => {
    if (!req.cookies.token) {
        res.status(403).send('Unauthorized');
    } else {
        jwt.verify(req.cookies.token, 'mySecret', (err, decoded) => {
        req.userId = decoded.id;
        next();
        });
    }
};

const sendSecretMessage = (req, res) => {
    res.send('Welcome to the secret route!')
  }

module.exports = { loginUser, signUpUser, authenticationMiddleware, sendSecretMessage };