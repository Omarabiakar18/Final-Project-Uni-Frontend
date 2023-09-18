// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "./User.css";
import { useRef } from "react";
import { postData } from "./utils";

const SERVER = import.meta.env.VITE_BACKEND;

function ForgotPass() {
  const url = `${SERVER}/api/auth/forgotpassword`;
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
    } else {
      alert("Email is sent!!");
    }
    localStorage.clear();
  }

  return (
    <div className="forgot-password">
      <form id="form-forgot" onSubmit={handleSubmit}>
        <div className="forgot-title-div">
          <label id="forgot-title">Forgot Your Password...</label>
          <label id="enter-email-title">Enter your email to continue:</label>
        </div>
        <div className="container-forgot">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            ref={(elt) =>
              (formData.current = {
                email: () => elt.value,
                ...formData.current,
              })
            }
            placeholder="Enter your email address."
          />
        </div>
        <button className="forgot-button">Continue</button>
      </form>
    </div>
  );
}

export default ForgotPass;
