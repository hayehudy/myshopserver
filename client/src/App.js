import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import PageOfProduct from "../src/components/pages/pageofproduct/pageOfProduct";
import Login from "../src/components/pages/pageOfLogin/login";
import CustomerLogin from "../src/components/pages/CustomerLogin/CustomerLogin";
import Change from "../src/components/pages/ChangeServer/Change";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../src/components/header/header";
import Products from "../src/components/products/products";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { Provider } from "./context";

function App() {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(0);
  const [cartCharge, setCartCharge] = useState(0);
  const [itemsOfCart, setItems] = useState([]);
  const [search, setSearch] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const theShop = {
    data: data,
    changeData: (value) => setData(value),
    initialData: initialData,
    cart: cart,
    itemsOfCart: itemsOfCart,
    setCart: (value) => setCart(value),
    setItems: (value) => setItems(value),
    cartCharge: cartCharge,
    setCartCharge: (value) => setCartCharge(value),
    search: search,
    setSearch: (value) => setSearch(value),
    cartId: cartId,
    setCartId: (value) => setCartId(value),
    name: name,
    setName: (value) => setName(value),
    password: password,
    setPassword: (value) => setPassword(value),
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/shop", { params: { search: search } })
      .then((res) => {
        setData(res.data);
      });
  }, [search]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/shop").then((res) => {
      setInitialData(res.data);
    });
  }, []);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8000");
    socket.on("updateQuantity", (data) => {
      setData(data);
    });
    socket.on("deleteProduct", (data) => {
      setData(data);
    });
    socket.on("addProduct", (data) => {
      setData(data);
    });
  }, []);

  return (
    <Provider value={theShop}>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <div className="hed">
                <Header />
              </div>
              <div className="cart">
                פריטים שנוספו לעגלה: {cart}
                <br />
                לתשלום: {cartCharge}
                <Products className="items"  products={itemsOfCart} information={"cart"}/>
              </div>

              <div className="prod">
                <Products products={data} information={"shop"}/>
              </div>
            </div>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/customerLogin">
            <CustomerLogin />
          </Route>
          <Route exact path="/changeServer">
            <Change />
          </Route>
          <Route exact path="/product/:id">
            <PageOfProduct />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
