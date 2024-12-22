import React from "react";
import { Row } from "react-bootstrap";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/templates/sidebar/Sidebar";
import Header from "../components/templates/navbar/Header";
import Breadcrumb from "../components/templates/breadcrumb/Breadcrumb";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <div className=" container-fluid p-0">
        <Row className="p-0 m-0">
          <div className="col-lg-2 p-0 m-0 ">
            <Sidebar />
          </div>
          {/* <Header /> */}
          <div className="col-lg-10">
            <div className="row  ">
              <Breadcrumb />
            </div>
            <Outlet />
          </div>
        </Row>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
