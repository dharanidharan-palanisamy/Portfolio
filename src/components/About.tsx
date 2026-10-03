"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

export default function About() {
  const aboutData = portfolioData.about || {
    heading: "DESIGNING\nWITH PURPOSE.",
    description: "I'm Dharani Dharan, a UI/UX Designer and Web Developer focused on creating intuitive, meaningful and visually refined digital experiences.\n\nI combine design thinking, visual design, and technical expertise to transform complex ideas into simple, intuitive, and usable digital products.",
    tags: [
      "UI/UX Design",
      "Product Design",
      "Web Design",
      "Interaction Design",
      "Design Systems",
      "Frontend Understanding"
    ]
  };
  
  const skills = aboutData.tags || [];

  const easing = [0.22, 1, 0.36, 1] as const; // Premium elegant ease-out

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: easing } 
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: easing } 
    }
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: easing } 
    }
  };

  const headingLines = (aboutData.heading || "").split('\n');
  const descriptionParagraphs = (aboutData.description || "").split('\n\n');

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary relative z-10 overflow-hidden">
      
      {/* Subtle ambient background motion */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(var(--foreground-rgb), 0.03) 0%, transparent 60%)"
        }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 15, 
          ease: "easeInOut", 
          repeat: Infinity 
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        
        <motion.div 
          className="lg:col-span-6 order-2 lg:order-1"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <motion.div 
            className="w-full max-w-md mx-auto aspect-[4/5] bg-surface rounded-2xl border border-border overflow-hidden relative block"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image 
              src="/Dharanidharan.png" 
              alt="Dharani Dharan" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        
        <div className="lg:col-span-6 lg:pl-12 order-1 lg:order-2">
          
          {/* Main Heading */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-10 leading-[1.1]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {headingLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden pb-1">
                {line.split(' ').map((word, i) => (
                  <motion.span key={i} className="inline-block mr-[0.25em]" variants={wordVariants}>{word}</motion.span>
                ))}
              </span>
            ))}
          </motion.h2>
          
          {/* Description */}
          <motion.div 
            className="space-y-6 text-lg md:text-xl text-muted font-medium leading-relaxed mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
            }}
          >
            {descriptionParagraphs.map((paragraph, idx) => (
              <motion.p key={idx} variants={paragraphVariants}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
          
          {/* Skill Pills */}
          <motion.div 
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
            }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={skill}
                variants={pillVariants}
                whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
                className="px-5 py-2.5 rounded-full border border-border bg-background text-sm font-semibold text-foreground tracking-wide hover:border-accent hover:text-accent transition-colors cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
