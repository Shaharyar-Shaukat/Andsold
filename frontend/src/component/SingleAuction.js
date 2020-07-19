import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import CardImage from "./CardImage";
import SingleCardImage from "./SingleCardImage";
import { postAuction, postBid } from "../auction/api";
import { isAuthenticated } from "../auth";

const SingleAuction = ({ product }) => {
  const [data, setData] = useState({
    product: "",
  });

  const calculateTimeLeft = () => {
    const [timeleft, setTimrLeft] = useState(calculateTimeLeft());

    let year = new Date().getFullYear();
    let difference = +new Date(`${year}-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  useEffect(() => {
    setTimeout(() => {
      setTimrLeft(calculateTimeLeft());
    }, 1000);
  });
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  const { user, accessToken } = isAuthenticated();
  const handleChange = (id) => (event) => {
    setData({ ...data, [id]: 5 });
    //setValues({ ...values, error: false, [name]: event.target.value });
  };
  const aid = window.location.href.substring(
    window.location.href.indexOf("ion/") + 4,
    window.location.href.length
  );
  //alert(aid)
  var currentBid = product.price;
  function bidChange(newbid) {
    if (currentBid >= document.getElementById("newBid").value) {
      alert("make a higher bid");
    } else {
      //alert(aid)
      const data1 = {
        price: document.getElementById("newBid").value,
        buyer: user._id,
        _id: String(aid),
      };
      postBid(user._id, accessToken, data1).then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          window.location.reload(false);
          alert("Bidding Successful!");
        }
      });
    }
  }

  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{product.title}</div>
      <div className="card-body">
        <SingleCardImage item={product._id} />
        <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added on : {product.createdAt}</p>
        <p className="black-8">
          Current Highest-Bid : <b> € {product.price}</b>
        </p>
        <br />

        <input
          className="black-8"
          type="text"
          id="newBid"
          className="form-control"
          style={{ maxWidth: "200px" }}
        />
        <button
          onClick={bidChange}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Bid
        </button>
        <div className="clock">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
      </div>
    </div>
  );
};

export default SingleAuction;
