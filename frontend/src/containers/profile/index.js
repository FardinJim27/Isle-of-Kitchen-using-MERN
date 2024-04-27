import React, { useEffect } from "react";
import { Container, Row, Col, Tabs, Tab, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllKitchen,
  getAllOrder,
  getAllUser,
  getMenu,
  getOrder,
  kitchenSignout,
  signout,
} from "../../actions";
import { Layout } from "../../components/Layout";
import { Items } from "./items";
import { Orders } from "./orders";
import "./style.css";

/**
 * @author
 * @function Profile
 **/

export const Profile = (props) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const kitchen = JSON.parse(localStorage.getItem("kitchen"));

  const menu = useSelector((state) => state.kitchen.menu);
  const users = useSelector((state) => state.auth.users);
  const kitchens = useSelector((state) => state.kitchen.kitchenList);

  const order = useSelector((state) => state.order);

  const deliveredCount = order.allOrder.filter(
    (c) => c.orderStatus === "Delivered"
  );

  const totalRevenue = Object.keys(order.allOrder).reduce(function (
    orderTotal,
    key
  ) {
    return orderTotal + order.allOrder[key].orderTotal;
  },
  0);

  const adminCount = users.filter((c) => c.role === "admin");
  console.log(adminCount);

  const handleKitchenLogout = (e) => {
    dispatch(kitchenSignout());
  };

  const handleUserLogout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getMenu());
  }, []);

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getAllUser());
    dispatch(getAllKitchen());
    dispatch(getAllOrder());
  }, []);

  return (
    <Layout>
      <div style={{ marginTop: "80px", marginBottom: "100px" }}>
        {user !== null && user.role === "user" && (
          <Container fluid>
            <div
              style={{
                backgroundColor: "#EFF1F9",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div style={{ textAlign: "center", fontSize: "20px" }}>
                <b>Orders</b>
              </div>
              <div>
                <Row>
                  {order.getOrders.length > 0 &&
                    order.getOrders.map((items) => (
                      <Col md={"6"}>
                        <div className="totalDiv">
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
                        </div>
                      </Col>
                    ))}
                </Row>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button onClick={handleKitchenLogout}>Logout</Button>
            </div>
          </Container>
        )}
        {kitchen !== null && (
          <Container fluid>
            <div>
              <Row>
                <Col md={3}>
                  <div className="totalItem">
                    <div className="itemImg">
                      <img src="https://cdn-icons-png.flaticon.com/512/4813/4813075.png" />
                    </div>
                    <div className="itemNum">{menu.length}</div>
                    <div className="itemText">Total Items</div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="totalOrder">
                    <div className="totalImg">
                      <img src="https://cdn-icons-png.flaticon.com/512/2649/2649223.png" />
                    </div>
                    <div className="totalNum">{order.allOrder.length}</div>
                    <div className="totalText">Total Orders</div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="totalDelivered">
                    <div className="deliveredImg">
                      <img src="https://cdn-icons-png.flaticon.com/512/2272/2272267.png" />
                    </div>
                    <div className="deliveredNum">{deliveredCount.length}</div>
                    <div className="deliveredText">Orders Delivered</div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="totalRevenue">
                    <div className="paymentImg">
                      <img src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img_568450.png" />
                    </div>
                    <div className="paymentNum">{totalRevenue}</div>
                    <div className="paymentText">Total Revenue</div>
                  </div>
                </Col>
              </Row>
            </div>

            <div
              style={{
                marginTop: "30px",
                backgroundColor: "#EFF1F9",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Container fluid>
                <Row>
                  <Col>
                    <Tabs
                      defaultActiveKey="item"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                      style={{ fontWeight: "bold" }}
                      fill
                    >
                      <Tab eventKey="item" title="Items">
                        <Items />
                      </Tab>
                      <Tab eventKey="order" title="Orders">
                        <Orders />
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
              </Container>
            </div>
            <div>
              <Button onClick={handleKitchenLogout}>Logout</Button>
            </div>
          </Container>
        )}
        {user !== null && user.role === "admin" && (
          <Container fluid>
            <div
              style={{
                backgroundColor: "#EFF1F9",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "200px",
                  textAlign: "center",
                  alignItems: "center",
                  padding: 20,
                  margin: 10,
                }}
              >
                <p>{adminCount.length}</p>
                <p>Admin</p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  width: "200px",
                  textAlign: "center",
                  alignItems: "center",
                  padding: 20,
                  margin: 10,
                }}
              >
                <p>{users.length}</p>
                <p>User</p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  width: "200px",
                  textAlign: "center",
                  alignItems: "center",
                  padding: 20,
                  margin: 10,
                }}
              >
                <p>{kitchens.length}</p>
                <p>Kitchen</p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  width: "200px",
                  textAlign: "center",
                  alignItems: "center",
                  padding: 20,
                  margin: 10,
                }}
              >
                <p>{order.allOrder.length}</p>
                <p>Orders</p>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button onClick={handleUserLogout}>Logout</Button>
            </div>
          </Container>
        )}
      </div>
    </Layout>
  );
};
