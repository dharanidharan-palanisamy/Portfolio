"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "design" | "web">("all");
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProjects = projects
    .filter((p) => filter === "all" || p.projectType === filter)
    .sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });

  const easing = [0.22, 1, 0.36, 1] as const; // Premium cubic bezier

  // Variants
  const sectionHeadingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: easing } 
    }
  };

  const sectionDescVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: easing, delay: 0.12 } 
    }
  };

  const filterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const filterItemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: easing } 
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : (isMobile ? 20 : 35), 
      scale: prefersReducedMotion ? 1 : 0.98 
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.65, 
        ease: easing, 
        delay: index * 0.1 
      }
    }),
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98,
      transition: { duration: 0.4, ease: easing } 
    }
  };

  const imageRevealVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 1.04, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.7, ease: easing } 
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h2 
              variants={sectionHeadingVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-4"
            >
              SELECTED WORK
            </motion.h2>
            <motion.p 
              variants={sectionDescVariants}
              className="text-lg md:text-xl text-muted max-w-xl"
            >
              A selection of digital products, interfaces and experiences I&apos;ve designed.
            </motion.p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap items-center gap-4 mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={filterContainerVariants}
        >
          {[
            { id: "all", label: "All Projects" },
            { id: "design", label: "UI/UX Design" },
            { id: "web", label: "Web Development" }
          ].map((tab) => (
            <motion.button 
              key={tab.id}
              variants={filterItemVariants}
              onClick={() => setFilter(tab.id as any)}
              className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${filter === tab.id ? "bg-accent text-background" : "border border-border text-foreground hover:bg-surface"}`}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-12 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout="position"
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                exit="exit"
                whileHover={!isMobile && !prefersReducedMotion ? { 
                  y: -4, 
                  scale: 1.01,
                  transition: { duration: 0.3, ease: "easeOut" }
                } : {}}
                className={`group relative flex flex-col ${project.gridSpan}`}
              >
                <div className="w-full h-full flex flex-col p-5 md:p-6 bg-surface/30 border border-border rounded-2xl transition-all duration-300 group-hover:bg-surface/60 group-hover:border-border/80 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="relative w-full aspect-video bg-surface border border-border rounded-xl overflow-hidden mb-5">
                    {project.imageUrl ? (
                      <motion.div 
                        className="w-full h-full"
                        variants={imageRevealVariants}
                      >
                        <motion.div 
                          className="w-full h-full relative"
                          whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.03, transition: { duration: 0.4, ease: "easeOut" } } : {}}
                        >
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover opacity-90 transition-opacity duration-400 group-hover:opacity-100"
                          />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        variants={imageRevealVariants}
                        className="w-full h-full"
                      >
                        <motion.div
                           className="w-full h-full absolute inset-0 bg-gradient-to-br from-surface to-secondary flex flex-col items-center justify-center opacity-80"
                           whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.03, transition: { duration: 0.4, ease: "easeOut" } } : {}}
                        >
                          <div className="w-1/3 aspect-square rounded-full bg-accent/5 blur-3xl absolute"></div>
                          <div className="text-2xl font-bold text-border/30 transform -rotate-12 select-none pointer-events-none text-center px-4">
                            {project.title.toUpperCase()}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <motion.h3 
                        className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300"
                        whileHover={!isMobile && !prefersReducedMotion ? { y: -1, transition: { duration: 0.2 } } : {}}
                      >
                        {project.title}
                      </motion.h3>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                      <span className="text-xs font-medium text-muted">{project.role}</span>
                      <span className="w-1 h-1 rounded-full bg-border"></span>
                      <span className="text-xs font-medium text-muted">{project.year}</span>
                    </div>
                    
                    <p className="text-muted text-base leading-relaxed mb-6">
                      {project.shortDescription}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-4">
                      <motion.div
                        whileHover={!isMobile && !prefersReducedMotion ? { 
                          y: -1, 
                          scale: 1.02,
                          transition: { duration: 0.25, ease: "easeOut" } 
                        } : {}}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link 
                          href={`/projects/${project.slug}`} 
                          className="inline-flex items-center justify-center px-6 py-2.5 text-sm rounded-full bg-accent text-background font-bold shadow-sm shrink-0"
                        >
                          View Project
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
