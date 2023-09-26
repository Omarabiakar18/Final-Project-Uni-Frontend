import { Link } from "react-router-dom";
import "./User.css";
import { useEffect, useRef, useState } from "react";

function FilterOptions({
  showMenu,
  setShowMenu,
  selectedGenre,
  setSelectedGenre,
  bookGenre,
}) {
  const dropdownRef = useRef(null);

  // Add a useEffect hook to listen for clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close it
        setShowMenu(false);
      }
    }

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div className="filter-options">
      {showMenu && (
        <div className="filter-options-dropdown" ref={dropdownRef}>
          {bookGenre.map((genre, index) => (
            <button
              key={index}
              className={`filter-choice ${
                selectedGenre[index] ? "selected" : ""
              }`}
              onClick={() => {
                selectedGenre[index] = !selectedGenre[index];
                setSelectedGenre([...selectedGenre]);
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchBox() {
  const query = useRef();
  const bookGenre = JSON.parse(localStorage.getItem("bookGenre"));
  const [showMenu, setShowMenu] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(
    bookGenre.map(() => false)
  );

  function handleSearch() {
    const selectedFilters = bookGenre.filter(
      //if true include in array...if false dont
      (_, index) => selectedGenre[index]
    );

    const url = new URL(`${location.origin}/search`);
    url.searchParams.set("query", query.current.value);
    url.searchParams.set("filters", JSON.stringify(selectedFilters));

    location.href = url.href;
  }
  return (
    <div className="search-box">
      <FilterOptions
        {...{
          showMenu,
          setShowMenu,
          selectedGenre,
          setSelectedGenre,
          bookGenre,
        }}
      />
      <div onClick={handleSearch}>
        <button className="btn-search">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <input
        type="text"
        className="input-search"
        placeholder="Search by Book, Author or Filters"
        ref={query}
        onClick={() => setShowMenu((current) => !current)}
      />
    </div>
  );
}

function DropdownMenu() {
  const fullName = localStorage.getItem("fullName");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  function logOut() {
    localStorage.clear();
    location.href = "/login";
  }

  function addBook() {
    location.href = "/addbook";
  }
  function wishlist() {
    location.href = "/wishlist";
  }
  function myLibrary() {
    location.href = "/myLibrary";
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div
      id="my-dropdown"
      className={`dropdown-container${isDropdownOpen ? " open" : ""}`}
      ref={dropdownRef} // Assign the ref to the dropdown container
    >
      <div
        id="dropdown-button"
        className="dropdown-button"
        onClick={toggleDropdown}
      >
        <label id="dropdown-label" className="label">
          Hello {fullName}
        </label>
        <i className="fas fa-caret-down arrow"></i>
      </div>
      {isDropdownOpen && (
        <div id="dropdown-popup" className="dropdown-popup">
          <ul>
            <li onClick={() => handleOptionClick("AddBook")}>
              <button id="addbook-popup" onClick={addBook}>
                Add Book
              </button>
            </li>
            <li onClick={() => handleOptionClick("WishList")}>
              <button id="addbook-popup" onClick={wishlist}>
                Wish List
              </button>
            </li>
            <li onClick={() => handleOptionClick("MyLibrary")}>
              <button id="addbook-popup" onClick={myLibrary}>
                My Library
              </button>
            </li>
            <li onClick={() => handleOptionClick("LogOut")}>
              <button id="logout-popup" onClick={logOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="start-container-div">
      <Link className="link-display" to="/start">
        <div className="start-title-div">
          <label className="main-title-logo">BookShelf Depot</label>
          <i className="fas fa-home icon-container"></i>
        </div>
      </Link>
      <SearchBox />
      <div className="signup-button-main-div">
        {localStorage.getItem("email") == null ? (
          <div id="signup-link">
            <Link className="signup-link" to="/signup">
              SignUp/LogIn
            </Link>
          </div>
        ) : (
          <div className="login-info-header">
            <DropdownMenu />
          </div>
        )}
        <div>
          <Link to="/cart">
            <i className="fas fa-shopping-cart shopping-bag-icon"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Header;
