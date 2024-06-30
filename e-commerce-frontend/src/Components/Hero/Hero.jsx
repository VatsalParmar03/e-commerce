import React from "react";
import "./Hero.css";
import homepicgrey from "../Assets/homepicgrey.png";
// import hero_image from "../Assets/homepicgrey.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Discover unbeatable deals and the latest trends at our one-stop online shop for everything you need!</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Hi there</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Welcome to</p>
          <p>Modern Mart</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={homepicgrey} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
