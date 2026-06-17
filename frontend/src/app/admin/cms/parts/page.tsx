'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Loader2, Plus, Edit, Trash2, UploadCloud, X, Save, 
  Eye, EyeOff, Archive, CheckCircle2, AlertTriangle 
} from 'lucide-react';

import { PartEditorModal, Part } from '@/components/admin/PartEditorModal';

const API_BASE = 'http://localhost:5000/api/cms';

export default function PartsCatalogDashboard() {
  const [parts, setParts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchParts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/parts`);
      const data = await res.json();
      if (data.success) setParts(data.data);
    } catch (error) {
      showToast('Failed to fetch parts', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchParts(); }, [fetchParts]);

  // ─── CREATE ───
  const handleCreate = () => {
    setEditingPart(null);
    setShowForm(true);
  };

  // ─── EDIT ───
  const handleEdit = (part: Part) => {
    setEditingPart(part);
    setShowForm(true);
  };

  // ─── DELETE ───
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/parts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Part deleted');
        fetchParts();
      } else {
        showToast(data.message || 'Failed to delete part', 'error');
      }
    } catch {
      showToast('Error deleting part', 'error');
    }
    setDeleteConfirm(null);
  };

  // ─── STATUS TOGGLE ───
  const handleStatusChange = async (id: string, newStatus: 'Draft' | 'Published' | 'Archived') => {
    try {
      const res = await fetch(`${API_BASE}/parts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status changed to ${newStatus}`);
        fetchParts();
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ─── TOAST ─── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl border flex items-center gap-2 animate-[slideIn_0.3s_ease] ${
          toast.type === 'success' ? 'bg-green-900/80 border-green-500/40 text-green-300' : 'bg-red-900/80 border-red-500/40 text-red-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.message}
        </div>
      )}

      {/* ─── DELETE CONFIRM MODAL ─── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-500/20 p-2 rounded-lg"><Trash2 className="text-red-500" size={20} /></div>
              <h3 className="text-lg font-bold">Delete Part?</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-6">This action cannot be undone. The part will be permanently removed from the database.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setDeleteConfirm(null)} className="text-zinc-400 hover:text-white">Cancel</Button>
              <Button onClick={() => handleDelete(deleteConfirm)} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FORM MODAL ─── */}
      <PartEditorModal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        onSave={fetchParts} 
        partToEdit={editingPart} 
      />

      {/* ═══════════════════════════════════════ */}
      {/*  MAIN DASHBOARD                        */}
      {/* ═══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest mb-2">
            <UploadCloud size={14} /> Database / Inventory
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Parts Catalog Inventory</h1>
              <p className="text-zinc-400 text-sm mt-1">Manage your spare parts and accessories.</p>
            </div>
            <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white gap-2">
              <Plus size={16} /> Add Part
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {parts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <Loader2 size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No parts found</p>
            <p className="text-sm">Click &quot;Add Part&quot; to add your first listing.</p>
          </div>
        )}

        {parts.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-950/50 text-xs uppercase text-zinc-500 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-bold tracking-wider">Part</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Price</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Condition</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Stock</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {parts.map((part) => (
                    <tr key={part._id} className="hover:bg-zinc-800/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 relative rounded-md overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                            {part.images?.[0] ? (
                              <Image src={part.images[0]} alt={part.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                <UploadCloud size={16} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white mb-0.5">{part.name}</div>
                            <div className="text-xs text-zinc-500 flex items-center gap-2">
                              {part.condition} • {part.vehicleCompatibility?.length || 0} Models
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="bg-zinc-800/50 border-zinc-700 font-medium">
                          {part.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        ${part.price?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        {part.condition}
                      </td>
                      <td className="px-6 py-4">
                        {part.inStock ? (
                          <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-red-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge className={`border px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          part.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          part.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                          'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {part.status === 'Published' && <CheckCircle2 size={10} className="mr-1 inline -mt-0.5" />}
                          {part.status === 'Draft' && <Edit size={10} className="mr-1 inline -mt-0.5" />}
                          {part.status === 'Archived' && <Archive size={10} className="mr-1 inline -mt-0.5" />}
                          {part.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(part)} className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            <Edit size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(part._id)} className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
