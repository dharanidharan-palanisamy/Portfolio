// src/App.jsx (add the useEffect at top of the component)
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function App() {
  useEffect(() => {
    const elems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      // fallback: immediately show all
      elems.forEach(el => el.classList.add("active"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // if you want it to animate only once:
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px", // reveal slightly before fully in view
        threshold: 0.05
      }
    );

    elems.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
