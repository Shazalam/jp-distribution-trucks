'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Save, Loader2, Eye, Plus, X, GripVertical, 
  CheckCircle2, AlertTriangle, ChevronDown, ChevronRight,
  ImageIcon, Type, FileText, Trash2
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/cms';

interface Truck {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  status: string;
}

interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
}

interface PageSection {
  id: string;
  name: string;
  type: 'hero' | 'featured' | 'cta' | 'ecosystems' | 'testimonials';
  enabled: boolean;
  config: Record<string, any>;
  selectedTruckIds: string[];
}

const DEFAULT_SECTIONS: PageSection[] = [
  {
    id: 'hero', name: 'Hero Banner', type: 'hero', enabled: true,
    config: { 
      heading: 'YOUR JOURNEY.\nOUR COMMITMENT.', 
      subheading: 'We import, customize, and supply Toyota Hilux trucks and genuine parts from Thailand to Suriname and international markets.\nBuilt for adventure. Backed by trust. Delivered with care.', 
      backgroundImage: 'https://res.cloudinary.com/dd8a5dpnh/video/upload/f_auto,q_auto/v1781498582/jp-distribution/custom-builds/hero/custom-hero-bg.mp4' 
    },
    selectedTruckIds: [],
  },
  {
    id: 'ecosystems', name: 'Mobility Ecosystems', type: 'ecosystems', enabled: true,
    config: { 
      heading: 'Built For Every Ecosystem', 
      subheading: 'Discover how we tailor the Hilux for specific industries.',
      items: [
        { id: 1, title: "Adventure & Overland", desc: "Engineered for remote exploration.", icon: "Globe" }
      ]
    },
    selectedTruckIds: [],
  },
  {
    id: 'featured', name: 'Featured Trucks', type: 'featured', enabled: true,
    config: { heading: 'Featured Inventory', subheading: 'Explore our latest arrivals.' },
    selectedTruckIds: [],
  },
  {
    id: 'testimonials', name: 'Testimonials', type: 'testimonials', enabled: true,
    config: { 
      heading: 'Client Success Stories', 
      items: [
        { id: 1, name: "John Smith", company: "Overland Expeditions", quote: "Incredible service.", rating: 5 }
      ]
    },
    selectedTruckIds: [],
  },
  {
    id: 'cta', name: 'Call To Action', type: 'cta', enabled: true,
    config: { heading: 'Start Your Journey', subheading: 'Contact our team today.' },
    selectedTruckIds: [],
  },
];

export default function HomePageEditor() {
  return (
    <Suspense fallback={<div className="min-h-screen text-white p-8 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-red-500" /></div>}>
      <HomePageEditorContent />
    </Suspense>
  );
}

