const products = [];
const fs = require("fs");
const path = require("path");

const Cart = require('./cart');

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class products_old {
  constructor(id, prodTitle, imageUrl, description, price) {
    this.id = id;
    this.title = prodTitle;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    /* this.id = Math.random().toString();
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
        console.log(err);
      });
    }); */
    getProductsFromFile((products) => {
      if (this.id) {
        const productIndex = products.findIndex((prod) => prod.id === this.id);
        const updatedProduct = [...products];
        updatedProduct[productIndex] = this;
        fs.writeFile(
          filePath,
          JSON.stringify(updatedProduct, null, 2),
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByPk(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }

  static deleteById(id, cb) {    
    getProductsFromFile((products) => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2), (err) => {
        console.log(err);
        if(!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
