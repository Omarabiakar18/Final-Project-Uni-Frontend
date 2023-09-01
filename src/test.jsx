import { Link } from "react-router-dom";
import "./User.css";
import { getData, postData } from "./utils";
import React, { useEffect, useState, useRef } from "react";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Book({ book }) {
  const formData = useRef({});
  return (
    <div className="grid-div-start">
      <div className="bookname-display">
        <span id="bookTitle">{book.bookName}</span>
      </div>
      <div className="authorname-display">
        <label id="authorName">{book.bookAuthor}</label>
      </div>
      <div className="quantity-display">
        <span id="quantity-title-display">Quantity:</span>
        <input
          type="number"
          ref={(elt) =>
            (formData.current = {
              email: () => elt.value,
              ...formData.current,
            })
          }
        />
      </div>
      <div id="buttons-display">
        <button id="add-to-cart-button" onClick={AddToCartComponent}>
          <i className="fas fa-shopping-cart shopping-bag-icon-2"></i>
          Add to Cart
        </button>
      </div>
      <div className="description-display">
        <div className="discription-title">
          <label id="description">Description:</label>
        </div>
        <div className="discription">
          <span>{book.bookDescription}</span>
        </div>
      </div>
    </div>
  );
}

function BookDisplayComponent() {
  const [bookDisplay, setBookDisplay] = useState(null);
  const [errorMessage, setError] = useState(null);

  const bookID = new URL(location.href).searchParams.get("bookID");
  const url = `/api/users/displayBook/${bookID}`;

  useEffect(
    () => async () => {
      console.log(url);
      const [data, error] = await getData(url);
      console.log(data);
      if (error) {
        setError(error);
      } else {
        setBookDisplay(data.data);
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

  return <Book book={bookDisplay} />;
}
function AddToCartComponent() {
  try {
    const formData = useRef();
    async function handleSubmit(event) {
      const bookID = new URL(location.href).searchParams.get("bookID");
      const url = `/api/users/addToCart/${bookID}`;

      const email = localStorage.getItem("email");
      if (email === null) {
        console.error("Error: Data not found in localStorage.");
        alert("You need to sign up or login to continue");
        location.href = "/login";
      }
      const sendData = { email, sendInputs };
      for (let key in formData.current) {
        sendInputs[key] = formData.current[key]();
      }
      const [data, error] = await postData(url, sendData);
      console.log(data);

      if (error) {
        alert(`Error Occured: ${error}`);
        localStorage.clear();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
function DisplayBook() {
  useEffect(() => {
    const bookIDParam = new URL(location.href).searchParams.get("bookID");
    if (!bookIDParam) {
      location.href = "/start";
      return;
    }
    const bookID = +bookIDParam;
    if (Number.isNaN(bookID)) {
      location.href = "/start";
      return;
    }
    console.log(bookID);
  }, []);

  return (
    <div className="container">
      <form action=""></form>
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
            <Link to="/cart">
              <i className="fas fa-shopping-cart shopping-bag-icon"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="display-book-div">
        <div id="book-grid-div">
          <div className="book-image-div">
            <img src="./images/Miss_Americana.jpg" alt="Book Cover" />
          </div>
          <div className="book-info-div">
            <BookDisplayComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DisplayBook;
