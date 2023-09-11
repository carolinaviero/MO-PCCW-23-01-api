const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);
const Product = require('../model/Product');

const getAllProducts = (req, res, next) => {
    Product.getAll((results) => {
      if (!results) {
        res.send("Error retrieving all products")
      }
      res.send(results);
    });
};
   
const getProductById = (req, res) => {
    const foundProduct = db.get('products').value().find(product => product.id === Number(req.params.id))
    if (!foundProduct) res.sendStatus(404);
    
    res.send(foundProduct);
};

const createProduct = (req, res) => {
    db.get('products').push(req.body).write();

    const allProducts = db.get('products').value();

    res.send(allProducts);
};

const updateProduct = (req, res) => {

    db.get('products').find({ id: Number(req.params.id) }).assign(req.body).write()

    const allProducts = db.get('products').value();
    res.send(allProducts);
};

const deleteProduct = (req, res) => {
    db.get('products').remove({ id: Number(req.params.id) }).write();
    
    const allProducts = db.get('products').value();
    res.send(allProducts);
};
   
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };