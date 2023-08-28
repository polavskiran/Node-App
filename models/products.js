/* const db = require("../util/database_old");

module.exports = class Products {
  constructor(id, prodTitle, imageUrl, description, price) {
    this.id = id;
    this.title = prodTitle;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,price,description,imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static findByPk(id) {
    return db.execute(`SELECT * FROM products WHERE products.id= ?`, [id]);
  }

  static deleteById(id) {}
}; */

const { Sequelize } = require('sequelize');
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
