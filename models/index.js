const mongoose = require("mongoose");
const { Product, ProductInCart, Cart, Customer } = require("./Product.js");

const connectDb = () => {
  const DBPASSWORD=process.env.DBPASSWORD;
  return mongoose.connect(
    `mongodb+srv://mordechay:?{DBPASSWORD}@cluster0.rtz5z.mongodb.net/<dbname>?retryWrites=true&w=majority`,

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
