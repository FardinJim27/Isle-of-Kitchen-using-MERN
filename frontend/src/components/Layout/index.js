import React from "react";
import { Footer } from "../footer";
import { Header } from "../header";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};
