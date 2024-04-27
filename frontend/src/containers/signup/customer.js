import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions";
import { Input } from "../../components/input";

/**
 * @author
 * @function Customer
 **/

export const Customer = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

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
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      address: deliveryAddress,
    };
    dispatch(signUp(user));
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
                      label={"First Name"}
                      placeholder={"Enter First Name"}
                      type={"text"}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Input
                      label={"Last Name"}
                      placeholder={"Enter Last Name"}
                      type={"text"}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                      Delivery Address
                    </label>
                    <textarea
                      required
                      className="form-control"
                      placeholder="Enter Your Delivery Address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
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
