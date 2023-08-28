const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();
const path = require("path");

/* const Product = require("./models/products");
const User = require("./models/User");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item"); */

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");

const server = http.createServer(app);
/* const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop"); */
const mongoConnect = require("./util/database");

app.use((req, res, next) => {
  /* User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err)); */
});

/* app.use("/admin", adminRoutes);
app.use(shopRoutes); */
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

/* Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

app.use(errorController.get404);

sequelize
  .sync({force: true})
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Kiran", email: "kiran@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  }).then(() => {    
    app.listen(3001);
  })
  .catch((err) => console.log(err)); */

  mongoConnect(client => {
    console.log(client);
    app.listen(3001);
  });