import React, { useState, useEffect, useContext } from "react";
import "./products.css";
import Product from "./product";
import { Slider } from "antd";
import Context from "../../context";
import { OmitProps } from "antd/lib/transfer/ListBody";

function Products(props) {
  const { data, search, setSearch, cart, cartCharge } = useContext(Context);
  const products=props.products;
  const info=props.information;
  const className=info==="shop"?"pr":"productInCart";
  const className1=info==="shop"?"pro":(info==="pay"?"pro":"cart");
  const [value0, setValue0] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  let keyNumber=0;

  for (let i=0;i<products.length;i++){
    if (products[i].price>value2){setValue1(products[i].price);setValue2(products[i].price)}
  }

  function onAfterChange(value) {
    setValue0(value[0]);
    setValue1(value[1]);
  }

  function searchProduct(value) {
    setSearch(value);
  }

  return (
    <div className={className1}>
      {props.information==="shop"?
      (<><Slider
      range
      step={10}
        defaultValue={[0, value2]}
        min={0}
        max={value2}
        onAfterChange={onAfterChange}
      />
      <input onChange={(e) => searchProduct(e.target.value)}></input>
      <> חפש מוצר
      בחנות</>
      <br /></>):(<> פריטים שנוספו לעגלה: {cart}
                <br />
                לתשלום: {cartCharge}</>)}
      {products.map(
        (product) =>
          
          product.price > value0 && 
            product.price <= value1 && (
            <div className={className} key={product._id}>
              <Product
                information={props.information}
                product={product}
              />
            </div>
          )
              )}
    </div>
  );
}

export default Products;

