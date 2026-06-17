"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, LogOut, Package, Truck, Globe, Search, 
  ClipboardList, ChevronDown, ChevronRight, FileText,
  Wrench, ShoppingCart, Boxes, MonitorSmartphone
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [webpagesOpen, setWebpagesOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [leadsOpen, setLeadsOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  const isActive = (href: string) => {
    if (href.includes("?filter=")) {
      const filter = href.split("filter=")[1];
      return currentFilter === filter;
    }
    return pathname === href;
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans text-gray-300">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-[#0a0a0a] border-r border-white/10 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            JP
          </div>
          <span className="font-bold uppercase tracking-widest text-sm text-white">Admin Portal</span>
        </div>
        
        <nav className="flex-1 p-3 overflow-y-auto space-y-1">

          {/* Dashboard */}
          <Link href="/admin/requests"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/admin/requests" && !currentFilter
                ? "bg-red-600/10 text-red-500 border border-red-500/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          {/* ──── WEBPAGES SECTION ──── */}
          <div className="pt-4">
            <button 
              onClick={() => setWebpagesOpen(!webpagesOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <span className="flex items-center gap-2"><MonitorSmartphone className="w-3.5 h-3.5" /> Webpages</span>
              {webpagesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            
            {webpagesOpen && (
              <div className="ml-2 space-y-0.5 mt-1 border-l border-white/5 pl-2">
                {[
                  { 
                    name: "Trucks Page", 
                    href: "/admin/cms/pages/trucks", 
                    icon: Truck,
                    subItems: [
                      { name: "Hero Banner", section: "hero" },
                      { name: "Mobility Ecosystem", section: "ecosystems" },
                      { name: "Featured Collections", section: "featured" },
                      { name: "Call To Action", section: "cta" }
                    ]
                  },
                  { 
                    name: "Custom Builds", 
                    href: "/admin/cms/pages/custom-builds", 
                    icon: Wrench,
                    subItems: [
                      { name: "Hero Banner", section: "hero" },
                      { name: "Build Process", section: "process" },
                      { name: "Featured Builds", section: "featured" },
                      { name: "Call To Action", section: "cta" }
                    ]
                  },
                  { 
                    name: "Parts & Supply", 
                    href: "/admin/cms/pages/parts", 
                    icon: ShoppingCart,
                    subItems: [
                      { name: "Hero Banner", section: "hero" },
                      { name: "Categories", section: "categories" },
                      { name: "Featured Parts", section: "featured" },
                      { name: "Call To Action", section: "cta" }
                    ]
                  },
                  { 
                    name: "Home Page", 
                    href: "/admin/cms/pages/home", 
                    icon: FileText,
                    subItems: [
                      { name: "Hero Banner", section: "hero" },
                      { name: "Mobility Ecosystems", section: "ecosystems" },
                      { name: "Featured Trucks", section: "featured" },
                      { name: "Testimonials", section: "testimonials" },
                      { name: "Call To Action", section: "cta" }
                    ]
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <div key={item.name}>
                      <Link href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? "bg-red-600/10 text-red-500 border border-red-500/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}>
                        <Icon className={`w-4 h-4 ${active ? "text-red-500" : "text-gray-600"}`} />
                        {item.name}
                      </Link>
                      {active && item.subItems && (
                        <div className="ml-7 mt-1 border-l border-white/10 pl-2 space-y-1">
                          {item.subItems.map(sub => {
                            const sectionParam = searchParams?.get("section");
                            const isSubActive = sectionParam ? sectionParam === sub.section : sub.section === 'hero';
                            return (
                              <Link key={sub.section} href={`${item.href}?section=${sub.section}`}
                                className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                  isSubActive
                                    ? "bg-red-600/10 text-red-400"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                }`}>
                                {sub.name}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ──── INVENTORY SECTION ──── */}
          <div className="pt-2">
            <button 
              onClick={() => setInventoryOpen(!inventoryOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <span className="flex items-center gap-2"><Boxes className="w-3.5 h-3.5" /> Inventory</span>
              {inventoryOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            
            {inventoryOpen && (
              <div className="ml-2 space-y-0.5 mt-1 border-l border-white/5 pl-2">
                {[
                  { name: "All Trucks", href: "/admin/cms/trucks", icon: Truck },
                  { name: "Custom Builds", href: "/admin/cms/custom-builds", icon: Wrench },
                  { name: "Parts Catalog", href: "/admin/cms/parts", icon: Package },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-red-600/10 text-red-500 border border-red-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}>
                      <Icon className={`w-4 h-4 ${active ? "text-red-500" : "text-gray-600"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ──── LEADS & QUOTES SECTION ──── */}
          <div className="pt-2">
            <button 
              onClick={() => setLeadsOpen(!leadsOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <span className="flex items-center gap-2"><ClipboardList className="w-3.5 h-3.5" /> Leads & Quotes</span>
              {leadsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            
            {leadsOpen && (
              <div className="ml-2 space-y-0.5 mt-1 border-l border-white/5 pl-2">
                {[
                  { name: "General Quotes", href: "/admin/requests?filter=general", icon: ClipboardList },
                  { name: "Vehicle Quotes", href: "/admin/requests?filter=quotes", icon: Truck },
                  { name: "Parts Requests", href: "/admin/requests?filter=parts", icon: Package },
                  { name: "Special Parts", href: "/admin/requests?filter=special-parts", icon: Search },
                  { name: "Wholesale", href: "/admin/requests?filter=wholesale", icon: Globe },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = item.href.includes("filter=") && currentFilter === item.href.split("filter=")[1];
                  return (
                    <Link key={item.name} href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-red-600/10 text-red-500 border border-red-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}>
                      <Icon className={`w-4 h-4 ${active ? "text-red-500" : "text-gray-600"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="p-3 border-t border-white/10">
          <button 
            onClick={() => {
              document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur flex items-center justify-between px-6 z-10 shrink-0">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">
            Content Management System
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
