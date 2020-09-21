const express = require("express");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

function conectToDB() {
  mongoose.connect("mongodb://localhost/test");
  const ProductSchema = new mongoose.Schema({
    id: Number,
    title: String,
    image: String,
    quantity: Number,
    price: Number,
    description: String,
  });
  
  const Product = mongoose.model("Product", ProductSchema);mo
}

conectToDB().then(async () => {
 
server.listen(8000, () => {
  console.log("Example app listening on port 8000!");
  
});



app.get("/shop", async (req, res) => {
  const search = req.query.search;
  const shop = await Product.find();
  if (search) {
    const filteredshop = shop.filter((Product) =>
      Product.title.includes(search)
    );
    res.send(filteredshop);
  } else {
    res.send(shop);
  }
});

app.get("/shop/:id", async (req, res) => {
  const shop = await Product.find();
  const ProductId = +req.params.id;
  const place = shop.findIndex((x) => x.id === ProductId);
  res.send(shop[place]);
});

app.post("/shop", async (req, res) => {
  await new Product(req.body);
  res.send("YOU SUCCEED!!!");
  io.emit("addProduct", shop);
});

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/shop/:title", async (req, res) => {
  const ProductTitle = req.params.title;
  await Product.findOneAndDelete({ title: ProductTitle });
  res.send("YOU SUCCEED!!!");
  io.emit("deleteProduct", shop);
});

app.put("/shop/update", async (req, res) => {
  const ProductTitle = req.body.title;
  const ProductQuantity = req.body.newQuantity;
  await Product.find({ title: ProductTitle }, { quantity: ProductQuantity });
  res.send("YOU SUCCEED!!!");
  io.emit("updateQuantity", shop);
});

app.use("/images", express.static("images"));

module.exports = app;



//    Product.find(function (err, Products) {
//       if (err) return console.error(err);
//       console.log(Products);
//     });
//   await Product.find().exec();
// });
