import "./User.css";
import { postData, getData } from "./utils";
import React, { useEffect, useRef, useState } from "react";
import { Pinwheel } from "@uiball/loaders";
import Header from "./Header";
import countriesList from "countries-list";

function Loading() {
  return <Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function CountryDropdown({ defaultCountry }) {
  const countries = Object.values(countriesList.countries);

  return (
    <>
      <div id="label-checkout" className="country-label">
        <label htmlFor="country">Select a Country:</label>
      </div>
      <div className="country-choice">
        <select id="country" name="country" defaultValue={defaultCountry}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function GetTotal({ setBookDisplay, bookDisplay, totalData, setTotal }) {
  const [errorMessage, setError] = useState(null);
  const bookID = useRef(null);

  const url = `/api/users/itemsInCart`;
  const email = localStorage.getItem("email");
  const sendData = { email };

  useEffect(
    () => async () => {
      const [data, error] = await postData(url, sendData);
      if (error) {
        setError(error);
      } else {
        setBookDisplay(
          data.data.map((item) => ({
            bookID: item.bookInfo.bookID,
            bookQuantity: item.bookQuantity,
          }))
        );

        setTotal(data.totalAmount);
      }
    },
    []
  );

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (!totalData) {
    return <Loading />;
  }

  return (
    <div>
      <label id="data-label">${totalData}</label>
    </div>
  );
}

function DisplayTotal({ totalData }) {
  if (!totalData) {
    return <Loading />;
  }
  return (
    <div>
      <label id="data-label">${totalData + 3}</label>
    </div>
  );
}

function Checkout() {
  const email = localStorage.getItem("email");
  const [bookDisplay, setBookDisplay] = useState(null);
  const [totalData, setTotal] = useState(null);
  const bookID = useRef(null);

  async function handleCheckout() {
    const url = `/api/users/addToLibrary`;
    const email = localStorage.getItem("email");

    const sendData = { email, bookID: bookDisplay.map((item) => item.bookID) };
    const [data, error] = await postData(url, sendData);

    if (error) {
      alert(`Error Occured: ${error}`);
      return;
    } else {
      alert("Checkout Successfull!! You can view your items in My Library.");
    }
    //Remove all items from cart
    const url_2 = `/api/users/removeAllCart`;

    const sendData_2 = { email };
    const [data_2, error_2] = await postData(url_2, sendData_2);

    if (error_2) {
      alert(`Error Occured: ${error}`);
      return;
    }

    return <div></div>;
  }

  return (
    <div className="container-checkout">
      <Header />
      <div className="front-image-div">
        <img src="https://cutt.ly/pwzQWW1l" alt="Checkout Photo" />
        <div className="image-text-checkout">Checkout</div>
      </div>
      <form>
        <div className="second-container-checkout">
          <div className="userinfo-checkout">
            <div className="homeaddress-checkout">
              <CountryDropdown defaultCountry="Lebanon" />
              <div id="label-checkout" className="city-label">
                <label>City: </label>
              </div>
              <div className="city-input">
                <input type="text" placeholder="Enter your city name" />
              </div>

              <div id="label-checkout" className="city-input">
                <label>Street Name:</label>
              </div>
              <div className="street-checkout">
                <input type="text" placeholder="Enter your street name" />
              </div>
              <div id="label-checkout" className="floor-label">
                <label>Floor:</label>
              </div>
              <div className="floor-checkout">
                <input type="text" placeholder="Enter your floor number" />
              </div>

              <div id="label-checkout" className="floor-label">
                <label>Phone Number:</label>
              </div>
              <div className="Phone-checkout">
                <input type="text" placeholder="Enter your phone number" />
              </div>

              <div id="label-checkout" className="floor-label">
                <label>Email:</label>
              </div>
              <div className="email-checkout">
                <input type="text" value={email} disabled={true} />
              </div>

              <div id="label-checkout" className="notes-label">
                <label>Notes:</label>
              </div>
              <div className="notes-checkout">
                <textarea
                  type="text"
                  placeholder="If needed: Enter details for delivery man."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="useritems-checkout-cont">
            <label id="inyourbag-label">In Your Bag:</label>
            <div className="useritems-checkout">
              <div className="sub">
                <label id="useritems-label">SubTotal: </label>
                <GetTotal
                  setBookDisplay={setBookDisplay}
                  bookDisplay={bookDisplay}
                  totalData={totalData}
                  setTotal={setTotal}
                />
              </div>
              <div className="shipping">
                <label id="useritems-label">Shipping: </label>
                <label id="data-label">$3</label>
              </div>
              <div className="total">
                <label id="useritems-label">Total: </label>
                <DisplayTotal totalData={totalData} />
              </div>
              <div id="checkout-button-div">
                <button
                  type="button"
                  id="checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Checkout;
