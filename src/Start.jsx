import { Link } from "react-router-dom";
import "./User.css";
import { getData } from "./utils";
import { useEffect, useRef, useState } from "react";
import { Pinwheel } from "@uiball/loaders";

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
        onClick={() => (location.href = `/displaybook?bookID=${book.bookID}`)}
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
  console.log(list);
  return (
    <div>
      {list.map((book, index) => (
        <Book book={book} key={book.bookID} />
      ))}
    </div>
  );
}

function Start() {
  const query = useRef();

  useEffect(
    () => async () => {
      const [genres, error] = await getData("/bookGenres");
      if (error) {
        alert("Genres didn't load");
      } else {
        localStorage.setItem("bookGenre", JSON.stringify(genres));
      }
    },
    []
  );

  return (
    <div className="contain">
      <div className="start-container-div">
        <Link className="link-display" to="/start">
          <div className="start-title-div">
            <label className="main-title-logo">BookShelf Depot</label>
            <i className="fas fa-home icon-container"></i>
          </div>
        </Link>
        <div className="search-box">
          <div
            onClick={() =>
              (location.href = `/search?query=${query.current.value}`)
            }
          >
            <button className="btn-search">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <input
            type="text"
            className="input-search"
            placeholder="Search by Book, Author or Filters"
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
