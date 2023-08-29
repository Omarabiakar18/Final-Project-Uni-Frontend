import { useRef } from "react";
import "./User.css";

import { Link } from "react-router-dom";
import { postData } from "./utils";

const SERVER = import.meta.env.VITE_BACKEND;

function SignUp() {
  const url = `${SERVER}/api/auth/signup`;
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
      localStorage.setItem("fullName", json.data.user.fullName);
      location.href = "/start";
    }
  }

  return (
    <div className="container-main-signup">
      <div className="container-1-div">
        <label className="are-you-ready">
          Welcome To
          <br /> <span className="big">BookShelf Depot</span>
        </label>
      </div>
      <div className="signup">
        <div className="main-title-div">
          <label htmlFor="main-title">
            Where Stories Come to Life Virtually
          </label>
          <br />
          {/* <label htmlFor="main-title">Igniting Imagination</label> */}
        </div>
        <div className="sub-title-div">
          <label htmlFor="sub-title">Your Ultimate Bookstore Experience</label>
        </div>

        <form id="form-signup" onSubmit={handleSubmit}>
          <label className="signup-label">SignUp to continue: </label>
          <div className="container-signup">
            <div id="grid-item" className="full-name-div1">
              <label htmlFor="fullName">Full Name:</label>
            </div>
            <div id="grid-item" className="full-name-div2">
              <input
                type="text"
                required
                placeholder="Enter your full name."
                ref={(elt) =>
                  (formData.current = {
                    fullName: () => elt.value,
                    ...formData.current,
                  })
                }
              />
            </div>

            <div id="grid-item" className="email-div1">
              <label htmlFor="email">Email:</label>
            </div>
            <div id="grid-item" className="email-div2">
              <input
                type="email"
                required
                placeholder="Enter your email address."
                ref={(elt) =>
                  (formData.current = {
                    email: () => elt.value,
                    ...formData.current,
                  })
                }
              />
            </div>

            <div id="grid-item" className="password-div1">
              <label htmlFor="Password">Password:</label>
            </div>
            <div id="grid-item" className="password-div2">
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
            </div>

            <div id="grid-item" className="confirm-password1">
              <label htmlFor="confirm-password">Confirm Password:</label>
            </div>

            <div id="grid-item" className="confirm-password2">
              <input
                type="password"
                required
                placeholder="Confirm your password."
                ref={(elt) =>
                  (formData.current = {
                    passwordConfirm: () => elt.value,
                    ...formData.current,
                  })
                }
              />
            </div>
          </div>
          {/* Sign Up Button */}
          <div className="signup-button-div">
            <button className="signup-button">Sign Up</button>
          </div>

          <div className="already-div">
            <label id="want-to-log-in">Already have an account? </label>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
