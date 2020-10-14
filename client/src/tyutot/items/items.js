import React, { useState, useEffect, useContext } from "react";
import "./items.css";
import Context from "../../context";

function Items(props) {
  const { itemsOfCart } = useContext(Context);

  return (
    <div>
      {itemsOfCart.map((product) => (
        <div className="product">
          <h4>{product.title}</h4>
          <div>
            <img src={product.image} />
          </div>
          <div>הכמות: {product.quantityOnCart}</div>
          <div>לתשלום: {product.price * product.quantityOnCart}</div>
        </div>
      ))}
    </div>
  );
}
export default Items;
