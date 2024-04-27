import React from "react";
import { Layout } from "../../components/Layout";
import { Button, Col, Container, Row } from "react-bootstrap";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  return (
    <Layout>
      <div style={{ marginTop: "50px", marginBottom: "100px" }}>
        <Container fluid>
          <Row>
            <Col md={"3"}>
              <div>
                <div style={{ textAlign: "center" }}>
                  <img src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img4-removebg-preview.png" />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p>Eat Fresh.Stay Healthy</p>
                  <p>
                    Our goal is to provide you with wholesome cuisine and a
                    taste of home. Pre-order fresh, healthy, authentic homemade
                    foor and ready meals from home chefs straight to your door.
                  </p>
                </div>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#EEB797",
                  }}
                />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button variant="success">View Kitchens</Button>
                  <p style={{ margin: 10 }}>Or Looking For Bulk Order?</p>
                  <Button variant="secondary">Get A Quote</Button>
                </div>
              </div>
            </Col>
            <Col md={"9"}>
              <Row>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{}}>
                    <img
                      src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img2.jpg"
                      style={{
                        width: "100%",
                        borderWidth: "0.2px",
                        borderColor: "#EEB797",
                        borderStyle: "solid",
                        padding: 10,
                        paddingTop: 90,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      borderWidth: "0.2px",
                      borderColor: "#EEB797",
                      borderStyle: "solid",
                      padding: 10,
                    }}
                  >
                    <img
                      src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img3.jpg"
                      style={{ width: "100%", marginTop: 250 }}
                    />
                  </div>
                  <div>
                    <img
                      src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img1.jpg"
                      style={{
                        width: "100%",
                        borderWidth: "0.2px",
                        borderColor: "#EEB797",
                        borderStyle: "solid",
                        padding: 10,
                        paddingTop: 90,
                      }}
                    />
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};
