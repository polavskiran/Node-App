/* const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProductToCart(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1, price: +productPrice};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart, null, 2), err => {
        console.log("Error=",err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if(err) {
        return;
      }

      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);
      if(!product) return;
      const productyQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productyQty * productPrice;

      fs.writeFile(filePath, JSON.stringify(updatedCart, null, 2), err => {
        console.log(err);
      });
    });
  }

  static getCartProducts(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }
};
 */

const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  }
});

module.exports = Cart;