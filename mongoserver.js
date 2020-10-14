const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const { connectDb, models } = require("./models");
const { model } = require("mongoose");
const path = require('path');
 
 
// Serve static files from the React app
app.use('/',express.static('client'));
 
app.use(bodyParser.json());
app.use(cors());

connectDb().then(async () => {
  server.listen(8000, () => {
    console.log("Example app listening on port 8000!");
  });
});

app.get("/shop", async (req, res) => {
  const search = req.query.search;
  let products = [];
  if (search) {
    products = await models.Product.find({
      title: { $regex: '^'+search ,$options: 'i'}
    }).exec();
  } else {
    products = await models.Product.find().exec();
  }
  res.send(products);
});

app.get("/shop/:id", async (req, res) => {
  const productId = +req.params.id;
  const findProduct = await models.Product.findOne({ id: productId });
  res.send(findProduct);
});

app.post("/shop", async (req, res) => {
  const newProduct = await new models.Product(req.body);
  newProduct.save();
  res.send("YOU SUCCEED!!!");
  const products = await models.Product.find();
  io.emit("addProduct", products);
});

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/shop", async (req, res) => {
  const ProductTitle = req.body.title;
  await models.Product.findOneAndDelete({ title: ProductTitle });
  res.send("YOU SUCCEED!!!");
  const products = await models.Product.find();
  io.emit("deleteProduct", products);
});

app.put("/shop/update", async (req, res) => {
  const { title, newQuantity } = req.body;
  await models.Product.findOneAndUpdate(
    { title: title },
    { quantity: newQuantity }
  );

  res.send("YOU SUCCEED!!!");
  const products = await models.Product.find();
  io.emit("updateQuantity", products);
});

app.post("/shop/cartAdd", async (req, res) => {
  //information from client (req):
  //1. title of the product to add.
  //2. cart-id! (if it already there is)
  //3. name and password of the customer

  let cartId = req.body.cartId;
  const { title, name, password } = req.body;

  // find the customer (if he already there is) or make a new customer
  let customer = await models.Customer.findOne({
    name: name,
    password: password,
  });
  if (!customer) {
    customer = new models.Customer({ name: name, password: password });
    await customer.save();
  }

  //make a new cart in the first add
  if (!cartId) {
    const newCart = new models.Cart({ customer: customer._id });
    await newCart.save();
    cartId = newCart._id;
    await models.Customer.findOneAndUpdate(
      { name: name, password: password },
      { carts: [...customer.carts, newCart] }
    );
  }

  //get the product that additional
  const product = await models.Product.findOne({
    title: title,
  }).exec();
  await models.Product.findOneAndUpdate({title:title},{quantity:product.quantity-1})

  const theCart = await models.Cart.findOne({ _id: cartId }).exec();
  const searchProduct = await models.ProductInCart.findOne({
    productFromShop: product._id,
    cartId: cartId,
  });

  // add the product to cart
  if (!searchProduct) {
    const newProductInCart = new models.ProductInCart({
      productFromShop: product._id,
      quantityOnCart: 1,
      cartId: cartId,
    });
    await newProductInCart.save();
    await models.Cart.findOneAndUpdate(
      { _id: cartId },
      { products: [...theCart.products, newProductInCart] }
    ).exec();
  } else {
    await models.ProductInCart.findOneAndUpdate(
      { _id: searchProduct._id },
      { quantityOnCart: searchProduct.quantityOnCart + 1 }
    ).exec();
  }

  res.send(cartId);
  //the client will check if cart-id sended, and will catch it in state-variable
});

app.post("/shop/cartRemove", async (req, res) => {
  const { title, cartId } = req.body;
  const product = await models.Product.findOne({
    title: title,
  }).exec();
  await models.Product.findOneAndUpdate({title:title},{quantity:product.quantity+1})

  const theCart = await models.Cart.findOne({ _id: cartId }).exec();
 
  const searchProduct = await models.ProductInCart.findOne({
    productFromShop: product._id,
    cartId: cartId,
  }).exec();

  

  if (searchProduct.quantityOnCart > 1) {
    await models.ProductInCart.findOneAndUpdate(
      { _id: searchProduct._id },
      { quantityOnCart: searchProduct.quantityOnCart - 1 }
    ).exec();
  } else {
    await models.ProductInCart.findOneAndDelete({
      _id: searchProduct._id,
    }).exec();
    const index = theCart.products.findIndex(
      (x) => JSON.stringify(x) === JSON.stringify(searchProduct._id)
    );
    // console.log(theCart.products);
    // console.log(index);
    const updateCartProducts = theCart.products.splice([index], 1);
    
    console.log(updateCartProducts);
    const deleteFromCart = await models.Cart.findOneAndUpdate(
      { _id: cartId },
      { products: theCart.products}
    ).exec();
    // console.log(deleteFromCart.products);
  }
  res.send("you succeed!");
});

app.use("/images", express.static("images"));
