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

import { TruckEditorModal, Truck, EMPTY_TRUCK } from '@/components/admin/TruckEditorModal';

const API_BASE = 'http://localhost:5000/api/cms';

export default function CustomBuildsDashboard() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTrucks = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/trucks?type=Custom%20Build`);
      const data = await res.json();
      if (data.success) setTrucks(data.data);
    } catch (error) {
      showToast('Failed to fetch trucks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchTrucks(); }, [fetchTrucks]);

  // ─── CREATE ───
  const handleCreate = () => {
    setEditingTruck(null);
    setShowForm(true);
  };

  // ─── EDIT ───
  const handleEdit = (truck: Truck) => {
    setEditingTruck(truck);
    setShowForm(true);
  };

  // ─── DELETE ───
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/trucks/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Truck deleted');
        fetchTrucks();
      } else {
        showToast(data.message || 'Delete failed', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    }
    setDeleteConfirm(null);
  };

  // ─── STATUS TOGGLE ───
  const handleStatusChange = async (id: string, newStatus: 'Draft' | 'Published' | 'Archived') => {
    try {
      const res = await fetch(`${API_BASE}/trucks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status changed to ${newStatus}`);
        fetchTrucks();
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const statusColor = (s: string) => {
    if (s === 'Published') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (s === 'Archived') return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
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
              <h3 className="text-lg font-bold">Delete Truck?</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-6">This action cannot be undone. The truck will be permanently removed from the database.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setDeleteConfirm(null)} className="text-zinc-400 hover:text-white">Cancel</Button>
              <Button onClick={() => handleDelete(deleteConfirm)} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FORM MODAL ─── */}
      <TruckEditorModal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        onSave={() => fetchTrucks()} 
        truckToEdit={editingTruck} 
        fixedType="Custom Build"
      />

      {/* ═══════════════════════════════════════ */}
      {/*  MAIN DASHBOARD                        */}
      {/* ═══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Custom Builds Inventory</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage your custom builds inventory.</p>
          </div>
          <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            <Plus size={16} /> New Custom Build
          </Button>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-sm text-blue-200">
          <strong>Cloudinary Upload Requirement:</strong> Truck Card images → <strong>4:3</strong> ratio. Hero backgrounds → <strong>16:9</strong> ratio.
        </div>

        {/* Empty State */}
        {trucks.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <Loader2 size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No custom builds found</p>
            <p className="text-sm">Click &quot;New Custom Build&quot; to add your first listing.</p>
          </div>
        )}

        {/* Truck Cards */}
        <div className="grid gap-4">
          {trucks.map((truck) => (
            <Card key={truck._id} className="bg-zinc-900 border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-5">
                <div className="h-16 w-24 relative rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  {truck.images?.[0] ? (
                    <Image src={truck.images[0]} alt={truck.title} fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No img</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-base">{truck.title}</h3>
                  <p className="text-zinc-400 text-sm">{truck.brand} {truck.model} ({truck.year}) • ${truck.price?.toLocaleString()}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{truck.type} • {truck.condition} • {truck.stockStatus}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge className={`border text-xs ${statusColor(truck.status)}`}>{truck.status}</Badge>

                <div className="flex items-center gap-1">
                  {/* Edit */}
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(truck)} className="hover:text-blue-400 text-zinc-400" title="Edit">
                    <Edit size={16} />
                  </Button>

                  {/* Publish / Unpublish */}
                  {truck.status !== 'Published' ? (
                    <Button variant="ghost" size="icon" onClick={() => handleStatusChange(truck._id, 'Published')} className="hover:text-green-400 text-zinc-400" title="Publish">
                      <Eye size={16} />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={() => handleStatusChange(truck._id, 'Draft')} className="hover:text-yellow-400 text-zinc-400" title="Unpublish">
                      <EyeOff size={16} />
                    </Button>
                  )}

                  {/* Archive */}
                  {truck.status !== 'Archived' && (
                    <Button variant="ghost" size="icon" onClick={() => handleStatusChange(truck._id, 'Archived')} className="hover:text-orange-400 text-zinc-400" title="Archive">
                      <Archive size={16} />
                    </Button>
                  )}

                  {/* Delete */}
                  <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(truck._id)} className="hover:text-red-500 text-zinc-400" title="Delete">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>


    </div>
  );
}
