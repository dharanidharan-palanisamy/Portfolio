import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { FolderGit2, Briefcase, Award, MessageSquare, Plus, Edit } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const overviewCards = [
    { title: "Total Projects", value: "6", icon: FolderGit2, href: "/admin/projects" },
    { title: "Experience", value: "2", icon: Briefcase, href: "/admin/experience" },
    { title: "Certifications", value: "3", icon: Award, href: "/admin/certifications" },
    { title: "Unread Messages", value: "0", icon: MessageSquare, href: "/admin/messages" },
  ];

  const quickActions = [
    { label: "Manage Projects", icon: Plus, href: "/admin/projects" },
    { label: "Manage Experience", icon: Plus, href: "/admin/experience" },
    { label: "Edit Profile", icon: Edit, href: "/admin/profile" },
    { label: "Edit Hero", icon: Edit, href: "/admin/hero" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#171717] mb-2">Welcome back, {session.user?.name?.split(' ')[0]}</h1>
        <p className="text-[#737373]">Manage your portfolio content and keep your profile up to date.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm hover:border-[#D8FF3E] transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#F7F7F8] rounded-xl text-[#171717] group-hover:bg-[#D8FF3E]/10 group-hover:text-[#D8FF3E] transition-colors">
                  <card.icon size={24} />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-[#171717] mb-1">{card.value}</h3>
              <p className="text-[#737373] font-medium text-sm">{card.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-[#171717] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link 
                key={action.label} 
                href={action.href}
                className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E5E5E5] hover:border-[#D8FF3E] hover:shadow-md transition-all group"
              >
                <div className="p-2 bg-[#F7F7F8] rounded-lg text-[#171717] group-hover:bg-[#D8FF3E] transition-colors">
                  <action.icon size={18} />
                </div>
                <span className="font-semibold text-[#171717]">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity (Placeholder for Phase 2) */}
        <div>
          <h2 className="text-xl font-bold text-[#171717] mb-6">Recent Activity</h2>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm space-y-6">
            <div className="relative pl-6 border-l-2 border-[#E5E5E5] space-y-6">
              
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 bg-[#D8FF3E] rounded-full border-4 border-white"></div>
                <p className="font-semibold text-[#171717]">Logged in</p>
                <p className="text-sm text-[#737373]">Just now</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 bg-[#E5E5E5] rounded-full border-4 border-white"></div>
                <p className="font-semibold text-[#171717]">Admin system initialized</p>
                <p className="text-sm text-[#737373]">Today</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
