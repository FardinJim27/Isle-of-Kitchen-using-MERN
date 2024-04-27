import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./containers/home";
import { Signup } from "./containers/signup";
import { Signin } from "./containers/signin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, isOwnerLoggedIn } from "./actions";
import { Profile } from "./containers/profile";
import { Owner } from "./containers/signin/owner";
import { Cart } from "./containers/cart";
import { Kitchens } from "./containers/kitchen";
import { KitchenDeatils } from "./containers/kitchen/details";

function App() {
  const auth = useSelector((state) => state.auth);
  const kitchen = useSelector((state) => state.kitchen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (!kitchen.authenticate) {
      dispatch(isOwnerLoggedIn);
    }
  });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about-us" exact element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/kitchen/signin" exact element={<Owner />} />
          <Route path="/dashboard" exact element={<Profile />} />
          <Route path="/kitchen" exact element={<Kitchens />} />
          <Route path="/kitchen/details" exact element={<KitchenDeatils />} />
          <Route path="/cart" exact element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
