//Error when photo removed

import { Link } from "react-router-dom";
import "./User.css";
import { getData, postData } from "./utils";
import { useEffect, useState, useRef } from "react";
import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

function AddBook() {
  const formData = useRef({});

  const email = localStorage.getItem("email");
  if (email === null) {
    console.error("Error: Email not found in localStorage.");
    alert("You need to sign up or login to continue");
  }
  const fullName = localStorage.getItem("fullName");
  const url = `/api/users/addBook`;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!imageUrl) {
      alert("Upload Book Cover to continue.");
      return;
    }
    const sendData = { email, bookCover: imageUrl };
    for (let key in formData.current) {
      sendData[key] = formData.current[key]();
    }
    console.log(sendData);

    const [data, error] = await postData(url, sendData);
    console.log(data);
    if (error) {
      alert(`Error Occured: ${error}`);
    } else {
      alert("Book added successfully!");
    }
  }

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const uploadImage = async () => {
    try {
      if (imageUpload == null) {
        return;
      }
      const imageRef = ref(storage, `BookCovers/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = async () => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      setImageUrl(null);
    } catch (error) {
      console.error(error);
    }
  };
  const genres = localStorage.getItem("bookGenre");
  if (!genres) {
    // redirect
    alert("Going to homepage so continue");
    location.href = "/start";
  }
  const bookGenre = JSON.parse(genres);
  return (
    <div className="container">
      <div className="start-container-div">
        <Link className="link-display" to="/start">
          <div className="start-title-div">
            <label className="main-title-logo">BookShelf Depot</label>
          </div>
        </Link>
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
              <i className="fas fa-shopping-cart shopping-bag-icon"></i>
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="front-image-div">
          <img src="./images/addBook1.jpg" alt="" />
          <div className="image-text">Add your books</div>
        </div>
        <div className="add-book-container">
          {imageUrl == null ? (
            <div className="book-image">
              <div className="file-input-container">
                <label className="file-label">
                  Choose File
                  <input
                    type="file"
                    className="file-input"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                </label>
              </div>

              <button
                id="upload-image-addbook"
                type="button"
                onClick={uploadImage}
              >
                Upload Image
              </button>
            </div>
          ) : (
            <div className="bookCover-addbook">
              <img src={imageUrl} alt="Book Cover" />
              <button
                id="remove-image-addbook"
                type="button"
                onClick={removeImage}
              >
                Remove photo
              </button>
            </div>
          )}
          <div className="addbook-name">
            <div>Book Name:</div>
            <div>
              <input
                type="text"
                placeholder="Enter the book name here"
                ref={(elt) =>
                  (formData.current = {
                    bookName: () => elt.value,
                    ...formData.current,
                  })
                }
              />
            </div>
          </div>
          <div className="addbook-authour-name">
            <div>Author Name:</div>
            <div>
              <input
                type="text"
                placeholder="Enter the author's name here"
                ref={(elt) =>
                  (formData.current = {
                    bookAuthor: () => elt.value,
                    ...formData.current,
                  })
                }
              />
            </div>
          </div>
          <div className="addbook-book-genre">
            <div>Book Genre: </div>
            <div>
              <select
                size={5}
                multiple={true}
                ref={(elt) =>
                  (formData.current = {
                    bookGenre: () =>
                      [...elt.selectedOptions].map((option) => option.value),
                    ...formData.current,
                  })
                }
              >
                {bookGenre.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="addbook-authour-email">
            <div>Author Email</div>
            <div>
              <input
                type="text"
                placeholder="Enter the author's email here"
                ref={(elt) =>
                  (formData.current = {
                    emailAuthor: () => elt.value,
                    ...formData.current,
                  })
                }
              />
            </div>
          </div>
          <div className="addbook-price">
            <div>Book Price:</div>
            <div>
              <input
                type="number"
                placeholder="Enter the price here (in $)"
                ref={(elt) =>
                  (formData.current = {
                    bookPrice: () => elt.value,
                    ...formData.current,
                  })
                }
              />
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
                ref={(elt) =>
                  (formData.current = {
                    bookDescription: () => elt.value,
                    ...formData.current,
                  })
                }
              ></textarea>
            </div>
            <button>Add Book</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddBook;
