const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

const Product = {};

Product.getAll = (callback) => {
    const products = db.get("products").value()
    callback(products)
};

module.exports = Product;