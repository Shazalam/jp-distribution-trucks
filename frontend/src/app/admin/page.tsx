"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Truck, Settings, MessageSquare, Users, LogOut, PackageSearch, Activity } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);

  useEffect(() => {
    if (activeTab === "quotes") {
      setIsLoadingQuotes(true);
      fetch("http://localhost:5000/api/quotes")
        .then(res => res.json())
        .then(data => {
          setQuotes(data);
          setIsLoadingQuotes(false);
        })
        .catch(err => {
          console.error("Failed to fetch quotes:", err);
          setIsLoadingQuotes(false);
        });
    }
  }, [activeTab]);

  useEffect(() => {
    // Simple auth check
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "trucks", label: "Trucks Inventory", icon: <Truck size={20} /> },
    { id: "parts", label: "Parts Catalog", icon: <Settings size={20} /> },
    { id: "quotes", label: "Quote Requests", icon: <MessageSquare size={20} /> },
    { id: "special", label: "Special Parts", icon: <PackageSearch size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111111] border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <span className="text-2xl font-extrabold text-white italic">JP <span className="text-red-600">ADMIN</span></span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                activeTab === item.id 
                  ? "bg-red-600 text-white" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold text-gray-400 hover:bg-red-900/30 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your business operations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/20">
              <Activity size={14} /> Systems Online
            </span>
          </div>
        </header>

        {/* Dashboard Content area */}
        <div className="bg-[#111111] border border-white/10 rounded-xl min-h-[600px] p-6 shadow-xl">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Active Trucks", value: "24", icon: <Truck size={24} className="text-red-500" /> },
                { label: "Parts in Stock", value: "1,432", icon: <Settings size={24} className="text-red-500" /> },
                { label: "Pending Quotes", value: "12", icon: <MessageSquare size={24} className="text-yellow-500" /> },
                { label: "Special Requests", value: "5", icon: <PackageSearch size={24} className="text-blue-500" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-400 text-sm font-semibold">{stat.label}</h3>
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quotes" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Quote Requests</h2>
                <button onClick={() => {
                  setIsLoadingQuotes(true);
                  fetch("http://localhost:5000/api/quotes")
                    .then(res => res.json())
                    .then(data => { setQuotes(data); setIsLoadingQuotes(false); });
                }} className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Refresh</button>
              </div>

              {isLoadingQuotes ? (
                <div className="text-center py-20 text-gray-500">Loading quotes...</div>
              ) : quotes.length === 0 ? (
                <div className="text-center py-20 text-gray-500">No quote requests found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400">
                    <thead className="text-xs uppercase bg-[#0a0a0a] text-gray-500 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Requested Part</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote) => (
                        <tr key={quote._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(quote.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{quote.name}</div>
                            <div className="text-xs text-gray-500">{quote.email}</div>
                            <div className="text-xs text-gray-500">{quote.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-red-500">{quote.partName}</div>
                            <div className="text-xs">{quote.partCategory}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full font-bold uppercase">{quote.status || 'pending'}</span>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate" title={quote.message || quote.details}>
                            {quote.message || quote.details || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "quotes" && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center">
                <Settings size={48} className="text-gray-600 mx-auto mb-4 animate-spin-slow" />
                <h3 className="text-xl font-bold text-white mb-2">Module Under Construction</h3>
                <p className="text-gray-400 max-w-sm">The {activeTab} management interface is currently being connected to the backend APIs.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
