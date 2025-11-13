import React, { useState } from "react";
import "../styles/style.css";
const Contact = () => {
  const [resultMsg, setResultMsg] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const form = new FormData(e.target);
    // Example: send to formsubmit.co or your backend.
    // Replace the URL with your API or form endpoint.
    try {
      const res = await fetch("https://formsubmit.co/ajax/bdharanidharan2005@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: form
      });
      const data = await res.json();
      if (data.success || res.ok) {
        setResultMsg("Message sent — thank you!");
        e.target.reset();
      } else {
        setResultMsg("Submission failed. Try again.");
      }
    } catch (err){
      console.error(err);
      setResultMsg("There was an error sending the message.");
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Let's Connect</h2>
      <div className="contact-grid">
        <div className="contact-info">
          <h3 style={{fontSize: "1.8rem", marginBottom:30}}>Get In Touch</h3>
          <p style={{color:"var(--text-secondary)", marginBottom:40}}>
            I'm always excited to discuss new opportunities, collaborate on interesting projects,
            or just have a chat about technology. Feel free to reach out!
          </p>

          <div className="contact-item">
            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
            <div><h4 style={{color:"var(--text-primary)"}}>Email</h4><p style={{color:"var(--text-secondary)"}}>bdharanidharan2005@gmail.com</p></div>
          </div>

          <div className="contact-item" style={{marginTop:12}}>
            <div className="contact-icon"><i className="fas fa-phone"></i></div>
            <div><h4 style={{color:"var(--text-primary)"}}>Phone</h4><p style={{color:"var(--text-secondary)"}}>+91 8870210964</p></div>
          </div>

          <div className="contact-item" style={{marginTop:12}}>
            <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
            <div><h4 style={{color:"var(--text-primary)"}}>Location</h4><p style={{color:"var(--text-secondary)"}}>Tamil Nadu, India</p></div>
          </div>
        </div>

        <div className="contact-form">
          <h3 style={{fontSize:"1.8rem", marginBottom:30}}>Contact Us</h3>
          <form id="contactForm" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="5840df84-0e20-482d-a9cb-8cb14ea61cfb" />
            <div className="form-group"><input type="text" name="name" className="form-input" placeholder="Your Name" required/></div>
            <div className="form-group"><input type="email" name="email" className="form-input" placeholder="Your Email" required/></div>
            <div className="form-group"><input type="text" name="subject" className="form-input" placeholder="Subject" required/></div>
            <div className="form-group"><textarea name="message" className="form-input" placeholder="Your Message" required/></div>
            <button type="submit" className="btn btn-primary" style={{width:"100%", padding:12}}> <i className="fas fa-paper-plane"></i> Send Message</button>
          </form>
          <div id="result" style={{marginTop:12, color:"var(--text-secondary)"}}>
            {resultMsg}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
