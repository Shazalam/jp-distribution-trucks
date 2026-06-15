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

const API_BASE = 'http://localhost:5000/api/cms';

interface Truck {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: 'New' | 'Used';
  type: 'Import' | 'Custom Build' | 'Standard';
  description: string;
  features: string[];
  images: string[];
  stockStatus: 'Available' | 'Sold' | 'Reserved';
  status: 'Draft' | 'Published' | 'Archived';
}

const EMPTY_TRUCK: Omit<Truck, '_id'> = {
  title: '', brand: 'Toyota', model: '', year: new Date().getFullYear(),
  price: 0, condition: 'New', type: 'Import', description: '',
  features: [], images: [], stockStatus: 'Available', status: 'Draft',
};

export default function TrucksCMSDashboard() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const [formData, setFormData] = useState<Omit<Truck, '_id'>>(EMPTY_TRUCK);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTrucks = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/trucks`);
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
    setFormData({ ...EMPTY_TRUCK });
    setFeatureInput('');
    setImageInput('');
    setShowForm(true);
  };

  // ─── EDIT ───
  const handleEdit = (truck: Truck) => {
    setEditingTruck(truck);
    setFormData({
      title: truck.title, brand: truck.brand, model: truck.model,
      year: truck.year, price: truck.price, condition: truck.condition,
      type: truck.type, description: truck.description, features: [...truck.features],
      images: [...truck.images], stockStatus: truck.stockStatus, status: truck.status,
    });
    setFeatureInput('');
    setImageInput('');
    setShowForm(true);
  };

  // ─── SAVE (Create or Update) ───
  const handleSave = async () => {
    if (!formData.title || !formData.model || !formData.description) {
      showToast('Title, Model, and Description are required', 'error');
      return;
    }
    setIsSaving(true);
    try {
      const url = editingTruck ? `${API_BASE}/trucks/${editingTruck._id}` : `${API_BASE}/trucks`;
      const method = editingTruck ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingTruck ? 'Truck updated successfully' : 'Truck created successfully');
        setShowForm(false);
        fetchTrucks();
      } else {
        showToast(data.message || 'Save failed', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setIsSaving(false);
    }
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

  // ─── FEATURE & IMAGE HELPERS ───
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };
  const removeFeature = (idx: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  };
  const addImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };
  const removeImage = (idx: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  // ─── CLOUDINARY UPLOAD ───
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('category', 'trucks');
    try {
      const res = await fetch(`${API_BASE}/media/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }));
        showToast('Image uploaded to Cloudinary');
      } else {
        showToast(data.message || 'Upload failed', 'error');
      }
    } catch {
      showToast('Upload failed', 'error');
    }
  };

  const statusColor = (s: string) => {
    if (s === 'Published') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (s === 'Archived') return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  // ═══════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════

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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-3xl w-full mx-4 shadow-2xl">

            {/* Form Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-700 pb-4">
              <h2 className="text-xl font-bold">{editingTruck ? 'Edit Truck' : 'New Truck'}</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-white"><X size={20} /></button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Title *</label>
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Hilux Revo Adventure" />
              </div>
              {/* Brand */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Brand</label>
                <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Toyota" />
              </div>
              {/* Model */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Model *</label>
                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Hilux Revo" />
              </div>
              {/* Year */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Year</label>
                <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
              </div>
              {/* Price */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Price ($)</label>
                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
              </div>
              {/* Condition */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Condition</label>
                <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value as 'New' | 'Used'})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              {/* Type */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
                  <option value="Import">Import</option>
                  <option value="Custom Build">Custom Build</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
              {/* Stock Status */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Stock Status</label>
                <select value={formData.stockStatus} onChange={e => setFormData({...formData, stockStatus: e.target.value as any})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              {/* Status */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">CMS Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Description *</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none h-24" placeholder="Describe this truck..." />
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Features</label>
              <div className="flex gap-2 mb-3">
                <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg h-10 px-4 text-white text-sm focus:outline-none focus:border-red-500" placeholder="e.g. 2.8L Turbo Diesel" />
                <Button type="button" onClick={addFeature} className="bg-zinc-700 hover:bg-zinc-600 text-white h-10 px-4"><Plus size={16} /></Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((f, i) => (
                  <span key={i} className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-300 flex items-center gap-2">
                    {f} <button onClick={() => removeFeature(i)} className="text-zinc-500 hover:text-red-400"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="mb-8">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Images <span className="text-blue-400">(4:3 ratio recommended)</span></label>
              
              {/* Upload from file */}
              <div className="mb-3">
                <label className="flex items-center gap-2 bg-zinc-800 border border-dashed border-zinc-600 rounded-lg p-4 cursor-pointer hover:border-red-500 transition-colors">
                  <UploadCloud size={18} className="text-zinc-400" />
                  <span className="text-sm text-zinc-400">Upload to Cloudinary</span>
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>

              {/* Or paste URL */}
              <div className="flex gap-2 mb-3">
                <input value={imageInput} onChange={e => setImageInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg h-10 px-4 text-white text-sm focus:outline-none focus:border-red-500" placeholder="Or paste Cloudinary URL..." />
                <Button type="button" onClick={addImage} className="bg-zinc-700 hover:bg-zinc-600 text-white h-10 px-4"><Plus size={16} /></Button>
              </div>

              {/* Image previews */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-zinc-700 group">
                    <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end border-t border-zinc-700 pt-6">
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-white">Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white gap-2 min-w-[140px]">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isSaving ? 'Saving...' : (editingTruck ? 'Update Truck' : 'Create Truck')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/*  MAIN DASHBOARD                        */}
      {/* ═══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trucks CMS</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage all your vehicle listings. {trucks.length} truck{trucks.length !== 1 ? 's' : ''} total.</p>
          </div>
          <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            <Plus size={18} /> New Truck
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
            <p className="text-lg font-semibold">No trucks found</p>
            <p className="text-sm">Click &quot;New Truck&quot; to add your first listing.</p>
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

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
