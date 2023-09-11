const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  signUpUser, 
  authenticationMiddleware, 
  sendSecretMessage 
} = require('../controllers/auth-controller');

router.post('/login', loginUser);

router.post('/signup', signUpUser);

router.get('/secret', authenticationMiddleware, sendSecretMessage);

module.exports = router;