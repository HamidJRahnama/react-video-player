import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-white shadow-sm "
      aria-label="Offcanvas navbar large"
    >
      <div className="container-fluid">
        <div className="align-items-center">
          <a
            className=" bi bi-three-dots fs-3 text-white text-decoration-none d-lg-none"
            data-bs-toggle="offcanvas"
            href="#mySidebar"
            role="button"
            aria-controls="offcanvasSidebar"
          ></a>
          <a className="navbar-brand" href="#"></a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar2"
          aria-controls="offcanvasNavbar2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar2"
          aria-labelledby="offcanvasNavbar2Label"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
              Offcanvas
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
