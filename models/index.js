const mongoose = require("mongoose");
const { Product, ProductInCart, Cart, Customer } = require("./Product.js");


const connectDb = () => {
  const db_address=process.env.DB_ADDRESS;
  return mongoose.connect(
    "mongodb+srv://mordechay:ABcd1234@cluster0.rtz5z.mongodb.net/<dbname>?retryWrites=true&w=majority",

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
