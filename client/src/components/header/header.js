import React, { useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Context from "../../context";

function Header() {
  const { name, password } = useContext(Context);
  return (
    <div className="hd">
      <h3>תשמישי הקדושה</h3>
      <Link to="/login">
        <button className="loginButton">התחבר כמנהל</button>
      </Link>

      <span className="goToPay">
        <Link to="/goToPay">
          <button>בצע קניה</button>
        </Link>
      </span>
      <span className="CustomerLoginButton">
        {!name && (
          <Link to="/CustomerLogin">
            <button>התחבר כלקוח</button>
          </Link>
        )}
        {name && password && <span>שלום {name}</span>}
      </span>
    </div>
  );
}

export default Header;
