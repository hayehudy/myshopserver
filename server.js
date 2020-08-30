const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/shop", (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    if (search) {
      const filteredshop = shop.filter((product) =>
        product.title.includes(search)
      );
      res.send(filteredshop);
    } else {
      res.send(shop);
    }
  });
});

app.get("/shop/:id", (req, res) => {
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    const productId = +req.params.id;
    const place = shop.findIndex((x) => x.id === productId);
    res.send(shop[place]);
  });
});

app.post("/shop", (req, res) => {
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    const newProduct = req.body;
    shop.push(newProduct);
    fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
      // console.log(err);
      res.send("YOU SUCCEED!!!");
    });
  });
});

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/shop/:id", (req, res) => {
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    const productId = +req.params.id;
    const productIndex = shop.findIndex((product) => product.id === productId);
    shop.splice(productIndex, 1);
    fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
      res.send("YOU SUCCEED!!!");
    });
  });
});

app.put("/shop/:id", (req, res) => {
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    const todoId = +req.params.id;
    const todoIndex = shop.findIndex((todo) => todo.id === todoId);
    shop[todoIndex].title = req.body.title;
    fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
      res.send("YOU SUCCEED!!!");
    });
  });
});

app.use("/images", express.static("images"));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

// http://127.0.0.1:8000/shop
