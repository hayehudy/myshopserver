const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);
