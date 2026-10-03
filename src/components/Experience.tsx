"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/data/experience";
import portfolioData from "@/data/portfolio.json";

export default function Experience() {
  const education = portfolioData.education || [];
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const easing = [0.22, 1, 0.36, 1] as const; // Premium cubic-bezier

  // Header Variants
  const labelVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 15, 
      letterSpacing: prefersReducedMotion ? "0.2em" : "0.3em" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      letterSpacing: "0.2em",
      transition: { duration: 0.6, ease: easing } 
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 25, 
      filter: prefersReducedMotion ? "blur(0px)" : "blur(4px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easing, delay: 0.1 } 
    }
  };

  // Card Container Variants
  const cardContainerVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : (isMobile ? 20 : 45), 
      scale: prefersReducedMotion ? 1 : 0.97,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: easing,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  // Card Content Variants
  const contentRevealVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: easing } 
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.45, ease: easing } 
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : (isMobile ? 0 : -12) },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: easing } 
    }
  };

  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-32">
        
        {/* Experience Section */}
        <div className="w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-16"
          >
            <motion.h2 
              variants={labelVariants}
              className="text-sm font-semibold text-accent uppercase mb-4"
            >
              Career
            </motion.h2>
            <motion.h3 
              variants={headingVariants}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              EXPERIENCE
            </motion.h3>
          </motion.div>

          <div className="space-y-8 flex flex-col items-center">
            {experiences.map((exp) => (
              <motion.div 
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardContainerVariants}
                whileHover={!isMobile && !prefersReducedMotion ? "hover" : undefined}
                className="group relative w-full max-w-4xl p-6 md:p-10 rounded-2xl bg-surface border border-border overflow-hidden"
                style={!prefersReducedMotion && !isMobile ? { transition: "border-color 0.4s ease, box-shadow 0.4s ease" } : {}}
              >
                {/* Premium Depth Effect Background */}
                {!isMobile && !prefersReducedMotion && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 z-0 pointer-events-none"
                    variants={{
                      hover: { opacity: 1, transition: { duration: 0.5, ease: easing } }
                    }}
                  />
                )}

                {/* Hover transform overlay to keep border crisp */}
                <motion.div 
                  className="relative z-10 w-full h-full"
                  variants={{
                    hover: !isMobile && !prefersReducedMotion ? {
                      y: -4,
                      scale: 1.005,
                      transition: { duration: 0.35, ease: easing }
                    } : {}
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                    <div>
                      <motion.h4 variants={contentRevealVariants} className="font-bold text-2xl md:text-3xl text-foreground transition-colors group-hover:text-foreground">
                        {exp.position}
                      </motion.h4>
                      <motion.h5 variants={contentRevealVariants} className="text-xl font-medium text-muted mt-1">
                        {exp.company}
                      </motion.h5>
                    </div>
                    <motion.span 
                      variants={badgeVariants}
                      whileHover={!isMobile && !prefersReducedMotion ? { y: -1, scale: 1.01, transition: { duration: 0.25 } } : {}}
                      className="text-sm font-semibold text-accent/80 whitespace-nowrap bg-accent/10 px-4 py-2 rounded-full self-start md:self-center cursor-default"
                    >
                      {exp.duration}
                    </motion.span>
                  </div>
                  
                  <motion.ul className="space-y-3 mt-6">
                    {exp.responsibilities.map((resp, index) => (
                      <motion.li key={index} variants={bulletVariants} className="text-muted/90 flex items-start gap-3 text-lg">
                        <span className="text-accent mt-2 shrink-0 w-2 h-2 rounded-full bg-accent"></span>
                        {resp}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                
                {/* Dynamic Border/Shadow overlay handled by parent whileHover */}
                <motion.div 
                  className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none"
                  variants={{
                    hover: !isMobile && !prefersReducedMotion ? {
                      borderColor: "rgba(var(--accent-rgb), 0.15)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                      transition: { duration: 0.4, ease: easing }
                    } : {}
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-16"
          >
            <motion.h2 
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: prefersReducedMotion ? 0 : 12, 
                  letterSpacing: prefersReducedMotion ? "0.2em" : "0.3em" 
                },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  letterSpacing: "0.2em",
                  transition: { duration: 0.5, ease: easing } 
                }
              }}
              className="text-sm font-semibold text-accent uppercase mb-4"
            >
              Academic
            </motion.h2>
            <motion.h3 
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: prefersReducedMotion ? 0 : 25, 
                  filter: prefersReducedMotion ? "blur(0px)" : "blur(4px)" 
                },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: easing, delay: 0.1 } 
                }
              }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              EDUCATION
            </motion.h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;
              let xOffset = isLeft ? -35 : 35;
              if (isTablet) xOffset = isLeft ? -20 : 20;

              return (
                <motion.div 
                  key={edu.institution}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={!isMobile && !prefersReducedMotion ? "hover" : undefined}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: prefersReducedMotion || isMobile ? 0 : xOffset,
                      y: prefersReducedMotion ? 0 : (isMobile ? 25 : 0), 
                      scale: prefersReducedMotion ? 1 : 0.98,
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      y: 0, 
                      scale: 1,
                      transition: { 
                        duration: 0.75, 
                        ease: easing,
                        when: "beforeChildren",
                        staggerChildren: 0.08
                      } 
                    }
                  }}
                  className="group relative p-8 rounded-2xl bg-surface border border-border overflow-hidden"
                  style={!prefersReducedMotion && !isMobile ? { transition: "border-color 0.4s ease, box-shadow 0.4s ease" } : {}}
                >
                  {/* Subtle Card Depth Background */}
                  {!isMobile && !prefersReducedMotion && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-transparent to-accent/5 opacity-0 z-0 pointer-events-none"
                      variants={{
                        hover: { opacity: 1, transition: { duration: 0.4, ease: easing } }
                      }}
                    />
                  )}

                  <motion.div 
                    className="relative z-10 w-full h-full"
                    variants={{
                      hover: !isMobile && !prefersReducedMotion ? {
                        y: -5,
                        scale: 1.008,
                        transition: { duration: 0.35, ease: easing }
                      } : {}
                    }}
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } }
                      }}
                      className="text-sm font-semibold text-accent mb-2"
                    >
                      {edu.year}
                    </motion.div>
                    
                    <motion.h4 
                      variants={{
                        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } }
                      }}
                      whileHover={!isMobile && !prefersReducedMotion ? { y: -1, transition: { duration: 0.25 } } : {}}
                      className="font-bold text-xl md:text-2xl text-foreground mb-2"
                    >
                      {edu.degree}
                    </motion.h4>
                    
                    <motion.p 
                      variants={{
                        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } }
                      }}
                      className="text-lg text-muted transition-colors duration-250 group-hover:text-foreground/90"
                    >
                      {edu.institution}
                    </motion.p>
                  </motion.div>
                  
                  {/* Dynamic Border/Shadow overlay handled by parent whileHover */}
                  <motion.div 
                    className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none"
                    variants={{
                      hover: !isMobile && !prefersReducedMotion ? {
                        borderColor: "rgba(var(--accent-rgb), 0.12)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                        transition: { duration: 0.4, ease: easing }
                      } : {}
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
