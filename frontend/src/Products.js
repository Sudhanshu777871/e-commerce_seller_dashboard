import React, { useEffect, useState } from "react";
import "./components/css/Product.css";
import { Link } from "react-router-dom";
export default function Products(props) {
  const [result, setResult] = useState([]);
  const getData = async () => {
    let apiData = await fetch("http://localhost:8400/products");
    let convertData = await apiData.json();
    setResult(convertData);
  };
  useEffect(() => {
    getData();
    if (props.productKey) {
      const getSearchData = async () => {
        let searchApiKey = await fetch(
          `http://localhost:8400/search/${props.productKey}`
        );
        let apiResult = await searchApiKey.json();
        setResult(apiResult);
      };

      getSearchData();
    }
  }, [props.productKey]);

  const deleteData = async (data) => {
    const deleteApi = await fetch(`http://localhost:8400/product/${data}`, {
      method: "DELETE",
    });
    const delResult = await deleteApi;
    if (delResult) {
      getData();
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          {result.map((data) => {
            return (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3"
                key={data._id}
              >
                <div className="card" style={{ width: "20rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{data.productName}</h5>
                    <div className="card-text mb-2">
                      <p>Company Name : {data.productCompany}</p>
                      <p>Category : {data.productCategory}</p>
                      <strong>&#8377;{data.productPrice}</strong>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-danger twoBtns"
                          onClick={() => deleteData(data._id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="col-6">
                        <Link to={`/update_products/${data._id}`}>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-info twoBtns"
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
