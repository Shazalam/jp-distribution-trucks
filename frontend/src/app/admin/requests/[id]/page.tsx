"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, MapPin, Building, Target, Clock, MessageSquare, AlertTriangle, Save, CheckCircle2, Trash2 } from "lucide-react";

export default function LeadDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/requests/${id}`);
      const data = await res.json();
      if (data.success) {
        setLead(data.data);
        setStatus(data.data.status);
      }
    } catch (error) {
      console.error("Error fetching lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setSaveMessage("Status updated!");
        setTimeout(() => setSaveMessage(""), 3000);
        fetchLead(); // refresh history
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/requests/${id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote })
      });
      if (res.ok) {
        setNewNote("");
        setSaveMessage("Note added!");
        setTimeout(() => setSaveMessage(""), 3000);
        fetchLead(); // refresh notes
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to completely delete this lead? This cannot be undone.")) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/requests/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/requests");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete lead");
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500 p-8 text-center">Loading Lead Details...</div>;
  }

  if (!lead) {
    return <div className="text-red-500 p-8 text-center">Lead not found.</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/requests" className="p-2 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-lg text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black uppercase tracking-tight text-white">{lead.requestId}</h1>
              {lead.isDuplicate && (
                <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Duplicate
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">Submitted on {new Date(lead.createdAt).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {saveMessage && (
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> {saveMessage}
            </div>
          )}
          <button 
            onClick={handleDelete}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-500 rounded-lg text-sm font-bold transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete Lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Customer & Source */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Customer Info Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Customer Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Full Name</div>
                  <div className="text-white font-medium">{lead.customerName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address</div>
                  <a href={`mailto:${lead.email}`} className="text-blue-400 hover:text-blue-300 font-medium">{lead.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Phone Number</div>
                  <a href={`tel:${lead.phone}`} className="text-blue-400 hover:text-blue-300 font-medium">{lead.phone}</a>
                </div>
              </div>
              {lead.companyName && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Company</div>
                    <div className="text-white font-medium">{lead.companyName}</div>
                  </div>
                </div>
              )}
              {lead.country && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Location</div>
                    <div className="text-white font-medium">{lead.city ? `${lead.city}, ` : ''}{lead.country}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Source Tracking Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Source Tracking</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Form Type</div>
                <div className="text-white font-medium">{lead.formType}</div>
              </div>
              {lead.sourcePage && (
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Page Origin</div>
                  <div className="text-white font-medium">{lead.sourcePage} {lead.sourceSection ? `> ${lead.sourceSection}` : ''}</div>
                </div>
              )}
              {lead.clickedButton && (
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Button Clicked</div>
                  <div className="text-red-400 font-mono text-xs mt-1 bg-red-500/10 inline-block px-2 py-1 rounded">{lead.clickedButton}</div>
                </div>
              )}
              {lead.referrerUrl && (
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Referrer</div>
                  <div className="text-gray-400 text-xs truncate" title={lead.referrerUrl}>{lead.referrerUrl}</div>
                </div>
              )}
              {lead.duplicateReason && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg mt-4">
                  <div className="text-[10px] text-yellow-500 uppercase tracking-widest font-bold flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3 h-3" /> Duplicate Warning
                  </div>
                  <div className="text-xs text-yellow-100">{lead.duplicateReason}</div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Request & CRM */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Request Details */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" /> Request Details
              </h3>
              <span className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${
                lead.priority === 'Urgent' || lead.priority === 'High Value Lead' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                lead.priority === 'Bulk Order' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' :
                'bg-gray-800 text-gray-300 border-gray-700'
              }`}>
                Priority: {lead.priority}
              </span>
            </div>
            
            <div className="space-y-6">
              {/* The big target item */}
              {(lead.selectedVehicle || lead.selectedBuild || lead.selectedPart) && (
                <div className="bg-[#111] border border-white/5 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Requested Product</div>
                    <div className="text-lg font-bold text-white">{lead.selectedVehicle || lead.selectedBuild || lead.selectedPart}</div>
                  </div>
                  {lead.quantity && (
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Quantity</div>
                      <div className="text-lg font-bold text-white">{lead.quantity} Units</div>
                    </div>
                  )}
                </div>
              )}

              {/* Message */}
              {lead.message && (
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Customer Message
                  </div>
                  <div className="bg-[#111] border border-white/5 p-4 rounded-lg text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {lead.message}
                  </div>
                </div>
              )}

              {/* Extra Details Grid */}
              {(lead.usageType || lead.budgetRange || lead.timeline || lead.shippingRequirement) && (
                <div className="grid grid-cols-2 gap-4">
                  {lead.usageType && (
                    <div className="bg-[#111] p-3 rounded border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Usage Type</div>
                      <div className="text-sm text-white">{lead.usageType}</div>
                    </div>
                  )}
                  {lead.budgetRange && (
                    <div className="bg-[#111] p-3 rounded border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Budget Range</div>
                      <div className="text-sm text-green-400 font-bold">{lead.budgetRange}</div>
                    </div>
                  )}
                  {lead.timeline && (
                    <div className="bg-[#111] p-3 rounded border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Timeline</div>
                      <div className="text-sm text-white flex items-center gap-1"><Clock className="w-3 h-3 text-gray-500" /> {lead.timeline}</div>
                    </div>
                  )}
                  {lead.shippingRequirement && (
                    <div className="bg-[#111] p-3 rounded border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Shipping</div>
                      <div className="text-sm text-white">{lead.shippingRequirement}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CRM Actions */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-4 mb-4">CRM Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Update */}
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Lead Pipeline Status</label>
                <div className="flex gap-2">
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="New">New</option>
                    <option value="Viewed">Viewed</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Quote Sent">Quote Sent</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button 
                    onClick={handleUpdateStatus}
                    disabled={isSaving || status === lead.status}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-500 text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Add Internal Note</label>
                <div className="flex gap-2">
                  <textarea 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="E.g., Called customer, waiting for response..."
                    className="flex-1 bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-red-500 h-20 resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleAddNote}
                    disabled={isSaving || !newNote.trim()}
                    className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Note
                  </button>
                </div>
              </div>

              {/* Notes History */}
              <div className="md:col-span-2 space-y-2 mt-4">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Internal Notes History</label>
                <div className="bg-[#111] border border-white/5 rounded-lg p-4 max-h-[300px] overflow-y-auto font-mono text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
                  {lead.internalNotes ? lead.internalNotes : "No internal notes yet."}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
