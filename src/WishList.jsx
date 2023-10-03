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

function Book({ book, setList }) {
  async function handleremove() {
    const url = `/api/users/removeWishlist`;
    const bookID = book._id;
    const email = localStorage.getItem("email");
    if (email === undefined) {
      console.error("Error: Email not found in localStorage.");
      alert("You need to sign up or login to continue");
      return;
    }

    const sendData = {
      email,
      bookID,
    };
    console.log(sendData);

    const [data, error] = await postData(url, sendData);

    if (error) {
      alert(`Error Occured: ${error}`);
    } else {
      alert(data.message);
      setList((list) => list.filter((value) => value["_id"] !== bookID));
    }
  }

  return (
    <div className="grid-div-wishlist">
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
      <div className="button-wishlist">
        <button
          type="button"
          id="remove-wishlist-button"
          onClick={handleremove}
        >
          X
        </button>
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

  if (list == "") {
    return <div id="wishlist-data-div">Your WishList is empty!!</div>;
  }

  return (
    <div>
      {list.map((book, index) => (
        <Book book={book} setList={setList} key={index} />
      ))}
    </div>
  );
}

function WishList() {
  const email = localStorage.getItem("email");
  if (email === undefined) {
    console.error("Error: Email not found in localStorage.");
    alert("You need to sign up or login to continue");
    location.href = "/start";
  }

  return (
    <div className="wishlist-container">
      <Header />
      <div className="front-image-div">
        <img src="https://ln.run/OjzKM" alt="Cart Image" />
        <div className="image-text-wishlist">WishList</div>
      </div>

      <div className="display-wishlist">
        <BookList />
      </div>
    </div>
  );
}
export default WishList;
