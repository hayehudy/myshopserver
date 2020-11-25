import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Context from "../../context";

function Product(props) {
  const prop = props.product;
  const trueId =prop._id;
  const imgClass = props.information === "shop" ? "shopImg" : "cartImg";
  const buttonOfAdd = props.information === "shop" ? "הוסף מוצר לעגלה" : "+";
  const buttonOfRemove = props.information === "shop" ? "הסר מוצר מהעגלה" : "-";
  const {
    data,
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

  const place = data.findIndex((x) => x._id === prop._id);
  const place1 = itemsOfCart.findIndex((x) => x._id === prop._id);

  function add() {
    if (prop.quantity > 0) {
      // if (name && password) {
      //   axios.post("/api/shop/cartAdd", body).then((res) => {
      //     setCartId(res.data);
      //   });
      // }
      //change the 
      setCart(cart + 1);
      setCartCharge(cartCharge + prop.price);
      //change the quantity of the product in the shop      
      let newProducts = data;
      newProducts[place].quantity--;
      changeData(newProducts);
      //add product to the cart or change his quantity on cart    
      if (place1 > -1) {
        const newItems = itemsOfCart;
        newItems[place1].quantityOnCart++;
        setItems(newItems);
      } else {
        const newItem = prop;
        newItem.quantityOnCart = 1;
        setItems([...itemsOfCart, newItem]);
      }
    }
  }

  function remove () {
    
    if (place1>-1) {
      // if (name && password) {
      //   //
      //   axios.post("/api/shop/cartRemove", body);
      // }
      setCart(cart - 1);
      setCartCharge(cartCharge - prop.price);
      //change the quantity of the product in the shop
      const newProducts = data;   
      newProducts[place].quantity++;
      changeData(newProducts);
      //remove product from the cart or change his quantity on cart     
      if (place1 > -1) {
        const newItems = itemsOfCart;
        if (newItems[place1].quantityOnCart > 1) {
          newItems[place1].quantityOnCart--;
          setItems(newItems);
        } else {
          newItems.splice([place1], 1);
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
