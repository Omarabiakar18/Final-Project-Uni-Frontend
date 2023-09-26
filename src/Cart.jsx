import { Link } from "react-router-dom";
import "./User.css";
import { postData, getData } from "./utils";
import React, { useEffect, useState } from "react";
import { Pinwheel } from "@uiball/loaders";
import Header from "./Header";

function Loading() {
  return <Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Book({ item, setBookList }) {
  const itemID = item._id;
  const book = item.bookInfo;
  const quantity = item.bookQuantity;

  const [quantityValue, setQuantity] = useState(quantity);

  function validNumber(text) {
    if (text === "") {
      setQuantity(null);
    } else {
      let num = parseInt(text);
      num = Number.isNaN(num) ? 0 : num;
      num = num < 1 ? 1 : num;
      setQuantity(num);
    }
  }

  async function removeBook() {
    const url = `/api/users/removeFromCart`;

    const email = localStorage.getItem("email");
    if (email === null) {
      console.error("Error: Email not found in localStorage.");
      alert("You need to sign up or login to continue");
      return;
    }

    const sendData = {
      email,
      itemID,
    };

    const [data, error] = await postData(url, sendData);

    if (error) {
      alert(`Error Occured: ${error}`);
      setQuantity(quantity);
    } else {
      alert(data.message);
      setBookList((list) => list.filter((value) => value["_id"] !== itemID));
    }
  }

  async function updateBook() {
    const url = `/api/users/updateQuantity`;

    const email = localStorage.getItem("email");
    if (email === null) {
      console.error("Error: Email not found in localStorage.");
      alert("You need to sign up or login to continue");
      return;
    }
    if (quantityValue === null) {
      alert("Enter a quantity!!");
      return;
    }

    const sendData = {
      email,
      bookID: book.bookID,
      bookQuantity: quantityValue,
    };

    const [data, error] = await postData(url, sendData);

    if (error) {
      alert(`Error Occured: ${error}`);
      setQuantity(quantity);
    } else {
      alert(data.message);
      setBookList((list) => {
        const index = list.findIndex((value) => value["_id"] === itemID);
        list[index].bookQuantity = data.data.bookQuantity;
        return [...list];
      });
    }
  }

  //console.log(item);
  const formatPrice = book.bookFormat.find(
    (bF) => bF.format === item.formatBook
  ).price;

  return (
    <div className="image-div">
      <div id="book-grid-div">
        {/* grid div 1 */}
        <div className="book-image-cart">
          <img src={book.bookCover} alt="Book Cover" />
        </div>
        {/* grid div 2 */}
        <div className="book-info-div">
          <div className="bookname-display">
            <label id="bookTitle">{book.bookName}</label>
          </div>
          <div className="authorname-display">
            <label id="authorName">{book.bookAuthor}</label>
          </div>
          <div className="format-cart">
            <span id="formatBook-text">Format: {item.formatBook}</span>
            <span id="formatBook">{formatPrice}$</span>
          </div>
          <div className="quantity-cart">
            <input
              type="text"
              inputMode="numeric"
              value={quantityValue === null ? "" : quantityValue}
              onChange={(ev) => validNumber(ev.target.value)}
            />
            <button id="update-cart-button" onClick={updateBook}>
              Update Item
            </button>
            <button id="remove-cart-button" onClick={removeBook}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookDisplayComponent({ setTotal }) {
  const [bookDisplay, setBookDisplay] = useState(null);
  const [errorMessage, setError] = useState(null);

  const url = `/api/users/itemsInCart`;

  const email = localStorage.getItem("email");
  const sendData = { email };

  useEffect(
    () => async () => {
      const [data, error] = await postData(url, sendData);
      if (error) {
        setError(error);
      } else {
        setBookDisplay(data.data);
        setTotal(data.totalAmount);
      }
    },
    []
  );

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (!bookDisplay) {
    return <Loading />;
  }
  //console.log(bookDisplay);
  return bookDisplay.map((item) => (
    <div key={item._id}>
      <Book setBookList={setBookDisplay} item={item} />
    </div>
  ));
}

function Cart() {
  const [totalData, setTotal] = useState(null);

  const email = localStorage.getItem("email");
  if (email === undefined) {
    console.error("Error: Email not found in localStorage.");
    alert("You need to sign up or login to continue");
    location.href = "/start";
  }
  return (
    <div className="container">
      <Header />
      <div className="front-image-div">
        <img src="https://ln.run/YM2u5" alt="Cart Image" />
        <div className="image-text-cart">Your Cart</div>
      </div>
      <div className="cart-items">
        <BookDisplayComponent setTotal={setTotal} />
      </div>
      <Link className="link-display" to="/checkout">
        <div id="checkout-cart-div">
          <button id="checkout-button-cart">
            <div className="checkout-button-data">
              <div className="label-checkout-1">Checkout</div>
              <div className="label-checkout-2"> ${totalData}</div>
            </div>
          </button>
        </div>
      </Link>
    </div>
  );
}
export default Cart;
