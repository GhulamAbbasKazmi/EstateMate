import { useState } from "react";
import "./About.css";
import useWindowSize from "../../utils/useWindowSize";

import Chat from "../../assets/xyz.png";
import bubbleChat from "../../assets/mt.png";
import logo from "../../assets/logo1.png";

const About = ({ darkMode }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="About-main">
      {width >= 835 ? (
        <div className="logo-image-section">
          <img src={Chat} className="about-male-chat-illustration" />
        </div>
      ) : null}
      <div className={`${darkMode ? "aboutForm-dark" : "aboutForm"}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p
            className={` ${darkMode ? "text-light" : "text-dark"}`}
            style={{
              fontSize: "3rem",
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            About!
          </p>

          {width >= 400 ? (
            <img src={logo} className="about-chat-bubble" />
          ) : null}
        </div>
        <div
          className={`"Login-form-field-text-message" ${
            darkMode ? "text-light" : "text-dark"
          }`}
          style={{
            padding: "0.5rem",
            fontSize: "1.2rem",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          Welcome to Estate Mate, where your dream home awaits.
          Our expert team of real estate professionals is
          here to guide you through every step of the home buying and selling process.
          Our aim is to provide the best quality products in the real estate investment
          and development sector assuring maximization of investors' value.
          Our responsibility and mission could be summarized as providing solutions
          to our clients for sustainable growth and gaining access to the most desirable opportunities present in the market.
        </div>

        <div
          className={`d-flex justify-content-around align-items-center last-sec-profile ${
            darkMode ? "text-light" : "text-dark"
          }`}
        >
          <footer>&copy; Copyright 2022 Estate Mate</footer>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textAlign: "end",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            Be Wealthy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
