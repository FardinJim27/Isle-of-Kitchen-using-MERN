import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { getAllKitchen } from "../../actions";
import { Layout } from "../../components/Layout";

/**
 * @author
 * @function Kitchens
 **/

export const Kitchens = (props) => {
  const dispatch = useDispatch();
  const kitchen = useSelector((state) => state.kitchen);

  useEffect(() => {
    dispatch(getAllKitchen());
  }, []);

  return (
    <Layout>
      <div style={{ marginTop: "60px", marginBottom: "60px" }}>
        <Container fluid>
          <div
            style={{
              textAlign: "center",
              margin: "10px 0 10px 0",
              fontSize: "25px",
            }}
          >
            All Kitchens
          </div>
          <div className="kitchenDiv">
            {kitchen.kitchenList.length > 0 &&
              kitchen.kitchenList.map((info) => (
                <div style={{ height: 300, width: 400, cursor: "pointer" }}>
                  <NavLink
                    to={`/kitchen/details`}
                    state={info}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div>
                      <img
                        src={info.img}
                        style={{
                          overflow: "hidden",
                          height: 250,
                          width: 400,
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div>
                      <b>{info.kitchen_name}</b>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        fontSize: "15px",
                      }}
                    >
                      <div>Free Delivery!</div>
                      <div>4.3 (203)</div>
                    </div>
                  </NavLink>
                </div>
              ))}
          </div>
        </Container>
      </div>
    </Layout>
  );
};
