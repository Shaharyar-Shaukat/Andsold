import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getAuctionsById, createAuction, getCategories } from "./api";

const ViewAuction = () => {
  // const {
  //     user: { _id, firstName, lastName, address, email }

  // } = isAuthenticated();

  const [data, setData] = useState({
    imagePath: "",
    description: "",
    price: "",
    buyer: "",
    category: "",
    owner: "",
  });
  const aid = window.location.href.substring(
    window.location.href.indexOf("?id=") + 4,
    window.location.href.length
  );
  const { id, results } = data;

  const getAuctionById = (productId) => {
    if (productId) {
      //alert(productId)
      getAuctionsById({ productId: productId }).then((response) => {
        //debugger;
        if (response.error) {
          console.log(response.error );

        } else {
          //setData({ ...data, results: response });
        }
      });
    }
  };

  return (
    <Layout
      title="ViewAuction"
      description={`Hello ${id}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-2"></div>
        <div className="col-9">
          {console.log(aid)}
          {getAuctionById(aid)}
          {results}
        </div>
      </div>
    </Layout>
  );
};

export default ViewAuction;
