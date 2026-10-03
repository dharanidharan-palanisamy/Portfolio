"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Image as ImageIcon, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FolderGit2, 
  BookOpen, 
  Link as LinkIcon, 
  Mail, 
  Settings, 
  LogOut,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Hero", href: "/admin/hero", icon: ImageIcon },
  { name: "About", href: "/admin/about", icon: FileText },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Skills", href: "/admin/skills", icon: Award },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Social Links", href: "/admin/social-links", icon: LinkIcon },
  { name: "Contact", href: "/admin/contact", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#111111] text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 bg-[#111111] text-[#A1A1AA] flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/admin/dashboard" className="text-xl font-bold text-white tracking-tight">
            Dharani Admin
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-[#D8FF3E]/10 text-[#D8FF3E]" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-[#D8FF3E]" : "text-[#737373]"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <ExternalLink size={20} className="text-[#737373]" />
            View Portfolio
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
