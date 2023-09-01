import { Link } from "react-router-dom";
import "./User.css";
import { useRef } from "react";

import { postData } from "./utils";

const SERVER = import.meta.env.VITE_BACKEND;

function LogIn() {
  const url = `/api/auth/login`;
  const formData = useRef({});

  async function handleSubmit(event) {
    event.preventDefault();
    const sendData = {};
    for (let key in formData.current) {
      sendData[key] = formData.current[key]();
    }
    const [data, error] = await postData(url, sendData);
    console.log(data);
    if (error) {
      alert(`Error Occured: ${error}`);
      localStorage.clear();
    } else {
      localStorage.setItem("fullName", data.data.user.fullName);
      localStorage.setItem("email", data.data.user.email);
      location.href = "/start";
    }
  }

  return (
    <div className="login">
      <form id="form-login" onSubmit={handleSubmit}>
        <div className="login-title-div">
          <label id="login-title">Log In to continue:</label>
        </div>
        <div className="container-login">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email address."
            ref={(elt) =>
              (formData.current = {
                email: () => elt.value,
                ...formData.current,
              })
            }
          />
          <label htmlFor="Password">Password:</label>

          <input
            type="password"
            required
            placeholder="Enter your password."
            ref={(elt) =>
              (formData.current = {
                password: () => elt.value,
                ...formData.current,
              })
            }
          />
          <div id="item-grid"></div>
          <Link id="forgot-password-link-from-login" to="/forgotpassword">
            Forgot your password?
          </Link>
        </div>
        <div className="login-ending-div">
          <button className="login-button">Login</button>
          <label htmlFor="want-to-sign-up">
            Don't have an account? <Link to="/signup">Signup</Link>
          </label>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
