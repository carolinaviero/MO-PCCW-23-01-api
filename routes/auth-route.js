const express = require('express');
const router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
    const user = db.get('users').find({ email: req.body.email }).value();

    const validPassword = await bcrypt.compare(req.body.password, user.password);
   
    if (req.body.email === user.email && validPassword) {
      const token = jwt.sign({ id: user.id }, 'mySecret');
      res.status(200).cookie('token', token).send('Welcome user!');
    } else {
      res.status(401).send('Wrong password or email');
    }
   });
   

router.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    db.get('users')
      .push({ 
            id: db.get('users').value().length + 1, 
            password: hashedPassword,
            email: req.body.email,
        })
      .write();
    res.sendStatus(201);
   });


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

router.get('/secret', authenticationMiddleware, (req, res) => {
  res.send('Welcome to the secret route!')
});


module.exports = router;