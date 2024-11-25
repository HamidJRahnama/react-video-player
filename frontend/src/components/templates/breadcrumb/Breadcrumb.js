import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Breadcrumb = () => {
  const breadcrumbs = useSelector((state) => state.breadcrumb);

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
      <ul className="navbar-nav justify-content-start align-items-center flex-grow-1 pe-3">
        {breadcrumbs.map((crumb, index) => {
          // Build the path dynamically for the current breadcrumb
          const path = breadcrumbs
            .slice(1, index + 1) // Include all parts up to the current index
            .map((part) => part.toLowerCase().replace(/ /g, "-")) // Convert to kebab-case
            .join("/");

          const isLastCrumb = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="breadcrumb-item">
              {!isLastCrumb ? (
                <Link
                  to={`/${path}`}
                  className="fw-bold p-1 text-decoration-none link-dark"
                >
                  {crumb}
                </Link>
              ) : (
                <span className="fw-bold p-1 text-dark">{crumb}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
