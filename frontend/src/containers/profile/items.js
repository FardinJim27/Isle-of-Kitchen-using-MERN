import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem } from "../../actions";
import { Input } from "../../components/input";
import "./style.css";

/**
 * @author
 * @function Items
 **/

export const Items = (props) => {
  const [show, setShow] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemImg, setItemImg] = useState({});

  const dispatch = useDispatch();

  const kitchen = useSelector((state) => state.kitchen);

  const handleNewItem = () => {
    const newItem = new FormData();

    newItem.append("itemName", itemName);
    newItem.append("itemDesc", itemDesc);
    newItem.append("itemPrice", itemPrice);
    newItem.append("itemImg", itemImg);

    dispatch(addNewItem(newItem));
    setShow(false);
  };

  return (
    <>
      <Container fluid>
        <div>
          <Row>
            <Col>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  Menu Items
                </div>
                <Button variant="secondary" onClick={() => setShow(true)}>
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ display: "flex" }}>
          <Row>
            {kitchen.menu.length > 0 &&
              kitchen.menu.map((items) => (
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
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new item!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Input
                type={"text"}
                label={"Item Name"}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Col>
            <Col>
              <Input
                type={"number"}
                label={"Item Price"}
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </Col>
          </Row>
          <div style={{ marginTop: "10px" }}>
            <label style={{ paddingBottom: "8px" }}>Delivery Address</label>
            <textarea
              required
              className="form-control"
              placeholder="Enter Short Description"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Row>
              <Col>
                <Input
                  label={"Item Image"}
                  placeholder={"Choose File"}
                  type={"file"}
                  onChange={(e) => setItemImg(e.target.files[0])}
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleNewItem}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
