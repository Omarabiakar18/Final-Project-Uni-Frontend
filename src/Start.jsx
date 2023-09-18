import { Link } from "react-router-dom";
import "./User.css";
import { getData } from "./utils";
import { useEffect, useRef, useState } from "react";
import { Pinwheel } from "@uiball/loaders";
import Header from "./Header";

function Loading() {
  return <Pinwheel size={60} lineWeight={3.5} speed={1} color="black" />;
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

function BookList({ endPoint }) {
  const [list, setList] = useState(null);
  const [errorMessage, setError] = useState(null);

  useEffect(
    () => async () => {
      const [data, error] = await getData(endPoint);
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
  return (
    <div>
      {list.map((book, index) => (
        <Book book={book} key={book.bookID} />
      ))}
    </div>
  );
}

function Start() {
  const [bookGenreLoaded, setBookGenre] = useState(false);

  useEffect(
    () => async () => {
      const [genres, error] = await getData("/bookGenres");
      if (error) {
        alert("Genres didn't load");
      } else {
        localStorage.setItem("bookGenre", JSON.stringify(genres));
        setBookGenre(true);
      }
    },
    []
  );

  const fullName = localStorage.getItem("fullName");

  return (
    <div className="contain">
      {bookGenreLoaded && <Header />}
      <div className="front-image-div">
        <img src="https://ln.run/IKqlt" alt="start-image" />
        <div className="image-text">Welcome To The BookShelf Depot</div>
      </div>
      <div className="section-one-new-releases">
        <div className="section-one-title">New Releases</div>
        <div className="section-one-subtitle">by bookshelfDepot.com</div>
        <div className="books-new-releases">
          <BookList endPoint="/api/users/newRelease" />
        </div>
      </div>
      <div className="section-two-most-popular">
        <div className="section-two-title">Most Popular</div>
        <div className="section-two-subtitle">by bookshelfDepot.com</div>
        <div className="books-most-popular">
          <BookList endPoint="/api/users/popularnow" />
        </div>
      </div>
      <div className="section-three-discounts">
        <div className="section-three-title">Discounts</div>
        <div className="section-three-subtitle">by bookshelfDepot.com</div>
        <div className="books-discounts">
          <BookList endPoint="" />
        </div>
      </div>
    </div>
  );
}
export default Start;
