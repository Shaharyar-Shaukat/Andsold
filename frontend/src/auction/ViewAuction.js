import React, {useState} from "react";
import Layout from "../core/Layout";
import {getAuctionsById} from "./api";

const ViewAuction = () => {

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
      getAuctionsById({ productId: productId }).then((response) => {
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
