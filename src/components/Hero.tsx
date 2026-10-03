"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { useState, useEffect } from "react";

import portfolioData from "@/data/portfolio.json";

const TITLES = [
  { prefix: "UI/UX", suffix: "Designer" },
  { prefix: "Full Stack", suffix: "Developer" },
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const heroData = portfolioData.hero || {
    greeting: "HELLO, I'M",
    name: "DHARANI DHARAN",
    title: "UI/UX Designer, Full Stack Developer",
    subtitle: "I design intuitive digital experiences and build modern web products that turn complex ideas into simple, engaging solutions.",
    primaryButtonText: "View Selected Work",
    secondaryButtonText: "Let's Work Together",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-muted uppercase">
              {heroData.greeting}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-[1.1] font-bold tracking-tight text-foreground mb-6 uppercase"
          >
            {heroData.name}<br />
            <div className="inline-flex relative min-h-[1.2em] whitespace-nowrap align-bottom">
              <AnimatePresence mode="wait">
                <motion.div
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                    <span className="text-muted font-semibold capitalize">{TITLES[titleIndex % TITLES.length].prefix}</span> <span className="text-accent italic font-semibold capitalize">{TITLES[titleIndex % TITLES.length].suffix}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted max-w-3xl mb-10 leading-relaxed"
          >
            {heroData.subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-center gap-5 mb-16 w-full sm:w-auto">
            <Link 
              href="#work" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background font-medium px-8 py-4 rounded-full hover:bg-accent transition-colors duration-300"
            >
              {heroData.primaryButtonText}
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="#contact" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-foreground border border-border font-medium px-8 py-4 rounded-full hover:border-foreground transition-colors duration-300 group"
            >
              {heroData.secondaryButtonText}
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-foreground border border-border font-medium px-8 py-4 rounded-full hover:border-foreground transition-colors duration-300 group"
            >
              Resume
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
          

        </motion.div>

        {/* Abstract Visual Element */}
        <motion.div 
          className="lg:col-span-5 h-[500px] lg:h-[600px] w-full relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="relative w-full h-full max-w-[500px] mx-auto flex items-center justify-center"
          >
            {/* Subtle rotating background gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 blur-[100px] rounded-full animate-pulse pointer-events-none"></div>
            
            <div className="w-full h-[80%] flex flex-col md:flex-row items-center justify-center relative z-10">

              {/* Portrait Image */}
              <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden z-10 shadow-2xl border-4 border-white/5">
                <Image 
                  src="/Dharanidharan.png" 
                  alt="Dharanidharan" 
                  width={500} 
                  height={500} 
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
