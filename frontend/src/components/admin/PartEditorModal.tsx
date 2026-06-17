'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, X, UploadCloud, Save, CheckCircle2, AlertTriangle } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/cms';

export interface Part {
  _id: string;
  name: string;
  category: string;
  condition: 'New' | 'Used';
  price: number;
  description: string;
  images: string[];
  inStock: boolean;
  vehicleCompatibility: string[];
  status: 'Draft' | 'Published' | 'Archived';
}

export const EMPTY_PART: Omit<Part, '_id'> = {
  name: '', category: '', condition: 'New',
  price: 0, description: '', images: [],
  inStock: true, vehicleCompatibility: [], status: 'Draft',
};

interface PartEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  partToEdit: Part | null;
  initialCategory?: string;
  subcategories?: string[];
}

export function PartEditorModal({ isOpen, onClose, onSave, partToEdit, initialCategory, subcategories }: PartEditorModalProps) {
  const [formData, setFormData] = useState<Omit<Part, '_id'>>(EMPTY_PART);
  const [category, setCategory] = useState(initialCategory ?? '');
  const [subcategory, setSubcategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [compatInput, setCompatInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (subcategories && subcategories.length > 0) {
      setSubcategory(subcategories[0]);
    } else {
      setSubcategory('');
    }
  }, [category, subcategories]);

  useEffect(() => {
    if (isOpen) {
      if (partToEdit) {
        setFormData({ ...partToEdit });
      } else {
        setFormData({ ...EMPTY_PART, category: initialCategory ?? '' });
      }
      setCompatInput('');
      setImageInput('');
    }
  }, [isOpen, partToEdit, initialCategory]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.description) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        category,
        ...(subcategory ? { subcategory } : {}),
      };
      
      const url = partToEdit ? `${API_BASE}/parts/${partToEdit._id}` : `${API_BASE}/parts`;
      const method = partToEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        onSave();
        onClose();
      } else {
        showToast(data.message || 'Failed to save part', 'error');
      }
    } catch (error) {
      showToast('Error saving part', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const addCompatibility = () => {
    if (compatInput.trim() && !formData.vehicleCompatibility.includes(compatInput.trim())) {
      setFormData(prev => ({ ...prev, vehicleCompatibility: [...prev.vehicleCompatibility, compatInput.trim()] }));
      setCompatInput('');
    }
  };

  const removeCompatibility = (compat: string) => {
    setFormData(prev => ({ ...prev, vehicleCompatibility: prev.vehicleCompatibility.filter(c => c !== compat) }));
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
    fd.append('category', 'parts');
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
          <h2 className="text-xl font-bold text-white">{partToEdit ? 'Edit Part' : 'New Part'}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
          <input
            type="text"
            value={category}
            readOnly
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          />
        </div>
        
        {subcategories && subcategories.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-1">Subcategory</label>
            <select
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            >
              {subcategories.map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Part Name *</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="e.g. Heavy Duty Leaf Springs" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Category *</label>
            <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="e.g. Suspension" />
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
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">In Stock</label>
            <select value={formData.inStock ? "true" : "false"} onChange={e => setFormData({...formData, inStock: e.target.value === "true"})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors">
              <option value="true">Yes</option>
              <option value="false">No</option>
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
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none h-24" placeholder="Describe this part..." />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Vehicle Compatibility</label>
          <div className="flex gap-2 mb-2">
            <input value={compatInput} onChange={e => setCompatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCompatibility()}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Add model (e.g., Hilux 2016+)" />
            <Button onClick={addCompatibility} type="button" variant="outline" className="h-11 border-zinc-700 hover:bg-zinc-800">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.vehicleCompatibility.map(compat => (
              <span key={compat} className="inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-xs text-zinc-300">
                {compat} <button onClick={() => removeCompatibility(compat)} className="text-zinc-500 hover:text-red-400 ml-1"><X size={12} /></button>
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

        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-700">
          <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Saving...' : (partToEdit ? 'Update Part' : 'Create Part')}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default PartEditorModal;
