// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "./User.css";

import { useRef } from "react";
import { postData } from "./utils";

const SERVER = import.meta.env.VITE_BACKEND;

function SignUp() {
  const url = `${SERVER}/api/auth/resetPassword/:token`;
  const formData = useRef({});

  async function handleSubmit(event) {
    event.preventDefault();
    const sendData = {};
    for (let key in formData.current) {
      sendData[key] = formData.current[key]();
    }
    const response = await postData(url, sendData);
    const json = await response.json();
    if (response.status >= 400) {
      alert(`Error Occured: ${json.message}`);
      localStorage.clear();
    } else {
      localStorage.setItem("token", json.token);
    }
  }
}

function ForgotPassword() {
  return (
    <div className="forgot-password">
      <form id="form-forgot">
        <div className="forgot-title-div">
          <label id="forgot-title">Reset Your Password</label>
        </div>
        <div className="container-forgot">
          <label id="forgot-title">Reset Your Password:</label>
          <input id="password" placeholder="Enter new password " />
          <label id="password-confirm">Confirm new password:</label>
          <input id="password-confirm" placeholder="Confirm new password " />
        </div>
        <button className="reset-button">Reset</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