function HomePageEditorContent() {
  const searchParams = useSearchParams();
  const activeSectionId = searchParams?.get('section') || 'hero';

  const [sections, setSections] = useState<PageSection[]>(DEFAULT_SECTIONS);
  const [allTrucks, setAllTrucks] = useState<Truck[]>([]);
  const [showPicker, setShowPicker] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTrucks = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/trucks`);
      const data = await res.json();
      if (data.success) setAllTrucks(data.data);
    } catch { /* silent */ }
  }, []);

  const fetchPageConfig = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/pages/home`);
      const data = await res.json();
      if (data.success && data.data?.sections?.length > 0) {
        setSections(data.data.sections);
      }
    } catch { /* use defaults */ }
  }, []);

  useEffect(() => { 
    fetchTrucks(); 
    fetchPageConfig();
  }, [fetchTrucks, fetchPageConfig]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/pages/home`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Page configuration saved successfully');
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const updateSectionConfig = (id: string, key: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, config: { ...s.config, [key]: value } } : s));
  };

  const toggleTruckInSection = (sectionId: string, truckId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s;
      const exists = s.selectedTruckIds.includes(truckId);
      return {
        ...s,
        selectedTruckIds: exists
          ? s.selectedTruckIds.filter(id => id !== truckId)
          : [...s.selectedTruckIds, truckId]
      };
    }));
  };

  const selectAllTrucks = (sectionId: string) => {
    const publishedIds = allTrucks.filter(t => t.status === 'Published').map(t => t._id);
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, selectedTruckIds: publishedIds } : s));
  };

  const clearAllTrucks = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, selectedTruckIds: [] } : s));
  };

  const getSelectedTrucks = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return [];
    return allTrucks.filter(t => section.selectedTruckIds.includes(t._id));
  };

  const addEcosystemItem = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s;
      const items = s.config.items || [];
      const newId = items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
      return {
        ...s,
        config: {
          ...s.config,
          items: [...items, { id: newId, title: 'New Ecosystem', desc: '', icon: 'Globe', img: '', features: [], specs: {} }]
        }
      };
    }));
  };

  const updateEcosystemItem = (sectionId: string, itemId: number, key: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        config: {
          ...s.config,
          items: s.config.items.map((i: any) => i.id === itemId ? { ...i, [key]: value } : i)
        }
      };
    }));
  };

  const deleteEcosystemItem = (sectionId: string, itemId: number) => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        config: {
          ...s.config,
          items: s.config.items.filter((i: any) => i.id !== itemId)
        }
      };
    }));
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl border flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-green-900/80 border-green-500/40 text-green-300' : 'bg-red-900/80 border-red-500/40 text-red-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest mb-1">
            <FileText size={12} /> Webpages / Home Page
          </div>
          <h1 className="text-2xl font-bold">Home Page Editor</h1>
          <p className="text-zinc-400 text-sm mt-1">Configure sections, content, and layout for the public Home page.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="text-zinc-400 hover:text-white gap-2 border border-zinc-700">
              <Eye size={16} /> Preview Page
            </Button>
          </a>
          <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-950/20 border border-blue-900/40 rounded-lg p-4 mb-8 text-blue-200 text-sm flex items-center gap-2">
        <ImageIcon size={16} className="text-blue-400 shrink-0" />
        <span><strong>Home Page Media Requirements:</strong> Hero Background &rarr; 16:9 MP4 Video. Ecosystem & Testimonial Cards &rarr; 4:3 Image ratio.</span>
      </div>

      {/* Active Section Editor */}
      <div className="space-y-3">
        {(() => {
          const section = sections.find(s => s.id === activeSectionId);
          if (!section) return <div className="p-8 text-center text-zinc-500">Section not found</div>;
          
          return (
          <div className="w-full pb-12">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800 mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-2xl">{section.name}</h3>
                  <Badge className={`text-xs px-2 py-0.5 border ${section.enabled ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-800'}`}>
                    {section.enabled ? 'VISIBLE' : 'HIDDEN'}
                  </Badge>
                </div>
                <p className="text-zinc-500 text-sm mt-1.5 uppercase tracking-widest">{section.type} Section Editor</p>
              </div>
              <div className="flex items-center gap-4 bg-zinc-900/30 px-5 py-2.5 rounded-xl border border-zinc-800/50">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Section Visibility</span>
                <button 
                  onClick={() => toggleSection(section.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${section.enabled ? 'bg-green-600' : 'bg-zinc-700'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${section.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-10">
                
                {/* Section Content Fields */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3 flex items-center gap-2">
                    <Type size={14} /> Section Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.config.heading !== undefined && (
                      <div className={section.config.subheading !== undefined ? '' : 'md:col-span-2'}>
                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Heading</label>
                        <textarea 
                          value={section.config.heading} 
                          onChange={e => updateSectionConfig(section.id, 'heading', e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-base focus:outline-none focus:border-red-500 transition-colors resize-none h-16"
                        />
                      </div>
                    )}
                    {section.config.subheading !== undefined && (
                      <div>
                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Subheading</label>
                        <textarea 
                          value={section.config.subheading} 
                          onChange={e => updateSectionConfig(section.id, 'subheading', e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-base focus:outline-none focus:border-red-500 transition-colors resize-none h-20"
                        />
                      </div>
                    )}
                    {section.config.backgroundImage !== undefined && (
                      <div className="md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Background Video URL</label>
                        <input 
                          value={section.config.backgroundImage} 
                          onChange={e => updateSectionConfig(section.id, 'backgroundImage', e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg h-10 px-4 text-white text-base focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="https://res.cloudinary.com/..."
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Truck Selector (only for featured sections) */}
                {section.type === 'featured' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 mt-6">
                      <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-2">
                        <ImageIcon size={14} /> Select Trucks to Display
                      </h4>
                      <div className="flex gap-3 items-center">
                        <div className="flex gap-2">
                          <button onClick={() => selectAllTrucks(section.id)} className="text-[10px] text-blue-400 hover:text-blue-300 uppercase tracking-widest font-bold">Select All Published</button>
                          <span className="text-zinc-600">|</span>
                          <button onClick={() => clearAllTrucks(section.id)} className="text-[10px] text-zinc-400 hover:text-zinc-300 uppercase tracking-widest font-bold">Clear All</button>
                        </div>
                        <Button onClick={handleSave} disabled={isSaving} size="sm" className="h-7 text-[10px] uppercase font-bold bg-red-600 hover:bg-red-700 text-white ml-2">
                          {isSaving ? <Loader2 size={12} className="animate-spin mr-1" /> : <Save size={12} className="mr-1" />} Apply Selection
                        </Button>
                      </div>
                    </div>

                    {/* Selected trucks preview */}
                    {getSelectedTrucks(section.id).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {getSelectedTrucks(section.id).map(truck => (
                          <div key={truck._id} className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5">
                            <div className="w-8 h-6 relative rounded overflow-hidden shrink-0">
                              {truck.images?.[0] && <Image src={truck.images[0]} alt={truck.title} fill className="object-cover" sizes="32px" />}
                            </div>
                            <span className="text-xs text-zinc-300 font-medium">{truck.title}</span>
                            <button onClick={() => toggleTruckInSection(section.id, truck._id)} className="text-zinc-500 hover:text-red-400">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* All trucks grid picker */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-2">
                      {allTrucks.map(truck => {
                        const isSelected = sections.find(s => s.id === section.id)?.selectedTruckIds.includes(truck._id);
                        return (
                          <button
                            key={truck._id}
                            onClick={() => toggleTruckInSection(section.id, truck._id)}
                            className={`relative flex flex-col items-center p-3 rounded-xl border transition-all ${
                              isSelected
                                ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(220,38,38,0.15)]'
                                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center shadow-lg z-10">
                                <CheckCircle2 size={12} className="text-white" />
                              </div>
                            )}
                            <div className="w-full h-24 relative rounded-lg overflow-hidden mb-3 bg-zinc-950">
                              {truck.images?.[0] && <Image src={truck.images[0]} alt={truck.title} fill className="object-cover" sizes="200px" />}
                            </div>
                            <p className="text-xs font-semibold text-center leading-tight mb-1">{truck.title}</p>
                            <p className="text-[11px] text-zinc-400 font-medium">${truck.price?.toLocaleString()}</p>
                            <Badge className={`mt-2 text-[9px] px-2 border ${truck.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                              {truck.status}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Ecosystems Items Editor */}
                {section.type === 'ecosystems' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 border-t border-zinc-800 pt-5 mt-5">
                      <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-2">
                        <ImageIcon size={14} /> Ecosystem Cards
                      </h4>
                      <Button onClick={() => addEcosystemItem(section.id)} size="sm" variant="outline" className="h-8 border-dashed border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700">
                        <Plus size={14} className="mr-1" /> Add Card
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {section.config.items?.map((item: any, idx: number) => (
                        <div key={item.id || idx} className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 relative group">
                          <button onClick={() => deleteEcosystemItem(section.id, item.id)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 bg-zinc-900 rounded-full p-1 border border-zinc-800">
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Card Title</label>
                              <input 
                                value={item.title || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'title', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Icon Name (Lucide)</label>
                              <select 
                                value={item.icon || 'Globe'} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'icon', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                              >
                                <option value="Globe">Globe</option>
                                <option value="Package">Package</option>
                                <option value="Truck">Truck</option>
                                <option value="Wrench">Wrench</option>
                                <option value="Target">Target</option>
                                <option value="Settings">Settings</option>
                                <option value="ShieldCheck">ShieldCheck</option>
                                <option value="Pickaxe">Pickaxe</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Description</label>
                              <textarea 
                                value={item.desc || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'desc', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white text-base focus:outline-none focus:border-red-500 h-16 resize-none"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Image URL</label>
                              <input 
                                value={item.img || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'img', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Features (comma separated)</label>
                              <input 
                                value={Array.isArray(item.features) ? item.features.join(', ') : item.features || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'features', e.target.value.split(',').map((x: string) => x.trim()))}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                                placeholder="Feature 1, Feature 2, Feature 3"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Specs (Key: Value, Key: Value)</label>
                              <input 
                                value={item.specs ? Object.entries(item.specs).map(([k,v]) => `${k}: ${v}`).join(', ') : ''} 
                                onChange={e => {
                                  const specsStr = e.target.value;
                                  const specsObj: Record<string,string> = {};
                                  specsStr.split(',').forEach((pair: string) => {
                                    const [k, v] = pair.split(':').map((x: string) => x.trim());
                                    if (k && v) specsObj[k] = v;
                                  });
                                  updateEcosystemItem(section.id, item.id, 'specs', specsObj);
                                }}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                                placeholder="Payload: 950kg, Clearance: 11in"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Testimonials Editor */}
                {section.type === 'testimonials' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 border-t border-zinc-800 pt-5 mt-5">
                      <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-2">
                        <ImageIcon size={14} /> Testimonial Cards
                      </h4>
                      <Button onClick={() => addEcosystemItem(section.id)} size="sm" variant="outline" className="h-8 border-dashed border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700">
                        <Plus size={14} className="mr-1" /> Add Testimonial
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {section.config.items?.map((item: any, idx: number) => (
                        <div key={item.id || idx} className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 relative group">
                          <button onClick={() => deleteEcosystemItem(section.id, item.id)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 bg-zinc-900 rounded-full p-1 border border-zinc-800">
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Client Name</label>
                              <input 
                                value={item.name || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'name', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Company/Role</label>
                              <input 
                                value={item.company || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'company', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Quote</label>
                              <textarea 
                                value={item.quote || ''} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'quote', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white text-base focus:outline-none focus:border-red-500 h-16 resize-none"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Rating (1-5)</label>
                              <input 
                                type="number"
                                min="1" max="5"
                                value={item.rating || 5} 
                                onChange={e => updateEcosystemItem(section.id, item.id, 'rating', parseInt(e.target.value))}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-9 px-3 text-white text-base focus:outline-none focus:border-red-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          </div>
          );
        })()}
      </div>
    </div>
  );
}
