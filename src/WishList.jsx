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

function Book({ book }) {
  return (
    <div className="grid-div-start">
      <div className="bookCover-start">
        <img
          src={book.bookCover}
          alt="Book Cover"
          onClick={() => (location.href = `/displaybook?bookID=${book.bookID}`)}
        />
      </div>
      <div
        className="bookName-start"
        onClick={() => (location.href = `/displaybook?bookID=${book.bookID}`)}
      >
        {book.bookName}
      </div>

      <div
        className="bookAuthor-start"
        onClick={() =>
          (location.href = `/search?query=${book.bookAuthor}&filters=[]`)
        }
      >
        {book.bookAuthor}
      </div>
    </div>
  );
}

function BookList() {
  const [list, setList] = useState(null);
  const [errorMessage, setError] = useState(null);

  const url = `/api/users/displayWishlist`;
  const email = localStorage.getItem("email");
  const sendData = { email };

  useEffect(
    () => async () => {
      const [data, error] = await postData(url, sendData);
      if (error) {
        setError(error);
      } else {
        setList(data.data);
      }
    },
    []
  );

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (!list) {
    return <Loading />;
  }
  console.log(list);
  return (
    <div>
      {list.map((book, index) => (
        <Book book={book} key={book.bookID} />
      ))}
    </div>
  );
}

function WishList() {
  return (
    <div className="wishlist-container">
      <Header />
      <div className="front-image-div">
        <img src="https://ln.run/YM2u5" alt="Cart Image" />
        <div className="image-text-cart">WishList</div>
      </div>
      <div className="display-wishlist">
        <BookList />
      </div>
    </div>
  );
}
export default WishList;
