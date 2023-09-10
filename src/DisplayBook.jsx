import { Link } from "react-router-dom";
import "./User.css";
import { getData, postData } from "./utils";
import React, { useEffect, useState, useRef } from "react";
import { Pinwheel } from "@uiball/loaders";
import Header from "./Header";

function Loading() {
  return <Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Book({ book }) {
  const bookQuantity = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const bookID = new URL(location.href).searchParams.get("bookID");
    const url = `/api/users/addToCart/${bookID}`;

    const email = localStorage.getItem("email");
    if (email === null) {
      console.error("Error: Email not found in localStorage.");
      alert("You need to sign up or login to continue");
      return;
    }

    const sendData = {
      email,
      bookID,
      bookQuantity: bookQuantity.current.value,
    };
    console.log(sendData);

    const [data, error] = await postData(url, sendData);
    console.log(data);

    if (error) {
      alert(`Error Occured: ${error}`);
    } else {
      alert("Book added to cart!!");
    }
  }

  return (
    <div id="book-grid-div">
      <div className="book-image-div">
        <img src={book.bookCover} alt="Book Cover" />
      </div>
      <div className="book-info-div">
        <div className="grid-div-start">
          <form onSubmit={handleSubmit}>
            <div className="bookname-display">
              <span id="bookTitle">{book.bookName}</span>
            </div>
            <div className="authorname-display">
              <label id="authorName">by {book.bookAuthor}</label>
            </div>
            <div className="price-display">
              <span id="priceBook-text">Price </span>
              <span id="priceBook">{book.bookPrice}$</span>
            </div>
            <div className="quantity-display">
              <span id="quantity-title-display">Quantity:</span>
              <input type="number" ref={bookQuantity} />
            </div>
            <div id="buttons-display">
              <button id="add-to-cart-button">
                <i className="fas fa-shopping-cart shopping-bag-icon-2"></i>
                Add to Cart
              </button>
            </div>
            <div className="description-display">
              <div className="discription-title">
                <label id="description">Description</label>
              </div>
              <div className="discription-content">
                <span>{book.bookDescription}</span>
              </div>
            </div>
            <div className="ratings-reviews">
              <span className="ratings-reviews-label">Ratings and Reviews</span>
              <br />
              <div className="rating" data-rating="0">
                <span className="star" data-value="1">
                  &#9733;
                </span>
                <span className="star" data-value="2">
                  &#9733;
                </span>
                <span className="star" data-value="3">
                  &#9733;
                </span>
                <span className="star" data-value="4">
                  &#9733;
                </span>
                <span className="star" data-value="5">
                  &#9733;
                </span>
              </div>
              <div className="reviews">
                <textarea cols="40" rows="5"></textarea>
              </div>
            </div>
          </form>
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
      <Header />
      <div className="display-book-div">
        <BookDisplayComponent />
      </div>
    </div>
  );
}
export default DisplayBook;
