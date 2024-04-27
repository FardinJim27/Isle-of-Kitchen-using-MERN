import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { kitchenSignUp } from "../../actions";
import { Input } from "../../components/input";

/**
 * @author
 * @function Shop
 **/

export const Shop = (props) => {
  const [kitchenName, setKitchenName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [kitchenAddress, setKitchenAddress] = useState("");
  const [img, setImg] = useState({});

  const dispatch = useDispatch();

  function checkPassword() {
    if (password === confirmPassword) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  }

  useEffect(() => {
    checkPassword();
  }, [confirmPassword]);

  const handleSignup = (e) => {
    const kitchen = new FormData();
    kitchen.append("kitchen_name", kitchenName);
    kitchen.append("owner_name", ownerName);
    kitchen.append("email", email);
    kitchen.append("phone", phone);
    kitchen.append("password", password);
    kitchen.append("kitchen_address", kitchenAddress);
    kitchen.append("img", img);

    dispatch(kitchenSignUp(kitchen));
    e.preventDefault();
  };

  return (
    <Container>
      <Form onSubmit={handleSignup}>
        <Col>
          <Row>
            <div>
              <div>
                <Row>
                  <Col>
                    <Input
                      label={"Kitchen Name"}
                      placeholder={"Enter Your Kitchen Name"}
                      type={"text"}
                      value={kitchenName}
                      onChange={(e) => setKitchenName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Input
                      label={"Owner Name"}
                      placeholder={"Enter Kitchen Owner's Name"}
                      type={"text"}
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Row>
                  <Col>
                    <Input
                      label={"Email"}
                      placeholder={"Enter Valid Email Address"}
                      type={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Input
                      label={"Phone Number"}
                      placeholder={"Enter Phone Number"}
                      type={"phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Row>
                  <Col>
                    <Input
                      label={"Password"}
                      placeholder={"Enter A Strong Password"}
                      type={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Input
                      label={"Re-enter Password"}
                      placeholder={"Enter Your Password Again"}
                      type={"password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordMatched === false ? (
                      <label
                        style={{
                          marginTop: "5px",
                          color: "red",
                          fontSize: "15px",
                        }}
                      >
                        Password Didn't Match!
                      </label>
                    ) : null}
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Row>
                  <Col>
                    <label style={{ paddingBottom: "8px" }}>
                      Kitchen Address
                    </label>
                    <textarea
                      required
                      className="form-control"
                      placeholder="Enter Your Delivery Address"
                      value={kitchenAddress}
                      onChange={(e) => setKitchenAddress(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Row>
                  <Col>
                    <Input
                      label={"Display Image"}
                      placeholder={"Choose File"}
                      type={"file"}
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Row>
                  <Col>
                    <Form.Check
                      required
                      label="I Agree To Your Privacy Policy and Terms & Conditions."
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
          <Row>
            <Col>
              <div style={{ marginTop: "20px", marginBottom: "15px" }}>
                <Button type="submit" variant="success">
                  Signup
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Form>
    </Container>
  );
};
