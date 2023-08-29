import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./User.css";
import { getData } from "./utils";
import { useEffect, useState } from "react";

// const [image, setimage] = useState("");

// const upload = () => {
//   if (image == null) {
//     return;
//   }
//   const imageref = storage
//     .ref("/images/${image.name")
//     .put(image)
//     .on("state_changeas", alert("success"), alert);
// };
function AddBook() {
  return (
    <div className="container">
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
        <img src="./images/addBook1.jpg" alt="" />
        <div className="image-text">Add your books</div>
      </div>
      <div className="add-book-container">
        <div className="book-image">
          <span>image here</span>
          <img src="" alt="" placeholder="Add a photo of your book" />
        </div>
        <div className="addbook-name">
          <div>Book Name:</div>
          <div>
            <input type="text" placeholder="Enter the book name here" />
          </div>
        </div>
        <div className="addbook-authour-name">
          <div>Author Name:</div>
          <div>
            <input type="text" placeholder="Enter the author's name here" />
          </div>
        </div>
        <div className="addbook-book-genre">
          <div>Book Genre: </div>
          <div>
            <input type="text" placeholder="Enter the author's name here" />
          </div>
        </div>
        <div className="addbook-authour-email">
          <div>Author Email</div>
          <div>
            <input type="text" placeholder="Enter the author's email here" />
          </div>
        </div>
        <div className="addbook-price">
          <div>Book Price:</div>
          <div>
            <input type="number" placeholder="Enter the price here (in $)" />
          </div>
        </div>
        <div className="addbook-description">
          <div>Book Description:</div>
          <div>
            <textarea
              id="userInput"
              rows="5"
              cols="50"
              placeholder="Describe your book here"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddBook;
