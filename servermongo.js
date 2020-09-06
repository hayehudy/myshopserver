const mongoose = require("mongoose");

function connectTODB() {
  return mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

console.log("yachabibi");
