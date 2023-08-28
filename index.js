const express = require('express');
const serverPort = 8000;
const app = express();
const productsRouter = require("./routes/products-route");

app.use(express.json());

app.use('/products', productsRouter);

app.get('/', (req, res) => {
    console.log('Hello there!');
    res.send('Hello there!')
})

app.listen(serverPort, () => console.log(`Express server is running on port ${serverPort}!`));