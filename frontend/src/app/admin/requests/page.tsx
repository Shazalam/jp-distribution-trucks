"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Filter, Download, ArrowRight, User, Phone, Mail, MapPin } from "lucide-react";

function AdminDashboardContent() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, filter]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let url = "/api/requests";
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (search) params.append("search", search);
      
      if (filter === "quotes") {
        params.append("formType", "Custom Build Request"); // Since Custom Build is their main quote
      } else if (filter === "parts") {
        params.append("formType", "Parts Request");
      } else if (filter === "special-parts") {
        params.append("formType", "Special Parts Locator");
      } else if (filter === "wholesale") {
        params.append("formType", "Dealer Account Application");
      } else if (filter === "general") {
        params.append("formType", "General Quote Request");
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    window.open("/api/requests/export", "_blank");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Quoted": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Won": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Lost": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "Urgent" || priority === "High Value Lead") return "text-red-500";
    if (priority === "Bulk Order") return "text-orange-500";
    return "text-gray-400";
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Lead Management</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of all incoming requests</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-lg text-sm font-medium transition-colors text-white"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: leads.length, color: "border-blue-500/30" },
          { label: "New Leads", value: leads.filter(l => l.status === "New").length, color: "border-red-500/30" },
          { label: "Bulk Orders", value: leads.filter(l => l.priority === "Bulk Order").length, color: "border-orange-500/30" },
          { label: "Converted", value: leads.filter(l => l.status === "Won").length, color: "border-green-500/30" },
        ].map((card, i) => (
          <div key={i} className={`bg-[#0a0a0a] border-l-2 border-y border-r border-white/5 ${card.color} p-6 rounded-r-xl rounded-l-sm`}>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">{card.label}</div>
            <div className="text-3xl font-black text-white">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, email, ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchLeads()}
            className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-red-500"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Viewed">Viewed</option>
            <option value="Quoted">Quoted</option>
            <option value="Won">Won</option>
          </select>
          <button 
            onClick={fetchLeads}
            className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-500 text-sm font-medium rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-widest text-[10px]">ID / Date</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Customer</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Request Details</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Priority</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Status</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-widest text-[10px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-mono text-xs text-white">{lead.requestId}</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {lead.customerName}
                        {lead.isDuplicate && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 uppercase">Duplicate</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{lead.formType}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                        {lead.selectedVehicle || lead.selectedBuild || lead.selectedPart || "General Inquiry"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-bold uppercase tracking-wider ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link 
                        href={`/admin/requests/${lead._id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        View <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 p-8">Loading Dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
