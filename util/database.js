/* const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemysql', 'root', 'Polas@1982', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; */

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri =
  "mongodb+srv://pvskiran:zOI0UwhMWkYG8RQp@cluster0.cpna6s5.mongodb.net/?retryWrites=true&w=majority";

const mongoConnect = (callBack) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Successfully connected");
      callBack(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
