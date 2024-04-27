import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { kitchenLogin } from "../../actions";
import { Layout } from "../../components/Layout";
import "./signin.css";

/**
 * @author
 * @function Owner
 **/

export const Owner = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const kitchen = useSelector((state) => state.kitchen);
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    const kitchen = {
      email: email,
      password: password,
    };
    dispatch(kitchenLogin(kitchen));
    e.preventDefault();
  };

  if (kitchen.authenticate) {
    return <Navigate to={`/`} />;
  }

  return (
    <Layout>
      <body className="signin">
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form action="#" class="sign-in-form" onSubmit={handleSignIn}>
                <h2 className="title">Sign in To Your Dashboard</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Sign in" class="btn solid" />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Debitis, ex ratione. Aliquid!
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  style={{ textAlign: "center" }}
                >
                  <NavLink to={"/signup"}>Signup</NavLink>
                </button>
              </div>
              <img src="img/log.svg" class="image" alt="" />
            </div>
          </div>
        </div>

        <script src="app.js"></script>
      </body>
    </Layout>
  );
};
