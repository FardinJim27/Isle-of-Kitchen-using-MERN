import React, { useState } from "react";
import { Row, Col, Badge, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Input } from "../../components/input";
import { Update } from "./update";

/**
 * @author
 * @function Orders
 **/

export const Orders = (props) => {
  const order = useSelector((state) => state.order);

  return (
    <div>
      <Row>
        {order.allOrder.length > 0 &&
          order.allOrder.map((items) => (
            <Col md={"6"}>
              <div className="totalDiv">
                <Row>
                  <Col md={9}>
                    <div>
                      {" "}
                      #{items.orderID}{" "}
                      {items.orderStatus === "Pending" ? (
                        <Badge>{items.orderStatus}</Badge>
                      ) : items.orderStatus === "Processing" ? (
                        <Badge bg="info">{items.orderStatus}</Badge>
                      ) : (
                        <Badge bg="success">{items.orderStatus}</Badge>
                      )}
                    </div>

                    {items.orderItems.map((info) => (
                      <div
                        style={{
                          display: "flex",
                          margin: 5,
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <img
                            src={info.img}
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <div className="itemDesc">
                          <div>{info.title}</div>
                          <div>
                            <b>
                              BDT {info.price} x {info.qty}
                            </b>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Col>
                  <Col md={3}>
                    <Update order={items} />
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};
