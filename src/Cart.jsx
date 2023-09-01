import { Link } from "react-router-dom";
import "./User.css";
import { postData } from "./utils";
import React, { useEffect, useState } from "react";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Book({ book }) {
  return (
    <div className="image-div">
      <div id="book-grid-div">
        {/* grid div 1 */}
        <div className="book-image-div">
          <img src="./images/Miss_Americana.jpg" alt="Book Cover" />
        </div>
        {/* grid div 2 */}
        <div className="book-info-div">
          <div className="bookname-display">
            <span id="bookTitle">{book.bookName}</span>
          </div>
          <div className="authorname-display">
            <label id="authorName">{book.bookAuthor}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  return (
    <div className="container">
      <div className="start-container-div">
        <div className="start-title-div">
          <label className="main-title-logo">BookShelf Depot</label>
        </div>
        <div className="search-box">
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
          />
        </div>
        <div className="signup-button-main-div">
          <div id="signup-link">
            <Link to="/signup">Signup</Link>
          </div>
          <div>
            <i className="fas fa-shopping-cart shopping-bag-icon"></i>
          </div>
        </div>
      </div>
      <div className="front-image-div">
        <img src="./images/Cart-image.jpeg" alt="" />
        <div className="image-text-cart">Your Cart</div>
      </div>
      <div className="cart-items">
        <AddToCartComponent />
      </div>
    </div>
  );
}
export default Cart;
