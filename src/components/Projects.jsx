// src/components/Projects.jsx
import React, { useState } from "react";
import "../styles/style.css";

const projects = [
  // UI/UX
  {
    id: 1,
    category: "uiux",
    icon: "fas fa-ticket-alt",
    title: "Movie Ticket Booking App",
    description:
      "A clean and user-friendly movie ticket booking interface featuring movie listings, seat selection, show timings, and secure payment flow for a smooth booking experience.",
    tech: ["Figma", "UI Design", "Prototyping"],
    link:
      "https://www.figma.com/proto/VLyFNsr9EeeyhiQihb5NfM/Dharani-Dharan?page-id=374%3A66&node-id=395-2046&viewport=231%2C368%2C0.05&t=qHCW5Idg9iuiYMBb-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=395%3A2046&show-proto-sidebar=1",
  },
  {
    id: 2,
    category: "uiux",
    icon: "fas fa-bicycle",
    title: "Cycle Booking App Design",
    description:
      "A modern and user-friendly cycle booking interface featuring real-time cycle availability, location-based search, rental plans, navigation guidance, and a smooth booking experience.",
    tech: ["Adobe XD", "User Research", "Wireframing"],
    link:
      "https://www.figma.com/proto/VLyFNsr9EeeyhiQihb5NfM/Dharani-Dharan?page-id=374%3A66&node-id=395-8211&viewport=231%2C368%2C0.05&t=qHCW5Idg9iuiYMBb-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=395%3A8211&show-proto-sidebar=1",
  },
  {
    id: 3,
    category: "uiux",
    icon: "fas fa-shopping-cart",
    title: "E-Commerce Website Design",
    description:
      "A complete and modern e-commerce interface featuring product listings, filters, product detail pages, cart flow, and a seamless checkout experience with a clean design system.",
    tech: ["Sketch", "Design System", "Components"],
    link:
      "https://www.figma.com/proto/VLyFNsr9EeeyhiQihb5NfM/Dharani-Dharan?page-id=374%3A66&node-id=395-4293&viewport=231%2C368%2C0.05&t=qHCW5Idg9iuiYMBb-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=395%3A4293&show-proto-sidebar=1",
  },
  {
    id: 4,
    category: "uiux",
    icon: "fas fa-utensils",
    title: "Food Delivery App Design",
    description:
      "A modern and seamless food delivery interface featuring restaurant browsing, menu listings, order customization, real-time tracking, and a smooth checkout experience.",
    tech: ["Sketch", "Design System", "Components"],
    link:
      "https://www.figma.com/proto/VLyFNsr9EeeyhiQihb5NfM/Dharani-Dharan?page-id=374%3A66&node-id=395-8883&viewport=231%2C368%2C0.05&t=qHCW5Idg9iuiYMBb-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=395%3A8883&show-proto-sidebar=1",
  },

  // Web
  {
    id: 5,
    category: "web",
    icon: "fas fa-shopping-cart",
    title: "E-Commerce Website",
    description:
      "A full-featured online shopping platform with product catalog, shopping cart, payment integration, and user authentication.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://github.com/dharanidharan-palanisamy/Consultancy-Project",
    external: true,
  },
  {
    id: 6,
    category: "web",
    icon: "fas fa-truck",
    title: "Transport Management System",
    description:
      "A comprehensive system for managing transportation operations, including route optimization, vehicle tracking, and scheduling management.",
    tech: ["JavaScript", "Node.js", "Database"],
    link: "https://github.com/DharaniDharan29/Transport_Management",
    external: true,
  },
  {
    id: 7,
    category: "web",
    icon: "fas fa-boxes",
    title: "Supermarket Stock Management",
    description:
      "An inventory management system for supermarkets with real-time stock tracking, automated alerts, and comprehensive reporting features.",
    tech: ["Python", "Database", "GUI"],
    link: "https://github.com/DharaniDharan29/SUPERMARKET_STOCK_MANAGEMENT_SYSTEM",
    external: true,
  },
  {
    id: 8,
    category: "web",
    icon: "fas fa-cut",
    title: "Parlor Management System",
    description:
      "A complete salon management solution with appointment scheduling, customer management, and service tracking capabilities.",
    tech: ["Java", "Database", "GUI"],
    link: "https://github.com/dharanidharan-palanisamy/Barber-Shop-Management-",
    external: true,
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <h2 className="section-title reveal">Featured Projects</h2>

      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          marginBottom: "60px",
        }}
        className="reveal"
      >
        Here are some of my recent projects that showcase my skills and passion for development.
      </p>

      {/* Filter Tabs */}
      <div className="filter-tabs reveal" role="tablist" aria-label="Project filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          data-filter="all"
          onClick={() => setFilter("all")}
        >
          All Projects
        </button>

        <button
          className={`filter-btn ${filter === "uiux" ? "active" : ""}`}
          data-filter="uiux"
          onClick={() => setFilter("uiux")}
        >
          UI/UX Design
        </button>

        <button
          className={`filter-btn ${filter === "web" ? "active" : ""}`}
          data-filter="web"
          onClick={() => setFilter("web")}
        >
          Web Development
        </button>
      </div>

      <div className="projects-grid reveal">
        {filtered.map((p) => (
          <div key={p.id} className="project-card" data-category={p.category}>
            <div className="project-image">
              <i className={p.icon}></i>
            </div>

            <div className="project-content">
              <span className="project-category">{p.category === "uiux" ? "UI/UX Design" : "Web Development"}</span>
              <div className="project-title">{p.title}</div>
              <div className="project-description">{p.description}</div>

              <div className="project-tech">
                {p.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={p.link}
                  className="project-link"
                  target={p.external ? "_blank" : "_self"}
                  rel={p.external ? "noreferrer" : undefined}
                >
                  <i className="fas fa-eye"></i> {p.external ? (p.link.includes("github.com") ? "Code" : "View") : "View"}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
