import React, { useState } from "react";
import "./GoToPay.css";
import { useParams, Link, useHistory } from "react-router-dom";

const GoToPay=(props)=>{


    return(
        <div className="pay">
        <button>הכנס מספר כרטיס אשראי</button>
        <br />
        <Link to="/" className="linkShop">
          בחזרה לחנות
        </Link>
        </div>
    )
};

export default GoToPay;