const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

const Product = {};

// default values
db.defaults({ 
    products: [
    { id: 1, name: "Best book ever", price: 30 },
    { id: 2, name: "Best pen ever", price: 1 },
    { id: 3, name: "Best water bottle ever", price: 15 }] 
})
.write();

Product.getAll = (callback) => {
    const products = db.get("products").value()
    callback(products)
};

module.exports = Product;