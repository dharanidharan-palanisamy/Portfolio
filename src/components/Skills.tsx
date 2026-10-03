"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import portfolioData from "@/data/portfolio.json";

// Extracted Parallax Card Component
const ParallaxCard = ({ category, isMobile, prefersReducedMotion }: { category: any, isMobile: boolean, prefersReducedMotion: boolean | null }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the parallax
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  // Map mouse movement to very subtle card translation (-3px to 3px)
  const translateX = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position relative to card center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const easing = [0.22, 1, 0.36, 1] as const;

  // Staggered pills variants
  const pillVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, y: prefersReducedMotion ? 0 : 6 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: easing } 
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { 
          opacity: 0, 
          y: prefersReducedMotion ? 0 : (isMobile ? 20 : 35), 
          scale: prefersReducedMotion ? 1 : 0.97 
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            duration: 0.7, 
            ease: easing,
            when: "beforeChildren",
            staggerChildren: 0.06 // 60ms stagger for pills
          }
        }
      }}
      whileHover={!isMobile && !prefersReducedMotion ? "hover" : undefined}
      style={{
        x: (!isMobile && !prefersReducedMotion) ? translateX : 0,
        y: (!isMobile && !prefersReducedMotion) ? translateY : 0,
        transition: !prefersReducedMotion && !isMobile ? "border-color 0.3s ease, box-shadow 0.3s ease" : ""
      }}
      className="group relative p-8 rounded-2xl bg-surface border border-border flex flex-col h-full overflow-hidden"
    >
      <motion.div 
        className="relative z-10 w-full h-full flex flex-col"
        variants={{
          hover: !isMobile && !prefersReducedMotion ? {
            y: -5,
            scale: 1.015,
            transition: { duration: 0.3, ease: "easeOut" }
          } : {}
        }}
      >
        <h4 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border w-full">
          {category.title}
        </h4>
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill: string, index: number) => (
            <motion.div 
              key={index}
              variants={pillVariants}
              whileHover={!isMobile && !prefersReducedMotion ? { 
                y: -2, 
                scale: 1.03,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: { duration: 0.2, ease: "easeOut" }
              } : undefined}
              className="px-4 py-2 rounded-full border border-border bg-background text-foreground text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Dynamic Hover Border/Shadow */}
      <motion.div 
        className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none"
        variants={{
          hover: !isMobile && !prefersReducedMotion ? {
            borderColor: "rgba(var(--accent-rgb), 0.15)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
            transition: { duration: 0.3, ease: "easeOut" }
          } : {}
        }}
      />
    </motion.div>
  );
};


// Extracted Parallax Certification Card Component
const ParallaxCertCard = ({ cert, isMobile, prefersReducedMotion }: { cert: any, isMobile: boolean, prefersReducedMotion: boolean | null }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  const translateX = useTransform(springX, [-0.5, 0.5], [-2, 2]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const easing = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.a 
      href={cert.link}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { 
          opacity: 0, 
          y: prefersReducedMotion ? 0 : 30, 
          scale: prefersReducedMotion ? 1 : 0.98 
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            duration: 0.7, 
            ease: easing,
            when: "beforeChildren",
            staggerChildren: 0.08
          }
        }
      }}
      whileHover={!isMobile && !prefersReducedMotion ? "hover" : undefined}
      style={{
        x: (!isMobile && !prefersReducedMotion) ? translateX : 0,
        y: (!isMobile && !prefersReducedMotion) ? translateY : 0,
        transition: !prefersReducedMotion && !isMobile ? "border-color 0.28s ease-out, box-shadow 0.28s ease-out" : ""
      }}
      className="group block relative p-8 rounded-2xl bg-surface border border-border overflow-hidden h-full"
    >
      <motion.div 
        className="relative z-10 flex items-start justify-between gap-4 h-full"
        variants={{
          hover: !isMobile && !prefersReducedMotion ? {
            y: -4,
            scale: 1.01,
            transition: { duration: 0.28, ease: "easeOut" }
          } : {}
        }}
      >
        <div>
          <motion.h4 
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } }
            }}
            className="font-bold text-xl text-foreground mb-2 group-hover:text-foreground transition-colors"
          >
            {cert.title}
          </motion.h4>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } }
            }}
            className="flex items-center gap-3"
          >
            <p className="text-muted">{cert.provider}</p>
            {cert.year && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                <p className="text-muted text-sm font-medium">{cert.year}</p>
              </>
            )}
          </motion.div>
        </div>
        
        <motion.div 
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 text-foreground transition-colors duration-250 bg-transparent group-hover:bg-accent group-hover:border-accent group-hover:text-background"
          variants={{
            hover: !isMobile && !prefersReducedMotion ? {
              scale: 1.05,
              transition: { duration: 0.25, ease: "easeOut" }
            } : {}
          }}
        >
          <motion.div
            variants={{
              hover: !isMobile && !prefersReducedMotion ? {
                x: 3,
                y: -3,
                rotate: 9,
                transition: { duration: 0.25, ease: "easeOut" }
              } : {}
            }}
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dynamic Hover Border/Shadow */}
      <motion.div 
        className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none"
        variants={{
          hover: !isMobile && !prefersReducedMotion ? {
            borderColor: "rgba(var(--accent-rgb), 0.12)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
            transition: { duration: 0.28, ease: "easeOut" }
          } : {}
        }}
      />
    </motion.a>
  );
};


export default function Skills() {
  const flatSkills = portfolioData.skills || [];
  
  // Group skills by category
  const skillsCategories = Object.values(flatSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = { title: skill.category.toUpperCase(), skills: [] };
    }
    acc[skill.category].skills.push(skill.title);
    return acc;
  }, {} as Record<string, { title: string, skills: string[] }>));

  const certifications = portfolioData.certifications || [];
  
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const easing = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="py-24 md:py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-32">
        
        {/* Skills Section */}
        <div className="w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } }
              }}
              className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4"
            >
              Expertise
            </motion.h2>
            <motion.h3 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing, delay: 0.1 } }
              }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              SKILLS & TOOLS
            </motion.h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } } // Stagger the 3 cards by 120ms
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {skillsCategories.map((category) => (
              <ParallaxCard 
                key={category.title} 
                category={category} 
                isMobile={isMobile} 
                prefersReducedMotion={prefersReducedMotion} 
              />
            ))}
          </motion.div>
        </div>

        {/* Certifications Section */}
        <div className="w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-16"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } }
              }}
              className="text-sm font-semibold tracking-[0.2em] text-accent uppercase mb-4"
            >
              Qualifications
            </motion.h2>
            <motion.h3 
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easing, delay: 0.1 } }
              }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              CERTIFICATIONS
            </motion.h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert) => (
              <ParallaxCertCard 
                key={cert.title} 
                cert={cert} 
                isMobile={isMobile} 
                prefersReducedMotion={prefersReducedMotion} 
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
