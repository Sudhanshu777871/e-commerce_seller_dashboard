import React, { useEffect, useState } from "react";
import "./css/Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [hidePass, tooglePass] = useState(false);
  const [typePass, setTypePass] = useState("password");
  const navigate = useNavigate();
  const tooglePassword = () => {
    if (hidePass === false) {
      setTypePass("text");
      tooglePass(true);
    } else {
      setTypePass("password");
      tooglePass(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let users = await fetch("http://localhost:8400/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (users) {
      users = await users.json();
      console.log(users);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/");
    }
  };

  // code for useeffect
  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 offset-xl-2 offset-lg-2 offset-md-1 offset-sm-0 offset-0 signupContainer">
            <h1 className="text-center">Signup Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type={typePass}
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  required
                  value={password}
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  onClick={tooglePassword}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Show Password
                </label>
              </div>
              <button type="submit" className="btn btn-danger">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
