// const products = [];
const Product = require("../models/products");
const Cart = require("../models/cart");
const e = require("express");

exports.getProducts = (req, res, next) => {
  /* Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  }); */
  Product.findAll()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  /* Product.findByPk(productId)
    .then(result => {
      res.render("shop/product-desc", {
        product: result,
        pageTitle: result.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err)); */
  Product.findAll({ where: { id: productId } })
    .then((result) => {
      res.render("shop/product-desc", {
        product: result[0],
        pageTitle: result[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  /* Product.fetchAll().then(([result, fieldSet]) => {
    res.render("shop/index", {
      prods: result,
      pageTitle: "Shop",
      path: "/"
    })
  }).catch(err => console.log(err)); */
  Product.findAll()
    .then((result) => {
      res.render("shop/index", {
        prods: result,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  /* Cart.getCartProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (cartProduct) => cartProduct.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        prods: cartProducts,
        pageTitle: "Your Cart",
        path: "/cart",
      });
    });
  }); */
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((cartProducts) => {
          res.render("shop/cart", {
            prods: cartProducts,
            pageTitle: "Your Cart",
            path: "/cart",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        //if the item is already in the cart then add one to its quantity and save it back into db
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  /* Product.findByPk(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  }); */
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => fetchedCart.setProducts(null))
    .then(() => res.redirect("/orders"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  /* res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  }); */
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log("Orders data=", JSON.stringify(orders));
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
