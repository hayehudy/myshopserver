import "./CustomerLogin.css";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from "../../../../node_modules/react";
import { useParams, Link, useHistory } from "react-router-dom";
import Context from "../../../context";

function CustomerLogin() {
  const { name, setName, password, setPassword } = useContext(Context);
  const newName = useRef();
  const newPassword = useRef();
  let history = useHistory();
  const sendNameAndPassword = () => {
    setName(newName.current.value);
    setPassword(newPassword.current.value);
    history.push("/");
  };
  return (
    <div className="borderToLogin">
      <div>הכנס שם משתמש</div>
      <input ref={newName} />
      <div>הכנס סיסמה</div>
      <input ref={newPassword} />
      <button onClick={sendNameAndPassword}>שלח</button>
    </div>
  );
}

export default CustomerLogin;
