const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  /* const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err)); */
  req.user.createProduct({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  /* Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  }); */
  req.user.getProducts()
    .then((result) => {
      res.render("admin/products", {
        prods: result,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  /* const product = Product.findById(productId, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  }); */
  req.user.getProducts({ where: { id: productId } })
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  /* const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save(); */
  // Update the existing record in DB with new values from form data
  Product.update(
    {
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDesc,
      imageUrl: updatedImageUrl,
    },
    { where: { id: productId } }
  )
    .then(() => {
      res.status(201);
      console.log("Updated Successfully!!!");
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log("productId to delete=", productId);

  /* Product.deleteProduct(productId, (product) => {
    res.render("/admin/products", {
      pageTitle: "Delete Product",
      path: "/admin/products",
      product: product,
    });
  }); */
  // Product.deleteById(productId);
  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then(() => {
      res.status(200);
      console.log("Deleted Successfully...");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
