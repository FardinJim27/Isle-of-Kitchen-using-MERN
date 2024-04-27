import React, { useState } from "react";
import { Button, Modal, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../actions";

/**
 * @author
 * @function Update
 **/

export const Update = ({ order }) => {
  const [status, setStatus] = useState(order.orderStatus);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleOrderUpdate = () => {
    const data = {
      orderStatus: status,
      _id: order._id,
    };
    dispatch(updateOrderStatus(data));
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)} variant="secondary">
        Update
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <label>Update Status</label>
            <select
              label={"Update Status"}
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="OnGoingDelivery">On Going Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleOrderUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
