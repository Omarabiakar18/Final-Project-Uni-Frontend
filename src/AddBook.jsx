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
import Header from "./Header";
import { Pinwheel } from "@uiball/loaders";

function Loading() {
  return <Pinwheel size={60} lineWeight={3.5} speed={1} color="black" />;
}

function ErrorMessage({ message }) {
  return <h2>Error: {message}</h2>;
}

function Formats({ bookFormat, setFormat }) {
  const [priceText, setText] = useState("");

  useEffect(() => {
    let price = parseFloat(priceText);
    price = Number.isNaN(price) ? null : price;
    setFormat((table) => {
      table[bookFormat] = price;
      return { ...table };
    });
  }, [priceText]);

  function handleChange(text) {
    // ^: start  \d: digit. *: 0 or more. (?:) : none capturing group ? : 0 or 1. $ : end
    if (/^\d*(?:\.\d*)?$/.test(text)) {
      setText(text);
    }
  }

  return (
    <div className="format_book">
      <div className="format-type">
        <label id="type-book">{`${bookFormat}: `}</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder={`Enter the price of the ${bookFormat} version`}
          value={priceText}
          onChange={(ev) => handleChange(ev.target.value)}
        />
      </div>
    </div>
  );
}

function FormatController({ formData }) {
  const [errorMessage, setError] = useState(null);
  const [formatTable, setFormat] = useState(null);

  formData.current.bookFormat = () => {
    const tmp = [];
    for (const [format, price] of Object.entries(formatTable)) {
      if (price !== null) {
        tmp.push({ format, price });
      }
    }
    return tmp;
  };

  useEffect(
    () => async () => {
      const [formats, error] = await getData("/bookFormat");
      if (error) {
        setError(error);
      } else {
        localStorage.setItem("bookFormat", JSON.stringify(formats));
        const table = {};
        formats.forEach((format) => {
          table[format] = null;
        });
        setFormat(table);
      }
    },
    []
  );

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (!formatTable) {
    return <Loading />;
  }

  return (
    <div>
      <div className="format-label-addbook">Formats:</div>
      <div className="format-label-addbook">
        Note: Leave Book Price Empty If Not Available
      </div>

      {Object.keys(formatTable).map((bookFormat) => (
        <Formats
          setFormat={setFormat}
          bookFormat={bookFormat}
          key={bookFormat}
        />
      ))}
    </div>
  );
}

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

    const [data, error] = await postData(url, sendData);
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
    alert("Going to homepage to continue");
    location.href = "/start";
  }
  const bookGenre = JSON.parse(genres);
  return (
    <div className="container">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="front-image-div">
          <img src="https://cutt.ly/qwzQc8Os" alt="Add Book Image" />
          <div className="image-text">Add your books</div>
        </div>
        <div className="add-book-container">
          {imageUrl == null ? (
            <div className="book-image">
              <div className="file-input-container">
                <label id="note-addbook">
                  Note: Don't forget before adding a book to choose and upload
                  an image using these buttons
                </label>
                <br />
                <br />
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
              <br />
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
          <FormatController formData={formData} />
          <div className="content-addbook">
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
              <button id="addbook-button">Add Book</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddBook;
