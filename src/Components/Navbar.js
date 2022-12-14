import React, { useContext } from "react";
// import PropTypes from 'prop-types'
import { Link, useLocation } from "react-router-dom";
// import News from './News';
import notesContext from "../context/Notes/noteContext";

const Navbar = () => {
  let location = useLocation();
  const context = useContext(notesContext);
  const { handleLogout, user } = context;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <div className="mx-5">
                <Link className="my-auto " to="/createuser" role="button">
                    <i className="fa-solid  fa-2xl fa-user-plus"></i>
                  </Link>
                  <Link className="my-auto " to="/login" role="button">
                    <i className="fa-solid mx-5 fa-2xl fa-sign-in"></i>
                  </Link>
                  
                </div>
              </form>
            ) : (
              <>
                <strong className="text-light my-auto">
                  {localStorage.getItem("user")}
                </strong>
                <Link onClick={handleLogout} to="/" className="mr-5">
                  <i className="fa-solid mx-5 fa-2xl fa-right-from-bracket"></i>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
