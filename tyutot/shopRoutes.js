const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const shopModel = require("./shopModel");

app.get("/shop", async (req, res) => {
  const search = req.query.search;
  const shop = await shopModel.find();
  if (search) {
    const filteredshop = shop.filter((product) =>
      product.title.includes(search)
    );
    res.send(filteredshop);
  } else {
    res.send(shop);
  }
});

app.get("/shop/:id", async (req, res) => {
  const shop = await shopModel.find();
  const productId = +req.params.id;
  const place = shop.findIndex((x) => x.id === productId);
  res.send(shop[place]);
});

app.post("/shop", async (req, res) => {
  await new shopModel(req.body);
  res.send("YOU SUCCEED!!!");
  io.emit("addProduct", shop);
});

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/shop/:title", async (req, res) => {
  const productTitle = req.params.title;
  await shopModel.findOneAndDelete({ title: productTitle });
  res.send("YOU SUCCEED!!!");
  io.emit("deleteProduct", shop);
});

app.put("/shop/update", async (req, res) => {
  const productTitle = req.body.title;
  const productQuantity = req.body.newQuantity;
  await shopModel.find({ title: productTitle }, { quantity: productQuantity });
  res.send("YOU SUCCEED!!!");
  io.emit("updateQuantity", shop);
});

app.use("/images", express.static("images"));

module.exports = app;
