import React, { useState, useContext } from "react";
import "./GoToPay.css";
import { useParams, Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import Axios from "axios";
import Context from "../../../context";

const GoToPay=(props)=>{
  const [creditNmber,setCreditNumber]=useState(null);
  const {   
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
  const newCart={
    itemsOfCart:itemsOfCart,
    name:name,
    password:password,
  }
   function goPay(){
    console.log(creditNmber);
    if (name&&password){
    Axios.post("/api/shop/newCart",newCart).then((res)=>{
      console.log(res.data)
    })}
  }

    return(
        <div className="pay">
        <input type="number" onChange={(e)=>setCreditNumber(e.target.value)} placeholder="הכנס מספר כרטיס אשראי"/>
        <br />
        <Button onClick={goPay} >לחץ לתשלום</Button>
        <Link to="/" className="linkShop">
          בחזרה לחנות
        </Link>
        </div>
    )
};

export default GoToPay;