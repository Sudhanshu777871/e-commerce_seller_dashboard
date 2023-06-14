import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [hidePass, tooglePass] = useState(false);
  const [typePass, setTypePass] = useState("password");
  const navigate = useNavigate();

  const notify = (msg) =>
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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
    let login = await fetch("http://localhost:8400/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (login) {
      login = await login.json();
      console.log(login);
      if (login.email) {
        localStorage.setItem("users", JSON.stringify(login));
        navigate("/");
      } else {
        notify("Invalid Account, Please Signup...");
      }
    }
  };
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
            <h1 className="text-center">Login Account</h1>
            <form onSubmit={handleSubmit}>
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
                Login Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
