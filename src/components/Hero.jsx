// src/components/Hero.jsx
import React from "react";
import "../styles/style.css";
// import the PDF so webpack bundles it and serves correctly
import CV from "../components/Certifications/DharaniDharan CV Resume.pdf";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-image">
          <img
            src={process.env.PUBLIC_URL + "/img/hero.JPG"}
            alt="Dharani Dharan"
            className="hero-profile-img"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <br /> Dharani Dharan
          </h1>

          <div className="hero-subtitle">UI/UX Designer</div>

          <p className="hero-description">
            Crafting beautiful, functional, and user-centric digital experiences with
            modern technologies and innovative solutions.
          </p>

          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-rocket"></i> View My Work
            </a>

            {/* ✔ Correct CV Download Link */}
            <a
              href={CV}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <i className="fas fa-download"></i> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
