const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDb, models } = require("./models");
const { model } = require("mongoose");
const path = require('path');
const dotenv = require("dotenv");
const morgan = require("morgan");
const cloudinary = require("cloudinary");
dotenv.config(); 

cloudinary.config({
  cloud_name: "doaqrneiv",
  api_key: "676161393779472",
  api_secret: "lmPswLqjFGTU5uXWWA9V8P_2dcc"
  });
 
// Serve static files from the React app
app.use("/images", express.static("images"));
app.use(express.static(path.join(__dirname, 'client/build'))); 
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors());


connectDb().then(() => {
  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.log(`the-shop-of-mordechay app listening on port ${port}!`);
  });
});

app.get("/api/shop", async (req, res) => {
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

app.get("/api/shop/:id", async (req, res) => {
  const productId = req.params.id;
  const findProduct = await models.Product.findOne({_id:productId }).exec();
  res.send(findProduct);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.post("/api/shop", async (req, res) => {
  const newProduct = await new models.Product(req.body);
  newProduct.save();
  res.send("YOU SUCCEED!!!");
  const products = await models.Product.find().exec();
  io.emit("addProduct", products);
});

app.post("/api/upload",  async (req, res) => {  
  // req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  cloudinary.v2.uploader.upload(req.body.base64,
   await function (error,result)
    {res.send(result.url)});  
});

app.delete("/api/shop", async (req, res) => {
  const ProductTitle = req.query.title;
  await models.Product.findOneAndDelete({ title: ProductTitle }).exec();
  res.send("YOU SUCCEED!!!");
  const products = await models.Product.find().exec();
  io.emit("deleteProduct", products);
});

app.put("/api/shop/update", async (req, res) => {
  const { title, newQuantity } = req.body;
  await models.Product.findOneAndUpdate(
    { title: title },
    { quantity: newQuantity }
  ).exec();
  res.send("YOU SUCCEED!!!");
  const products = await models.Product.find().exec();
  io.emit("updateQuantity", products);
});

// app.post("/api/shop/newCart",async (req, res) => {
//     const {itemsOfCart, name, password}=req.body;
//     let productsArray=[];

//    // find the customer (if he already there is) or create a new customer
//    let customer =  await models.Customer.findOne({
//     name: name,
//     password: password,
//   }).exec();
//   if (!customer) {
//     customer = new models.Customer({ name: name, password: password });
//     await customer.save();
//   }

//   // create a new cart
    
//     const newCart = new models.Cart({ customer: customer._id });
//     await newCart.save();
//     await models.Customer.findOneAndUpdate(
//       { name: name, password: password },
//       { carts: [...customer.carts, newCart] }
//     ).exec();
//     console.log("cart in customer")
    
  

//   itemsOfCart.map(async (item)=>{
//     const product = await models.Product.findOne({
//       title: item.title,
//     }).exec();

//     //create a new product in cart
//     const newCartProduct = new models.ProductInCart({
//       productFromShop: product._id,
//       quantityOnCart: item.quantityOnCart,
//       cartId: newCart._id,
//     });
//     await newCartProduct.save();  

//     productsArray=[...productsArray, newCartProduct._id];
    
//     const updateCart= await models.Cart.findOneAndUpdate(
//       { _id: newCart._id },
//       { products: productsArray}
//     ).exec();
  
//   });
    
//   res.send("the customer and cart saved");
// })


// app.post("/api/shop/cartAdd", async (req, res) => {
//   //information from client (req):
//   //1. title of the product to add.
//   //2. cart-id! (if it already there is)
//   //3. name and password of the customer

//   let cartId = req.body.cartId;
//   const { title, name, password } = req.body;

//   // find the customer (if he already there is) or make a new customer
//   let customer = await models.Customer.findOne({
//     name: name,
//     password: password,
//   }).exec();
//   if (!customer) {
//     customer = new models.Customer({ name: name, password: password });
//     await customer.save();
//   }

//   //make a new cart in the first add
//   if (!cartId) {
//     const newCart = new models.Cart({ customer: customer._id });
//     await newCart.save();
//     cartId = newCart._id;
//     await models.Customer.findOneAndUpdate(
//       { name: name, password: password },
//       { carts: [...customer.carts, newCart] }
//     ).exec();
//   }

//   //get the product that additional
//   const product = await models.Product.findOne({
//     title: title,
//   }).exec();
//   // await models.Product.findOneAndUpdate({title:title},{quantity:product.quantity-1}).exec();

//   const theCart = await models.Cart.findOne({ _id: cartId }).exec();
//   const searchProduct = await models.ProductInCart.findOne({
//     productFromShop: product._id,
//     cartId: cartId,
//   }).exec();

//   // add the product to cart
//   if (!searchProduct) {
//     const newProductInCart = new models.ProductInCart({
//       productFromShop: product._id,
//       quantityOnCart: 1,
//       cartId: cartId,
//     });
//     await newProductInCart.save();
//     await models.Cart.findOneAndUpdate(
//       { _id: cartId },
//       { products: [...theCart.products, newProductInCart._id] }
//     ).exec();
//   } else {
//     await models.ProductInCart.findOneAndUpdate(
//       { _id: searchProduct._id },
//       { quantityOnCart: searchProduct.quantityOnCart + 1 }
//     ).exec();
//   }

//   res.send(cartId);
//   //the client will check if cart-id sended, and will catch it in state-variable
// });

// app.post("/api/shop/cartRemove", async (req, res) => {
//   const { title, cartId } = req.body;
//   const product = await models.Product.findOne({
//     title: title,
//   }).exec();
//   // await models.Product.findOneAndUpdate({title:title},{quantity:product.quantity+1}).exec();

//   const theCart = await models.Cart.findOne({ _id: cartId }).exec();
 
//   const searchProduct = await models.ProductInCart.findOne({
//     productFromShop: product._id,
//     cartId: cartId,
//   }).exec();

  

//   if (searchProduct.quantityOnCart > 1) {
//     await models.ProductInCart.findOneAndUpdate(
//       { _id: searchProduct._id },
//       { quantityOnCart: searchProduct.quantityOnCart - 1 }
//     ).exec();
//   } else {
//     await models.ProductInCart.findOneAndDelete({
//       _id: searchProduct._id,
//     }).exec();
//     const index = theCart.products.findIndex(
//       (x) => JSON.stringify(x) === JSON.stringify(searchProduct._id)
//     );
//     // console.log(theCart.products);
//     // console.log(index);
//     const updateCartProducts = theCart.products.splice([index], 1);
    
//     console.log(updateCartProducts);
//     const deleteFromCart = await models.Cart.findOneAndUpdate(
//       { _id: cartId },
//       { products: theCart.products}
//     ).exec();
//     // console.log(deleteFromCart.products);
//   }
//   res.send("you succeed!");
// });

