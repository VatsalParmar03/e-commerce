import React from "react";
import "./Offers.css";
import limitedoffer from "../Assets/limitedoffer.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Limited</h1>
        <h1>Offers For You</h1>
        <p>ON SITE-WIDE PRODUCTS</p>
        <button>Check now</button>
      </div>
      <div className="offers-right">
        <img src={limitedoffer} alt="" />
      </div>
    </div>
  );
};

export default Offers;
