import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, placeOrder, removeCart } from "../../actions";
import { Layout } from "../../components/Layout";
import { BsTrash } from "react-icons/bs";
import { Swal } from "sweetalert2";
import "./style.css";

/**
 * @author
 * @function Cart
 **/

export const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const totalItem = Object.keys(cart.cartItems).reduce(function (qty, key) {
    return qty + cart.cartItems[key].qty;
  }, 0);
  const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
    const { price, qty } = cart.cartItems[key];
    return totalPrice + price * qty;
  }, 0);

  const handleOrder = () => {
    const orderItems = cart.cartItems.map((info) =>
      info.item
        ? {
            item: info.item,
            title: info.title,
            price: info.price,
            qty: info.qty,
            img: info.img,
          }
        : null
    );
    dispatch(placeOrder(orderItems, totalPrice));
  };

  return (
    <Layout>
      <div style={{ marginTop: "80px" }}>
        <Container>
          <div
            style={{
              backgroundColor: "#EFF1F9",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ textAlign: "center", fontSize: "20px" }}>
              <b>Cart</b>
            </div>
            <Row>
              <Col md={8}>
                {cart.cartItems.length > 0 &&
                  cart.cartItems.map((items) => (
                    <Row>
                      <div className="itemDiv">
                        <Col md={11}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <img src={items.img} />
                            </div>
                            <div className="itemDesc">
                              <div>{items.title}</div>
                              <div>
                                <b>BDT {items.price}</b> x <b>{items.qty}</b>
                              </div>
                              <div>
                                Total <b>BDT {items.price * items.qty}</b>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={1}>
                          <div style={{ cursor: "pointer" }}>
                            <span
                              onClick={() => {
                                const requestID = {
                                  _id: items._id,
                                };
                                dispatch(removeCart(requestID));
                              }}
                            >
                              <BsTrash />
                            </span>
                          </div>
                        </Col>
                      </div>
                    </Row>
                  ))}
              </Col>
              <Col md={4}>
                <div className="totalDiv">
                  <div>Total Items - {totalItem} </div>
                  <div>Payable Total - BDT {totalPrice} </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                  <Button variant="success" onClick={handleOrder}>
                    Place Order
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
