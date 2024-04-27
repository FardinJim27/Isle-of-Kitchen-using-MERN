import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GrLocation, GrFacebook, GrInstagram } from "react-icons/gr";
import { BiPhoneCall } from "react-icons/bi";
import "./style.css";
import { NavLink } from "react-router-dom";

/**
 * @author
 * @function Footer
 **/

export const Footer = (props) => {
  return (
    <Container fluid>
      <div className="footer">
        <Row>
          <Col md={3}>
            <div className="secone">
              <div className="footerLogo">
                <img src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img4-removebg-preview.png" />
              </div>

              <div style={{ padding: "5px" }}>
                <GrLocation size={25} /> House 13, Road 10, Block B, Bashundhara R/A, Dhaka 1229
              </div>
              <div style={{ padding: "5px" }}>
                <BiPhoneCall size={25} /> +880 1319 003 147
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="sectwo">
              <div className="secHead">Company</div>
              <div className="secItem">
                <li>
                  <NavLink to={"/about-us"}>About Us</NavLink>
                </li>
                <li>
                  <NavLink to={"/terms-and-conditions"}>
                    Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink to={"/refund-policy"}>Refund Policy</NavLink>
                </li>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="sectwo">
              <div className="secHead">Support</div>
              <div className="secItem">
                <li>
                  <NavLink to={"/order-tracking"}>Order Tracking</NavLink>
                </li>
                <li>
                  <NavLink to={"/help-desk"}>Help Desk</NavLink>
                </li>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="sectwo">
              <div className="secHead">Follow Us</div>
              <div className="secItemLogo">
                <a href="#">
                  <GrFacebook size={25} />
                </a>
                <a style={{ marginLeft: "10px" }} href="#">
                  <GrInstagram size={25} />
                </a>
              </div>
              <div className="secHead" style={{ marginTop: "10px" }}>
                Payment Methods
              </div>
              <div className="secItemLogo">
                <img src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" />
                <img
                  style={{ marginLeft: "10px" }}
                  src="https://www.kindpng.com/picc/m/207-2071332_mono-icons-png-free-black-and-white-bank.png"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="footerCopyright">
              <b>Copyright © 2022, All Right Reserved By Isle Of Kitchens.</b>{" "}
              <br />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};