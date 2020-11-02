import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Context from "../../context";

function Product(props) {
  const prop = props.product;
  const trueId = prop.id;
  const imgClass = props.information === "shop" ? "shopImg" : "cartImg";
  const buttonOfAdd = props.information === "shop" ? "הוסף מוצר לעגלה" : "+";
  const buttonOfRemove = props.information === "shop" ? "הסר מוצר מהעגלה" : "-";
  const {
    data,
    initialData,
    changeData,
    cart,
    setCart,
    itemsOfCart,
    setItems,
    cartCharge,
    setCartCharge,
    name,
    password,
    cartId,
    setCartId,
  } = useContext(Context);

  const body = {
    name: name,
    password: password,
    title: prop.title,
    cartId: cartId,
  };

  function add() {
    const initial = initialData.find((x) => x.id === prop.id);
    const firstQuantity = initial.quantity;
    if (prop.quantity > 0) {
      if (name && password) {
        axios.post("/api/shop/cartAdd", body).then((res) => {
          setCartId(res.data);
        });
      }
      setCart(cart + 1);
      setCartCharge(cartCharge + prop.price);
      //change the quantity of the product in the shop
      prop.quantity = prop.quantity - 1;

          
  let newProducts = data;
      const place1 = newProducts.findIndex((x) => x.id === prop.id);
      newProducts[place1] = prop;
      changeData(newProducts);
      //add product to the cart or change his quantity on cart
            
      
      
      const newItem = prop
      const place2 = itemsOfCart.findIndex((x) => x.id === prop.id);
      if (place2 > -1) {
        const newItems = itemsOfCart;
        newItems[place2].quantityOnCart = firstQuantity - prop.quantity;
        setItems(newItems);
      } else {
        newItem.quantityOnCart = firstQuantity - prop.quantity;
        setItems([...itemsOfCart, newItem]);
      }
    }
  }

  const remove = (product, quantityOnCart) => {
    const placeA = initialData.findIndex((x) => x.id === prop.id);
    const firstQuantity = initialData[placeA].quantity;
    if (prop.quantity < firstQuantity) {
      if (name && password) {
        //
        axios.post("/api/shop/cartRemove", body);
      }
      setCart(cart - 1);
      setCartCharge(cartCharge - prop.price);
      //change the quantity of the product in the shop
      prop.quantity = prop.quantity + 1;
      let newProducts = data;
      const place1 = newProducts.findIndex((x) => x.id === prop.id);
      newProducts[place1] = prop;
      changeData(newProducts);
      //remove product from the cart or change his quantity on cart
      const newItem = prop;
      const place2 = itemsOfCart.findIndex((x) => x.title === prop.title);
      if (place2 > -1) {
        const newItems = itemsOfCart;
        if (newItems[place2].quantityOnCart > 1) {
          const replaceQuanti = (newItems[place2].quantityOnCart =
            firstQuantity - prop.quantity);
          setItems(newItems);
        } else {
          const removeItem = newItems.splice([place2], 1);
          setItems(newItems);
        }
      }
    }
  };

  return (
    <div>
      <Link to={`/product/${trueId}`}>
        <h2>{prop.title}</h2>
        <div>
          <img src={prop.image} className={imgClass} />
        </div>
        {props.information === "shop" ? (
          <>
            <div>המחיר: {prop.price}</div>
            <div>המלאי בחנות: {prop.quantity} </div>
          </>
        ) : (
          <>
            <div>הכמות: {prop.quantityOnCart}</div>
            <div>לתשלום: {prop.price * prop.quantityOnCart}</div>
          </>
        )}
      </Link>
      <button onClick={add}>{buttonOfAdd}</button>
      <button onClick={remove}>{buttonOfRemove}</button>
    </div>
  );
}

export default Product;
