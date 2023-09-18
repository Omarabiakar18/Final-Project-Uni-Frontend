import "./User.css";
import { postData, getData } from "./utils";
import React, { useEffect, useState } from "react";
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

function Checkout() {
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
                <input type="text" placeholder="Enter your email address" />
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
                <label id="data-label">Data from database</label>
              </div>
              <div className="shipping">
                <label id="useritems-label">Shipping: </label>
                <label id="data-label">3$</label>
              </div>
              <div className="total">
                <label id="useritems-label">Total: </label>
                <label id="data-label">Data from database</label>
              </div>
              <div id="checkout-button-div">
                <button type="button" id="checkout-button">
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
