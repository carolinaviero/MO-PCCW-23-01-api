const express = require('express');
const serverPort = 8000;
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/products-route");
const authRouter = require("./routes/auth-route");

app.use(express.json());
app.use(cookieParser());

app.use('/products', productsRouter);

app.use('/auth', authRouter);

// default values
db.defaults({
    users: [{}], 
    products: [
    { id: 1, name: "Best book ever", price: 30 },
    { id: 2, name: "Best pen ever", price: 1 },
    { id: 3, name: "Best water bottle ever", price: 15 }] 
})
.write();

app.get('/', (req, res) => {
    console.log('Hello there!');
    res.send('Hello there!')
})

app.listen(serverPort, () => console.log(`Express server is running on port ${serverPort}!`));