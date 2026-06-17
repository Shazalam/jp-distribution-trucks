'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, X, UploadCloud, Save, CheckCircle2, AlertTriangle } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/cms';

export interface Truck {
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

export const EMPTY_TRUCK: Omit<Truck, '_id'> = {
  title: '', brand: 'Toyota', model: '', year: new Date().getFullYear(),
  price: 0, condition: 'New', type: 'Import', description: '',
  features: [], images: [], stockStatus: 'Available', status: 'Draft',
};

interface TruckEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  truckToEdit: Truck | null;
  fixedType?: string;
}

export function TruckEditorModal({ isOpen, onClose, onSave, truckToEdit, fixedType }: TruckEditorModalProps) {
  const [formData, setFormData] = useState<Omit<Truck, '_id'>>(EMPTY_TRUCK);
  const [isSaving, setIsSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (truckToEdit) {
        setFormData({ ...truckToEdit });
      } else {
        setFormData({ ...EMPTY_TRUCK, type: (fixedType || EMPTY_TRUCK.type) as any });
      }
      setFeatureInput('');
      setImageInput('');
    }
  }, [isOpen, truckToEdit, fixedType]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.model || !formData.description) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setIsSaving(true);
    try {
      const url = truckToEdit ? `${API_BASE}/trucks/${truckToEdit._id}` : `${API_BASE}/trucks`;
      const method = truckToEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onSave();
        onClose();
      } else {
        showToast(data.message || 'Save failed', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setIsSaving(false);
    }
  };

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
        showToast('Image uploaded');
      } else {
        showToast(data.message || 'Upload failed', 'error');
      }
    } catch {
      showToast('Upload failed', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-10">
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl border flex items-center gap-2 animate-[slideIn_0.3s_ease] ${
          toast.type === 'success' ? 'bg-green-900/80 border-green-500/40 text-green-300' : 'bg-red-900/80 border-red-500/40 text-red-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.message}
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-3xl w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-700 pb-4">
          <h2 className="text-xl font-bold text-white">{truckToEdit ? 'Edit Truck' : 'New Truck'}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Title *</label>
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Hilux Revo Adventure" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Brand</label>
            <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Toyota" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Model *</label>
            <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Hilux Revo" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Year</label>
            <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value) || 0})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Price ($)</label>
            <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Condition</label>
            <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value as 'New' | 'Used'})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          {!fixedType && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
                <option value="Import">Import</option>
                <option value="Custom Build">Custom Build</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
          )}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Stock Status</label>
            <select value={formData.stockStatus} onChange={e => setFormData({...formData, stockStatus: e.target.value as any})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">CMS Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Description *</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none h-24" placeholder="Describe this truck..." />
          </div>
        </div>

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

        <div className="mb-8">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Images <span className="text-blue-400">(4:3 ratio recommended)</span></label>
          
          <div className="mb-3">
            <label className="flex items-center gap-2 bg-zinc-800 border border-dashed border-zinc-600 rounded-lg p-4 cursor-pointer hover:border-red-500 transition-colors">
              <UploadCloud size={18} className="text-zinc-400" />
              <span className="text-sm text-zinc-400">Upload to Cloudinary</span>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="flex gap-2 mb-3">
            <input value={imageInput} onChange={e => setImageInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg h-10 px-4 text-white text-sm focus:outline-none focus:border-red-500" placeholder="Or paste Cloudinary URL..." />
            <Button type="button" onClick={addImage} className="bg-zinc-700 hover:bg-zinc-600 text-white h-10 px-4"><Plus size={16} /></Button>
          </div>

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

        <div className="flex gap-3 justify-end border-t border-zinc-700 pt-6">
          <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white gap-2 min-w-[140px]">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Saving...' : (truckToEdit ? 'Update Truck' : 'Create Truck')}
          </Button>
        </div>
      </div>
    </div>
  );
}
