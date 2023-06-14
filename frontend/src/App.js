import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateComp from "./components/PrivateComp";
import Login from "./components/Login";

import AddProducts from "./components/AddProducts";
import Products from "./Products";
import UpdateProducts from "./components/UpdateProducts";
import { useState } from "react";

function App() {
  const [key, setKey] = useState("");
  const getInputData = (data) => {
    setKey(data);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar inputKey={getInputData} />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<Products  productKey={key}/>} />
            <Route path="/add_products" element={<AddProducts />} />
            <Route path="/update_products/:id" element={<UpdateProducts />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
