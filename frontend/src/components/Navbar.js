import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./img/logo.png";
import { useState } from "react";

export default function Navbar(props) {
  const auth = localStorage.getItem("users");
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.inputKey(inputData);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="amazon"
            style={{ width: "38px", height: "32px", objectFit: "contain" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {auth ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Products <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add_products">
                    Add Product
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={logout}>
                    Logout ({JSON.parse(auth).name})
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {auth ? (
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Products Here..."
                aria-label="Search"
                
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}
