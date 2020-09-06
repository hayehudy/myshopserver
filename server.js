const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/shop", (req, res) => {
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
    shop.push(req.body);
    fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
      // console.log(err);
      res.send("YOU SUCCEED!!!");
    });
  });
  io.emit("addProduct", shop);
});

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/shop/:title", (req, res) => {
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    const productTitle = req.params.title;
    const productIndex = shop.findIndex(
      (product) => product.title === productTitle
    );
    if (productIndex > -1) {
      shop.splice(productIndex, 1);
    }
    fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
      res.send("YOU SUCCEED!!!");
    });
  });
  io.emit("deleteProduct", shop);
});

// app.put("/shop", (req, res) => {
//   fs.readFile("shop.json", (err, data) => {
//     const shop = JSON.parse(data);
//     const titles = req.body;
//     const titleIndex = shop.findIndex(
//       (product) => product.title === titles.oldTitle
//     );
//     shop[titleIndex].title = titles.newTitle;
//     fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
//       res.send("YOU SUCCEED!!!");
//     });
//   });
// });

app.put("/shop/update", (req, res) => {
  fs.readFile("shop.json", (err, data) => {
    const shop = JSON.parse(data);
    const titleIndex = shop.findIndex(
      (product) => product.title === req.body.title
    );
    shop[titleIndex].quantity = req.body.newQuantity;

    fs.writeFile("shop.json", JSON.stringify(shop), (err) => {
      res.send("YOU SUCCEED!!!");
    });
    io.emit("updateQuantity", shop);
  });
});

app.use("/images", express.static("images"));

server.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

// http://127.0.0.1:8000/shop
