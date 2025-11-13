// src/components/Certifications.jsx
import React from "react";
import "../styles/style.css";

// import PDFs from src so webpack bundles and returns a usable URL
import MongoDBPDF from "./Certifications/dharanidharan-p-MongoDB-certificate.pdf";
import UIUXPDF from "./Certifications/UI UX with Adobe XD and Figma.pdf";
import WebDesignPDF from "./Certifications/Web Design HTML, CSS.pdf";

const Certifications = () => {
  return (
    <section id="certifications" className="section">
      <h2 className="section-title">Certifications</h2>

      <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: 40 }}>
        Professional certifications that validate my technical expertise.
      </p>

      <div className="certifications-grid">
        <div className="certification-card">
          <div className="certification-icon"><i className="fas fa-medal"></i></div>
          <div className="certification-title">MongoDB Certified Associate Developer</div>
          <div className="certification-issuer">MongoDB</div>
          <div className="certification-date">
            {/* Use imported URL directly (it is already encoded properly by bundler) */}
            <a href={MongoDBPDF} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-download"></i> View
            </a>
          </div>
        </div>

        <div className="certification-card">
          <div className="certification-icon"><i className="fab fa-figma"></i></div>
          <div className="certification-title">UI/UX Design</div>
          <div className="certification-issuer">Udemy</div>
          <div className="certification-date">
            <a href={UIUXPDF} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-download"></i> View
            </a>
          </div>
        </div>

        <div className="certification-card">
          <div className="certification-icon"><i className="fas fa-globe"></i></div>
          <div className="certification-title">Web Design</div>
          <div className="certification-issuer">Udemy</div>
          <div className="certification-date">
            <a href={WebDesignPDF} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-download"></i> View
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
