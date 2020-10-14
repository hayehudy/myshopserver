import React, { useState, useEffect } from "react";
import "./pageOfProduct.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function PageOfProduct() {
  const [PageOP, setPageOP] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/shop/${id}`).then((res) => {
      setPageOP(res.data);
    });
  }, []);
  console.log(PageOP);
  return (
    <div className="pap">
      <h1>{PageOP.title}</h1>
      <div>
        <img src={PageOP.image} />
      </div>
      <div>המחיר:{PageOP.price}</div>
      <br />
      <h3>:תיאור המוצר</h3>
      {PageOP.description}
      <br />
      <br />
      <Link to="/">בחזרה לחנות</Link>
    </div>
  );
}
