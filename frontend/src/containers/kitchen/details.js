import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../actions";
import { Layout } from "../../components/Layout";

/**
 * @author
 * @function KitchenDeatils
 **/

export const KitchenDeatils = (props) => {
  const { state } = useLocation();

  const dispatch = useDispatch();

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
              <b>Menu</b>
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <Row>
                  {state.menu.length > 0 &&
                    state.menu.map((items) => (
                      <Col md={"6"}>
                        <div className="itemDiv">
                          <div>
                            <img src={items.itemImg} />
                          </div>
                          <div className="itemDesc">
                            <div>
                              <b>BDT {items.itemPrice}</b>
                            </div>
                            <div>{items.itemName}</div>
                            <div>{items.itemDesc}</div>
                            <Button
                              variant="success"
                              style={{ fontSize: "12px" }}
                              onClick={() => dispatch(addToCart(items))}
                            >
                              Add To Cart
                            </Button>
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
