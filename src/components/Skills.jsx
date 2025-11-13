import React from "react";

const Skills = () => {
  return (
    <section id="skills" className="section">
      <h2 className="section-title reveal">Technical Skills</h2>

      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          marginBottom: "60px",
        }}
        className="reveal"
      >
        Here are the technologies and tools I work with to bring ideas to life.
      </p>

      <div className="skills-grid reveal">
        {/* ===== Design Skills ===== */}
        <div className="skill-category">
          <h4>
            <i className="fas fa-paint-brush"></i> Design Skills
          </h4>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fas fa-pencil-ruler" style={{ color: "#ffb400" }}></i>
              UI Design
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fas fa-user-check" style={{ color: "#4caf50" }}></i>
              UX Research
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fas fa-layer-group" style={{ color: "#3498db" }}></i>
              Wireframing
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fas fa-project-diagram" style={{ color: "#e91e63" }}></i>
              Prototyping
            </div>
          </div>
        </div>

        {/* ===== Frontend Development ===== */}
        <div className="skill-category">
          <h4>
            <i className="fas fa-code"></i> Frontend Development
          </h4>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fab fa-html5" style={{ color: "#e34c26" }}></i>
              HTML & CSS
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fab fa-js-square" style={{ color: "#f7df1e" }}></i>
              JavaScript
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fab fa-react" style={{ color: "#61dafb" }}></i>
              ReactJS
            </div>
          </div>
        </div>

        {/* ===== Development Tools ===== */}
        <div className="skill-category">
          <h4>
            <i className="fas fa-tools"></i> Development Tools
          </h4>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fas fa-code" style={{ color: "#007acc" }}></i>
              VS Code
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-name">
              <i className="fab fa-figma" style={{ color: "#f24e1e" }}></i>
              Figma
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-name">
              <i className="fab fa-figma" style={{ color: "#f24e1e" }}></i>
              Canva
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
