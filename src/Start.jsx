import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./User.css";
import { getData } from "./utils";
import { useEffect, useState } from "react";
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Book({ book }) {
  return <h1>{book.bookName}</h1>;
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
  const fullName = () => localStorage.getItem("fullName");
  return (
    <div className="contain">
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
              <i className="fas fa-shopping-bag shopping-bag-icon"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="front-image-div">
        <img src="./images/main-image.jpg" alt="" />
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
          <BookList endPoint="" />
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
