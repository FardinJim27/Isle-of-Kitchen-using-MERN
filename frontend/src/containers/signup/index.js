import React from "react";
import { Layout } from "../../components/Layout";
import { Tab, Tabs, Container } from "react-bootstrap";
import { Customer } from "./customer";
import { Shop } from "./shop";

/**
 * @author
 * @function Signup
 **/

export const Signup = (props) => {
  return (
    <Layout>
      <div style={{ marginTop: "60px" }}>
        <Container>
          <div
            style={{
              marginTop: "70px",
              textAlign: "center",
            }}
          >
            <img
              src="https://aleeha.s3.ap-southeast-1.amazonaws.com/img4-removebg-preview.png"
              style={{
                height: "150px",
                width: "150px",
              }}
            />
          </div>
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            <div>Signup as a New Member!</div>
          </div>
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#EFF1F9",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
              style={{ justifyContent: "center", fontSize: "20px" }}
              fill
            >
              <Tab eventKey="home" title="Customer">
                <Customer />
              </Tab>
              <Tab eventKey="profile" title="Shop Owner">
                <Shop />
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
