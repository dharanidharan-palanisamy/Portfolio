import React from "react";
import "../styles/style.css";
const About = () => (
  <section id="about" className="section">
    <h2 className="section-title">About Me</h2>
    <div className="about-grid">
      <div className="about-image">
        <img src={process.env.PUBLIC_URL + "/img/hero.JPG"} alt="Dharani" className="profile-img" />
      </div>
      <div className="about-content">
        <p>
          I'm a passionate Frontend Developer with expertise in modern web technologies.
          I love creating beautiful, functional websites and applications that provide exceptional user experiences.
          Currently pursuing B.E. in Computer Science at Kongu Engineering College, I combine academic knowledge with practical skills to deliver innovative solutions.
        </p>
        <p style={{marginTop:12}}>
          My journey in technology started with curiosity and has evolved into a passion for problem-solving and creating meaningful digital experiences. I'm always eager to learn new technologies and take on challenging projects.
        </p>

        <div className="social-links" style={{marginTop:16}}>
          <a href="https://github.com/dharanidharan-palanisamy" className="social-link" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/dharanidharan-p-655364291/" className="social-link" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://leetcode.com/u/dharanidharan-palanisamy/" className="social-link" target="_blank" rel="noreferrer"><i className="fas fa-code"></i></a>
          <a href="https://www.behance.net/dharanidharan60" className="social-link" target="_blank" rel="noreferrer"><i className="fab fa-behance"></i></a>
        </div>
      </div>
    </div>

    <div style={{marginTop:40}}>
      <h3 style={{fontSize:"2rem",textAlign:"center", color:"var(--text-primary)"}}>Education Journey</h3>
      <div className="timeline" style={{marginTop:18}}>
        <div className="timeline-item">
          <div className="timeline-year">2023 - Present</div>
          <div className="timeline-title">Kongu Engineering College</div>
          <div className="timeline-description">B.E. Computer Science and Engineering</div>
        </div>
        <div className="timeline-item">
          <div className="timeline-year">2020 - 2023</div>
          <div className="timeline-title">Kongu Polytechnic College</div>
          <div className="timeline-description">Diploma in Computer Science and Engineering</div>
        </div>
        <div className="timeline-item">
          <div className="timeline-year">2015 - 2020</div>
          <div className="timeline-title">A.E.T Matriculation Higher Secondary School</div>
          <div className="timeline-description">Higher Secondary Education</div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
