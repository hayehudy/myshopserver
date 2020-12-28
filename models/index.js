const mongoose = require("mongoose");
const { Product, ProductInCart, Cart, Customer } = require("./Product.js");


const connectDb = () => {
  const db_address=process.env.DB_ADDRESS;
  return mongoose.connect(
    db_address,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
};

const models = { Product, ProductInCart, Cart, Customer };

module.exports = { connectDb, models };
