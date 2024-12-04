import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// FA-Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faGem,
  faBiohazard,
  faGears,
  faFireExtinguisher,
  faSitemap,
  faCubes,
  faUser,
  faUsers,
  faCalendar,
  faGauge,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";
const Sidebar = () => {
  const location = useLocation(); // To get the current route
  const navigate = useNavigate();
  const isActiveRoute = (route) => location.pathname === route; // Helper function to check if the route is active

  const menuData = [
    {
      label: "Overview",
      icon: "bi-chevron-left",
      subItems: [
        { label: "Analytics", icon: faGauge, route: "/" },
        { label: "Test A", icon: faGauge, route: "/testa" },
        { label: "Videos", icon: faGauge, route: "/videos" },
        { label: "Upload", icon: faGauge, route: "/upload" },
        // { label: "VID 0", icon: faGauge, route: "video-player0" },
        // { label: "VID 1", icon: faGauge, route: "/video-player1" },
        // { label: "Calendar", icon: "I", route: "/calendar" },
      ],
    },
    // {
    //   label: "Assets Management",
    //   icon: "bi-chevron-left",
    //   subItems: [
    //     { label: "Assets", icon: faGem, route: "/assets" },
    //     // { label: "Assets Hardware", icon: faGem, route: "/assets/?kind=HW" },

    //     { label: "Assets Groups", route: "/assets-groups" },
    //     { label: "Asset Relations", route: "/asset-relations" },
    //     { label: "Assets Discovery", route: "/assets-discovery" },
    //     { label: "Human Resources", route: "/human-resources" },
    //   ],
    // },
    // {
    //   label: "Context",
    //   icon: "bi-chevron-left",
    //   subItems: [
    //     { label: "Threats", icon: faBiohazard, route: "/threats" },
    //     {
    //       label: "Reference Controls",
    //       icon: faGears,
    //       route: "/reference-controls",
    //     },
    //     {
    //       label: "Applied Controls",
    //       icon: faFireExtinguisher,
    //       route: "/applied-controls",
    //     },
    //     { label: "Domains", icon: faSitemap, route: "/folders" },
    //   ],
    // },
    // {
    //   label: "Organization",
    //   icon: "bi-chevron-left",
    //   isDisable: true,
    //   subItems: [
    //     { label: "Domains", icon: faSitemap, route: "/folders" },
    //     { label: "Projects", icon: faCubes, route: "/projects" },
    //     { label: "Users", icon: faUser, route: "/users" },
    //     { label: "User Groups", icon: faUsers, route: "/user-groups" },
    //   ],
    // },
    // {
    //   label: "Governance",
    //   icon: "bi-chevron-left",
    //   isDisable: true,

    //   subItems: [
    //     { label: "Policies", route: "/policies" },
    //     { label: "Risk Matrices", route: "/risk-matrices" },
    //   ],
    // },
    // {
    //   label: "Risk",
    //   icon: "bi-chevron-left",
    //   isDisable: true,

    //   subItems: [
    //     { label: "Risk Assessments", route: "/risk-assessments" },
    //     { label: "Risk Scenarios", route: "/risk-scenarios" },
    //     { label: "Risk Acceptances", route: "/risk-acceptances" },
    //   ],
    // },
    // {
    //   label: "Compliance",
    //   icon: "bi-chevron-left",
    //   isDisable: true,

    //   subItems: [
    //     { label: "Audits", route: "/compliance-assessments" },
    //     { label: "Evidences", route: "/evidences" },
    //     { label: "Frameworks", route: "/frameworks" },
    //     { label: "Mappings", route: "/requirement-mapping-sets" },
    //   ],
    // },
  ];
  return (
    <aside
      className="d-flex flex-column bg-white justify-content-between cus__sidebar p-3 offcanvas-lg offcanvas-start"
      id="mySidebar"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">
          Browsedocs
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          data-bs-target="#mySidebar"
        ></button>
      </div>

      <div className="offcanvas-body">
        <nav className="w-100" id="bd-docs-nav" aria-label="Docs navigation">
          <a
            style={{ color: "#725798" }}
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
          >
            {/* <img src={RajaIcon} alt="React Logo" width={"100%"} /> */}
          </a>
          <hr />
          <ul className="list-unstyled p-0 mb-auto">
            {menuData.map((menu, index) => (
              <li key={index} className="nav-item">
                <a
                  style={{ color: "#725798" }}
                  className="btn btn-toggle align-items-center rounded collapsed text-nowrap"
                  data-bs-toggle={menu.isDisable ? "" : "collapse"}
                  data-bs-target={`#${menu.label
                    .replace(/\s+/g, "-")
                    .toLowerCase()}-collapse`}
                  aria-expanded="false"
                >
                  {menu.label}
                  {/* {t(menu.label)} */}
                  <i className="bi bi-chevron-left"></i>
                </a>

                <div
                  id={`${menu.label
                    .replace(/\s+/g, "-")
                    .toLowerCase()}-collapse`}
                  className="collapse p-0"
                >
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small text-decoration-none">
                    {menu.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        style={{ height: "35px" }}
                        // className={`p-2 m-1 text-nowrap custom-hover-effect d-block ${
                        className={`my-1 p-0 text-nowrap custom-hover-effect d-flex align-items-center  ${
                          isActiveRoute(subItem.route)
                            ? "custom-hover-effect-active"
                            : ""
                        }`}
                      >
                        <Link
                          to={subItem.route}
                          // style={{ height: "25px" }}
                          className="rounded text-decoration-none text-dark px-2 d-block "
                        >
                          {subItem.icon ? (
                            <FontAwesomeIcon icon={subItem.icon} size="md" />
                          ) : (
                            // <i>I</i>
                            <i className={subItem.icon}></i>
                          )}{" "}
                          {/* {t(subItem.label)} */}
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <hr />
                </div>
              </li>
            ))}
          </ul>
          <hr />

          {/* User Dropdown */}
          <div className="dropdown">
            {/* <button onClick={() => console.log(location.pathname, route)}>
            LOGPATH
          </button> */}
            <a
              className="d-flex align-items-center text-decoration-none dropdown-toggle gap-2"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src=""
                alt=""
                height="30px"
                width="30px"
                className="rounded-5"
              />
              <strong>Hamid Raha</strong>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                onClick={() => console.log("Logout")}
                className="dropdown-item"
              >
                <i className="mx-1 fs-5 bi bi-box-arrow-left"></i>
                Logout
              </button>
              {/* <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a> */}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="dropdown">
            <a
              className="d-flex align-items-center text-decoration-none dropdown-toggle gap-2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src=""
                alt=""
                height="30px"
                width="30px"
                className="rounded-5"
              />
              <strong>Language</strong>
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
            >
              <button
                className="dropdown-item"
                //   onClick={() => changeLanguageHandler("en")}
              >
                English
              </button>
              <button
                className="dropdown-item"
                //   onClick={() => changeLanguageHandler("fr")}
              >
                France
              </button>
              {/* <button
              className="dropdown-item"
              onClick={() => changeLanguageHandler("ar")}
            >
              Arabic
            </button> */}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
