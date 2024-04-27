import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./style.css";

/**
 * @author
 * @function Header
 **/

export const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const kitchen = useSelector((state) => state.kitchen);

  console.log(kitchen);

  return (
    <Navbar
      style={{ fontSize: "15px" }}
      fixed="top"
      className="nav-main"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand className="main">
          <NavLink to="/">Get Started</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {/* {auth.authenticate ? loggedInUser() : nonLoggedInUser()} */}
          <Nav>
            <li className="home">
              <NavLink to="/">
                <b>Home</b>
              </NavLink>
            </li>
            <li className="about-us">
              <NavLink to="/about-us">
                <b>About Us</b>
              </NavLink>
            </li>

            {auth.authenticate &&
            auth.user !== null &&
            auth.user.role === "user" ? (
              <>
                <li className="signin">
                  <NavLink to="/kitchen">
                    <b>Kitchens</b>
                  </NavLink>
                </li>
                <li className="signin">
                  <NavLink to="/cart">
                    <b>Cart</b>
                  </NavLink>
                </li>
                <li className="signin">
                  <NavLink to="/dashboard">
                    <b>Dashboard</b>
                  </NavLink>
                </li>
              </>
            ) : auth.authenticate ? (
              <li className="signin">
                <NavLink to="/dashboard">
                  <b>Dashboard</b>
                </NavLink>
              </li>
            ) : (
              <>
                <li className="signup">
                  <NavLink to="/signup">
                    <b>Signup</b>
                  </NavLink>
                </li>
                <li className="signin">
                  <NavLink to="/signin">
                    <b>Signin</b>
                  </NavLink>
                </li>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
