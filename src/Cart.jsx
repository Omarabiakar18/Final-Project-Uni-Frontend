import { Link } from "react-router-dom";
import "./User.css";

function Cart() {
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
            <i class="fas fa-shopping-bag shopping-bag-icon"></i>
          </div>
        </div>
      </div>
      <div className="front-image-div">
        <img src="./images/Cart-image.jpeg" alt="" />
        <div className="image-text-cart">Your Cart</div>
      </div>
    </div>
  );
}
export default Cart;
