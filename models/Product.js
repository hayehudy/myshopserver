const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  description: String,
});

const productInCartSchema = schema({
  cartId: { type: schema.Types.ObjectId, ref: "Cart" },
  productFromShop: { type: schema.Types.ObjectId, ref: "Product" },
  quantityOnCart: Number,
});

const cartSchema = schema({
  products: [{ type: schema.Types.ObjectId, ref: "ProductInCart" }],
  charge: Number,
  customer: { type: schema.Types.ObjectId, ref: "Customer" },
});

const customerSchema = schema({
  name: String,
  password: String,
  carts: [{ type: schema.Types.ObjectId, ref: "Cart" }],
});

const Product = mongoose.model("Product", productSchema);
const ProductInCart = mongoose.model("productInCart", productInCartSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Product, ProductInCart, Cart, Customer };
