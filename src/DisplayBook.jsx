import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./User.css";
import { getData } from "./utils";
import { useEffect, useState } from "react";
import { postData } from "./utils";

const SERVER = import.meta.env.VITE_BACKEND;

function DisplayBook() {
  const url = `${SERVER}/api/users/addToCart`;
  //   const formData = useRef({});

  async function handleSubmit(event) {
    event.preventDefault();
    const sendData = {};
    for (let key in formData.current) {
      sendData[key] = formData.current[key]();
    }
    const response = await postData(url, sendData);
    const json = await response.json();
    if (response.status >= 400) {
      alert(`Error Occured: ${json.message}`);
    } else {
      localStorage.setItem("fullName", json.data.user.fullName);
      alert(`${json.message}`);
    }
  }
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
      {/* Main div */}
      <div className="display-book-div">
        <div id="book-grid-div">
          {/* grid div 1 */}
          <div className="book-image-div">
            <img src="./images/Miss_Americana.jpg" alt="Book Cover" />
          </div>
          {/* grid div 2 */}
          <div className="book-info-div">
            <div className="bookname-display">
              <span id="bookTitle">Miss Americana</span>
            </div>
            <div className="authorname-display">
              <label id="authorName">Taylor Swift</label>
            </div>
            <div id="buttons-display">
              <button id="add-to-cart-button">
                <i className="fas fa-shopping-cart shopping-bag-icon-2"></i>Add
                to Cart
              </button>
            </div>
            <div className="description-display">
              <div className="discription-title">
                <label id="description">Description:</label>
              </div>
              <div className="discription">
                <span>
                  Miss Americana (also known as Taylor Swift: Miss Americana) is
                  a 2020 American documentary film that follows
                  singer-songwriter Taylor Swift and her life over the course of
                  several years of her career. It was directed by Lana Wilson,
                  produced by Tremolo Productions, and released to Netflix and
                  select theaters on January 31, 2020. The film is titled after
                  "Miss Americana & the Heartbreak Prince", a 2019 song by
                  Swift. The film has been described as an unvarnished and
                  emotionally revealing look at Swift, during a metamorphic
                  phase in her life, as she learns to accept her role as not
                  only a singer-songwriter and entertainer, but as an
                  influential woman "harnessing the full power of her voice." It
                  is set in the time period spanning from Swift's Reputation
                  Stadium Tour (2018) to the release roll-out of her seventh
                  studio album Lover (2019), dotted with flashback video-clips
                  portraying several undisclosed events of her life and career.
                  Premiering at the opening night of 2020 Sundance Film Festival
                  on January 23, 2020, Miss Americana received widespread
                  critical acclaim centering on its emotion, intimacy, and
                  vulnerable topics. Reviews complimented Swift's honesty and
                  personality. Accompanying the film's release, "Only the
                  Young", a song by Swift featured in the end credits, was
                  released as a promotional single. Miss Americana was selected
                  by the National Board of Review as one of the five best
                  documentaries of 2020. Publications have named it amongst the
                  best Netflix films and biographical documentaries, and regard
                  it a pivotal moment for Swift's career.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DisplayBook;
