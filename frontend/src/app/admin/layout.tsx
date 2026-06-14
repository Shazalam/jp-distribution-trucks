"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut, Package, Truck, FileText, Globe, Search, ClipboardList } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/requests", icon: LayoutDashboard },
    { name: "General Quotes", href: "/admin/requests?filter=general", icon: ClipboardList },
    { name: "Vehicle Quotes", href: "/admin/requests?filter=quotes", icon: Truck },
    { name: "Parts Requests", href: "/admin/requests?filter=parts", icon: Package },
    { name: "Special Parts Locator", href: "/admin/requests?filter=special-parts", icon: Search },
    { name: "Wholesale Enquiry", href: "/admin/requests?filter=wholesale", icon: Globe },
  ];

  const handleLogout = () => {
    // Basic clearing of cookie. In a real app, you'd call an API to clear the httpOnly cookie.
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/admin/login";
  };

  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans text-gray-300">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            JP
          </div>
          <span className="font-bold uppercase tracking-widest text-sm text-white">Admin Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = currentFilter 
              ? item.href.includes(`filter=${currentFilter}`)
              : item.href === "/admin/requests";
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-red-600/10 text-red-500 border border-red-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-red-500" : "text-gray-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur flex items-center justify-between px-6 z-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Lead Management CRM
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
