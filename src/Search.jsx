//HANDLE SUBMIT IN MAIN FUNCTION FOR SEARCH BUTTON

import { Link } from "react-router-dom";
import "./User.css";
import { getData, postData } from "./utils";
import { useEffect, useState, useRef } from "react";
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
        onClick={() => (location.href = `/displaybook?bookID=${book.bookID}`)}
      >
        {book.bookAuthor}
      </div>
    </div>
  );
}

function BookDisplayComponent({ sendData }) {
  const [bookDisplay, setBookDisplay] = useState(null);
  const [errorMessage, setError] = useState(null);

  const url = `/api/users/searchBook`;

  useEffect(
    () => async () => {
      console.log(url);
      const [data, error] = await postData(url, sendData);
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

  console.log(bookDisplay);

  return (
    <div>
      {bookDisplay.map((book) => (
        <Book book={book} />
      ))}
    </div>
  );
}

function Search() {
  const url = new URL(location.href);
  const query = url.searchParams.get("query");
  if (query === null) {
    location.href = "/start";
  }
  let filters;
  try {
    filters = JSON.parse(url.searchParams.get("filters"));
    if (!Array.isArray(filters)) {
      //secure
      filters = [];
    }
  } catch (error) {
    console.error(error);
    filters = [];
  }

  const sendData = { query, filters };

  return (
    <div className="contain">
      <Header />
      <div className="search-div">
        <BookDisplayComponent sendData={sendData} />
      </div>
    </div>
  );
}
export default Search;
