import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdateProducts() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const params = useParams();

  const notify = (msg) =>
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });


  // function for handel onsubmit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    const deltAPi = await fetch(`http://localhost:8400/update/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        productName,
        productPrice,
        productCategory,
        productCompany,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resulting = await deltAPi.json();
    notify(resulting.result);
  };

  useEffect(() => {
    const getProductData = async () => {
      let productResult = await fetch(
        `http://localhost:8400/product/${params.id}`
      );
      let result = await productResult.json();
      setProductName(result.productName);
      setProductPrice(result.productPrice);
      setProductCategory(result.productCategory);
      setProductCompany(result.productCompany);
    };
    getProductData();
  }, [params.id]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 offset-xl-2 offset-lg-2 offset-md-1 offset-sm-0 offset-0 signupContainer">
            <h1 className="text-center">Update Products</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputName1">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  value={productName}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Product Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                  }}
                  value={productPrice}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Product Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                  required
                  value={productCategory}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Product Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setProductCompany(e.target.value);
                  }}
                  required
                  value={productCompany}
                />
              </div>

              <button type="submit" className="btn btn-danger">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
