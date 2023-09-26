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
  return (
    <div className="grid-div-wishlist shelf-border">
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

  const url = `/api/users/displayLibrary`;
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
  const shelves = [];
  for (let i = 0; i < list.length; i += 5) {
    const shelfBooks = list.slice(i, i + 5);
    shelves.push(shelfBooks);
  }

  return (
    <div>
      {shelves.map((shelf, shelfIndex) => (
        <div key={shelfIndex} className="shelf">
          {shelf.map((book, index) => (
            <div key={index} className="book-container">
              <Book book={book} setList={setList} />
            </div>
          ))}
          {shelfIndex < shelves.length - 1 && (
            <img
              key={`image-${shelfIndex}`}
              src="https://firebasestorage.googleapis.com/v0/b/bookshelf-depot-4594f.appspot.com/o/Main-Images%2FShelf.jpg?alt=media&token=8fc8069f-924e-4bc7-a90f-575a7bf24cd4"
              alt=""
              className="underline-image"
            />
          )}
        </div>
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
        <img
          src="https://firebasestorage.googleapis.com/v0/b/bookshelf-depot-4594f.appspot.com/o/Main-Images%2FMyLibrary.jpeg?alt=media&token=a2feee92-2d2f-4890-b54f-ecb348cb3d4f"
          alt="Cart Image"
        />
        <div className="image-text-library">My Library</div>
      </div>

      <div className="display-wishlist">
        <BookList />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/bookshelf-depot-4594f.appspot.com/o/Main-Images%2FShelf.jpg?alt=media&token=8fc8069f-924e-4bc7-a90f-575a7bf24cd4"
          alt=""
          className="underline-image"
        />
      </div>
    </div>
  );
}
export default WishList;
