"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

import portfolioData from "@/data/portfolio.json";

const LinkedinIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactInfo = portfolioData.contact || {
    email: "hello@example.com",
    phone: "+91 98765 43210",
    location: "Chennai, Tamil Nadu",
    whatsappLink: "#"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative z-10 w-full border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Centered Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h4 className="text-accent font-bold uppercase tracking-wider text-sm mb-4">Contact</h4>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6">Get in Touch</h2>
          <p className="text-xl text-muted">Open to new opportunities, creative collaborations, and meaningful conversations about technology, design, and innovation.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form (Now on Right visually on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 lg:order-2"
          >

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground flex gap-1">Name <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground flex gap-1">Email <span className="text-accent">*</span></label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-foreground flex gap-1">Phone Number <span className="text-accent">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none hover:border-foreground/40 hover:shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20 focus:shadow-md transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground flex gap-1">Message <span className="text-accent">*</span></label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-surface/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none hover:border-foreground/40 hover:shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20 focus:shadow-md transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background font-bold text-lg py-5 rounded-xl hover:bg-accent hover:shadow-lg transition-all duration-300 mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Direct Access (Now on Left visually on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center h-full order-2 lg:order-1"
          >
            
            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* WhatsApp */}
              <div className="bg-surface/30 border border-border rounded-3xl p-6 transition-all group">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] group-hover:bg-[#10B981] group-hover:text-background transition-colors">
                    <MessageCircle size={20} />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-1">WhatsApp</h4>
                <p className="text-sm text-muted">{contactInfo.phone}</p>
              </div>

              {/* Email */}
              <div className="bg-surface/30 border border-border rounded-3xl p-6 transition-all group">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-background transition-colors">
                    <Mail size={20} />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-1">Email</h4>
                <p className="text-sm text-muted truncate">{contactInfo.email}</p>
              </div>

              {/* Direct Call */}
              <div className="bg-surface/30 border border-border rounded-3xl p-6 transition-all group">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-background transition-colors">
                    <Phone size={20} />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-1">Direct Call</h4>
                <p className="text-sm text-muted">{contactInfo.phone}</p>
              </div>

              {/* Location */}
              <div className="bg-surface/30 border border-border rounded-3xl p-6 transition-all">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
                    <MapPin size={20} />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-1">Location</h4>
                <p className="text-sm text-muted">{contactInfo.location}</p>
              </div>
              
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
