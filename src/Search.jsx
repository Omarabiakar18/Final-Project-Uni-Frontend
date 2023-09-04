//HANDLE SUBMIT IN MAIN FUNCTION FOR SEARCH BUTTON

import { Link } from "react-router-dom";
import "./User.css";
import { getData } from "./utils";
import { useEffect, useState, useRef } from "react";
import { Pinwheel } from "@uiball/loaders";

function Loading() {
  return <Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Book({ book }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const bookID = new URL(location.href).searchParams.get("bookID");
    const url = `/api/users/addToCart/${bookID}`;

    const email = localStorage.getItem("email");
    if (email === null) {
      console.error("Error: Email not found in localStorage.");
      alert("You need to sign up or login to continue");
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
        <img
          src={book.bookCover}
          alt="Book Cover"
          onClick={() => (location.href = `/displaybook?bookID=${book.bookID}`)}
        />
      </div>
      <div className="book-info-div">
        <div className="grid-div-start">
          <form onSubmit={handleSubmit}>
            <div
              className="bookname-display"
              onClick={() =>
                (location.href = `/displaybook?bookID=${book.bookID}`)
              }
            >
              <span id="bookTitle">{book.bookName}</span>
            </div>
            <div
              className="authorname-display"
              onClick={() =>
                (location.href = `/displaybook?bookID=${book.bookID}`)
              }
            >
              <label id="authorName">by {book.bookAuthor}</label>
            </div>

            <div
              className="price-display"
              onClick={() =>
                (location.href = `/displaybook?bookID=${book.bookID}`)
              }
            >
              <label id="priceBook-text">Price </label>
              <span id="priceBook">{book.bookPrice}$</span>
            </div>
            <div
              className="quantity-display"
              onClick={() =>
                (location.href = `/displaybook?bookID=${book.bookID}`)
              }
            >
              <span id="quantity-title-display">Quantity:</span>
              <input type="number" ref={bookQuantity} />
            </div>
            <div id="buttons-display">
              <button id="add-to-cart-button">
                <i className="fas fa-shopping-cart shopping-bag-icon-2"></i>
                Add to Cart
              </button>
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
  const url = `/api/users/displayBook/`;

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

function Search() {
  const query = new URL(location.href).searchParams.get("query");
  console.log(query);
  async function handleSubmit(event) {
    event.preventDefault();

    const url = `/api/users/searchBook`;

    const sendData = { query };
    console.log(sendData);

    const [data, error] = await postData(url, sendData);
    console.log(data);

    if (error) {
      alert(`Error Occured: ${error}`);
    }
  }

  return (
    <div className="contain">
      <form onSubmit={handleSubmit}>
        <div className="start-container-div">
          <Link className="link-display" to="/start">
            <div className="start-title-div">
              <label className="main-title-logo">BookShelf Depot</label>
            </div>
          </Link>
          <div className="search-box">
            <div onClick={() => (location.href = `/search?query=${query}`)}>
              <button className="btn-search">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
              ref={query}
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

        <div className="search-div">
          <BookDisplayComponent />
        </div>
      </form>
    </div>
  );
}
export default Search;
