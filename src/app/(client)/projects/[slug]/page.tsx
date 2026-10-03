"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projects, Project } from "@/data/projects";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Instantly scroll to top when page mounts
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    
    // Restore smooth scroll behavior
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);

    const found = projects.find((p) => p.slug === slug);
    if (found) {
      setProject(found);
    } else {
      router.push("/");
    }
  }, [slug, router]);

  if (!project) return null;

  return (
    <main className="min-h-screen bg-background text-foreground pb-32">
      
      {/* Navbar Minimal for Case Study */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link href="/#work" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors font-medium">
            <ArrowLeft size={18} />
            Back to Work
          </Link>
          <span className="text-foreground font-bold text-xl tracking-tight">Dharani Dharan.</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-6 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-semibold tracking-wider text-accent uppercase">
                  {project.category}
                </span>
                <span className="text-muted text-sm font-medium">{project.year}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2]">
                {project.title}
              </h1>
            </div>
            
            {project.liveUrl && (
              <Link 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-bold hover:bg-accent hover:text-background transition-colors duration-300 shadow-sm shrink-0 mb-2 md:mb-4"
              >
                Live Demo
                <ArrowUpRight size={18} className="ml-2" />
              </Link>
            )}
          </div>
          
          <p className="text-base md:text-xl text-muted max-w-4xl leading-relaxed mb-8">
            {project.shortDescription}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-border mb-12">
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-muted uppercase mb-2">Role</h4>
              <p className="text-foreground font-medium text-base">{project.role}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-muted uppercase mb-2">Timeline</h4>
              <p className="text-foreground font-medium text-base">{project.timeline || "3 Months"}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-xs font-semibold tracking-wider text-muted uppercase mb-2">Tools</h4>
              <p className="text-foreground font-medium text-base">{project.technologies.join(", ")}</p>
            </div>
          </div>
        </motion.div>

        {/* Large Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto aspect-video bg-surface rounded-2xl border border-border flex items-center justify-center overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-secondary"></div>
          <div className="absolute w-[80%] h-[80%] bg-background/50 rounded-xl border border-border/50 shadow-2xl backdrop-blur-sm transform rotate-[-2deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-700"></div>
          <div className="text-4xl font-bold text-border select-none absolute z-10">Hero Visual Preview</div>
        </motion.div>
      </section>

      {/* Case Study Content */}
      <section className="max-w-[900px] mx-auto px-6 py-10">
        
        <div className="space-y-20">
          {/* Challenge & Objective */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
              <p className="text-lg text-muted leading-relaxed">
                {project.challenge || "Users struggled with complex navigation and overwhelming data presentation. The previous system lacked intuitive user flows, causing significant drop-off rates and user frustration during critical tasks."}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">The Objective</h3>
              <p className="text-lg text-muted leading-relaxed">
                {project.objective || "To simplify the user journey, modernize the visual language, and create a scalable design system that could be easily adapted for future feature rollouts while maintaining high accessibility standards."}
              </p>
            </div>
          </motion.div>

          {/* Process */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8">Design Process</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {(project.process && project.process.length > 0 ? project.process : ['Discover', 'Define', 'Explore', 'Design', 'Validate', 'Deliver']).map((step, i) => (
                <div key={step} className="p-6 bg-surface border border-border rounded-xl">
                  <div className="text-accent text-sm font-bold tracking-wider mb-2">0{i + 1}</div>
                  <div className="text-lg font-bold text-foreground">{step}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  );
}
