import React, { useEffect, useState } from "react";
import "../styles/style.css";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "certifications", "projects", "contact"];

      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 150) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-brand">Dharani Dharan</div>

      <div className="nav-links">
        <a href="#home" className={`nav-item ${activeSection === "home" ? "active" : ""}`}>
          <i className="fas fa-home"></i><span>Home</span>
        </a>

        <a href="#about" className={`nav-item ${activeSection === "about" ? "active" : ""}`}>
          <i className="fas fa-user"></i><span>About</span>
        </a>

        <a href="#skills" className={`nav-item ${activeSection === "skills" ? "active" : ""}`}>
          <i className="fas fa-code"></i><span>Skills</span>
        </a>

        <a href="#certifications" className={`nav-item ${activeSection === "certifications" ? "active" : ""}`}>
          <i className="fas fa-certificate"></i><span>Certifications</span>
        </a>

        <a href="#projects" className={`nav-item ${activeSection === "projects" ? "active" : ""}`}>
          <i className="fas fa-laptop-code"></i><span>Projects</span>
        </a>

        <a href="#contact" className={`nav-item ${activeSection === "contact" ? "active" : ""}`}>
          <i className="fas fa-envelope"></i><span>Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
