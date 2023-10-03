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

function FormatsDisplay({ book }) {
  return (
    <div id="container-format-library">
      <button type="button" className="format-buttons selected">
        <label>{book.formatBook} </label>
        <label>{book.bookQuantity} copies</label>
      </button>
    </div>
  );
}

function Book({ book }) {
  return (
    <div id="book-grid-div">
      <div className="book-image-div">
        <img src={book.bookInfo.bookCover} alt="Book Cover" />
      </div>
      <div className="book-info-div">
        <div className="grid-div-start">
          <form>
            <div className="bookname-display">
              <span id="bookTitle">{book.bookInfo.bookName}</span>
            </div>
            <div
              className="authorname-display"
              onClick={() =>
                (location.href = `/authorinfo?query=${book.bookAuthor}&filters=[]`)
              }
            >
              <label id="authorName">by {book.bookInfo.bookAuthor}</label>
            </div>
            <div className="format-display">
              <div id="format-text">Purchased Formats: </div>
              <div id="format-library-display">
                <FormatsDisplay book={book} />
              </div>
            </div>
            <div className="genre-div">
              <label id="bookgenre-label-display">
                Genre:{" "}
                {book.bookInfo.bookGenre.map((genre, index) => (
                  <span key={index} className="genre-item">
                    {genre}
                  </span>
                ))}
              </label>
            </div>
            <div className="quantity-display">
              <span id="quantity-title-display">Quantity:</span>
              <span>{book.bookQuantity}</span>
            </div>
            <div className="description-display">
              <div className="discription-title">
                <label id="description">Description</label>
              </div>
              <div className="discription-content">
                <span>{book.bookInfo.bookDescription}</span>
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
  const url = `/api/users/displayLibraryBook/${bookID}`;

  useEffect(
    () => async () => {
      const [data, error] = await getData(url);

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
  console.log(bookDisplay);

  return <Book book={bookDisplay} />;
}

function DisplayBook() {
  useEffect(() => {
    const bookID = new URL(location.href).searchParams.get("bookID");
    if (!bookID) {
      location.href = "/start";
      return;
    }
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
