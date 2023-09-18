import SignUp from "./SignUp";
import LogIn from "./Login";
import { Route, Routes, Navigate } from "react-router-dom";
import Start from "./Start";
import Cart from "./Cart";
import AddBook from "./AddBook";
import DisplayBook from "./DisplayBook";
import ForgotPass from "./ForgotPass";
import ResetPassword from "./ResetPassword";
import Search from "./Search";
import Checkout from "./Checkout";
import WishList from "./WishList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/start" element={<Start />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/displaybook" element={<DisplayBook />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}
export default App;
