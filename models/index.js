const mongoose = require("mongoose");
const { Product, ProductInCart, Cart, Customer } = require("./Product.js");

const connectDb = () => {
  return mongoose.connect(
    "mongodb://localhost/test",

    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );
};

const models = { Product, ProductInCart, Cart, Customer };

module.exports = { connectDb, models };
