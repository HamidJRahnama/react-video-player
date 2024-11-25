import React from "react";
import { Row } from "react-bootstrap";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/templates/sidebar/Sidebar";
import Header from "../components/templates/navbar/Header";
import Breadcrumb from "../components/templates/breadcrumb/Breadcrumb";

const Layout = () => {
  // const location = useLocation()
  // const location = useLocation();
  // const pathnames = location.pathname.split("/").filter((x) => x);
  // console.log(useLocation());

  const location = useLocation();
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const routeNameMap = {
  //       threats: "Threats",
  //       calendar: "Calendar",
  //       "reference-controls": "Reference Controls",
  //       "applied-controls": "Applied Controls",
  //       assets: "Assets",
  //       "assets-groups": "Assets Groups",
  //       "asset-relations": "Asset Relations",
  //       "assets-discovery": "Assets Discovery",
  //       "human-resources": "Human Resources",
  //       folders: "Folders",
  //     };

  //     // Extract path parts and map to friendly names
  //     const pathParts = location.pathname
  //       .split("/")
  //       .filter((part) => part)
  //       .map((part, index, array) => {
  //         if (index === array.length - 1 && array.length > 1) {
  //           // Handle last segment (e.g., IDs or actions like "edit")
  //           if (isNaN(part)) return routeNameMap[part] || part;
  //           return `Detail ${part}`; // Default for numeric IDs
  //         }

  //         return routeNameMap[part] || part; // Map or fallback to raw segment
  //       });

  //     const breadcrumbs = ["Home", ...pathParts];
  //     dispatch(setBreadcrumb(breadcrumbs));
  //   }, [location, dispatch]);
  return (
    <>
      <Header />

      <div className=" container-fluid p-0">
        <Row className="p-0 m-0">
          <div className="col-lg-2 p-0 m-0 ">
            <Sidebar />
          </div>
          {/* <Header /> */}
          <div className="col-lg-10">
            <div className="row  ">
              {/* <BreadCrumbDemo /> */}
              <Breadcrumb />
            </div>
            <Outlet />
          </div>
        </Row>
      </div>

      <div className="bg-dark text-white text-center m-0 p-1 ">
        <h5 className="m-0"> Copyright Raja&copy;</h5>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
