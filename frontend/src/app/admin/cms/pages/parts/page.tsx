'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PartEditorModal from '@/components/admin/PartEditorModal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Save, Loader2, Eye, Plus, X, 
  CheckCircle2, AlertTriangle,
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

interface PageSection {
  id: string;
  name: string;
  type: 'hero' | 'featured' | 'cta' | 'categories';
  enabled: boolean;
  config: Record<string, any>;
  selectedTruckIds: string[];
}

const DEFAULT_SECTIONS: PageSection[] = [
  {
    id: 'hero', name: 'Hero Banner', type: 'hero', enabled: true,
    config: {
      heading: 'Parts & Supply',
      subheading: 'Discover a comprehensive catalog of genuine Toyota components and accessories.',
      backgroundImage: 'https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498084/jp-distribution/wholesale-retail/cards/wholesale-parts.jpg'
    },
    selectedTruckIds: [],
  },
  {
    id: 'categories', name: 'Categories', type: 'categories', enabled: true,
    config: {
      heading: 'Parts Inventory',
      subheading: 'Filter through our comprehensive catalog or explore the most queried components across all categories.',
      items: [
        { id: 1, title: 'Lighting Systems', desc: 'Headlights, fog lamps, light bars, etc.', icon: 'Sun', subcategories: ['Fog Lamps', 'DRLs', 'Headlights', 'Light Bars', 'Tail Lights'] },
        { id: 2, title: 'Suspension & Lift Kits', desc: 'Lift kits, shocks, springs.', icon: 'Truck', subcategories: [] },
        { id: 3, title: 'OEM Genuine Parts', desc: 'Original manufacturer components.', icon: 'Wrench', subcategories: [] },
        { id: 4, title: 'Performance Upgrades', desc: 'Turbo, exhaust, etc.', icon: 'Zap', subcategories: [] },
        { id: 5, title: 'Overland Equipment', desc: 'Roof racks, winches, etc.', icon: 'Mountain', subcategories: [] },
        { id: 6, title: 'Fleet Maintenance', desc: 'Service kits, bulk parts.', icon: 'Tool', subcategories: [] },
        { id: 7, title: 'Recovery Equipment', desc: 'Jacks, winches, straps.', icon: 'Anchor', subcategories: [] },
        { id: 8, title: 'Body & Exterior Parts', desc: 'Fenders, bumpers, mirrors.', icon: 'Car', subcategories: [] },
      ]
    },
    selectedTruckIds: [],
  },
  {
    id: 'featured', name: 'Featured Parts', type: 'featured', enabled: true,
    config: { heading: 'Featured Parts', subheading: 'Top rated components for immediate shipping.' },
    selectedTruckIds: [],
  },
  {
    id: 'cta', name: 'Call To Action', type: 'cta', enabled: true,
    config: { heading: 'Need Something Specific?', subheading: 'Our parts locator service can find anything.' },
    selectedTruckIds: [],
  },
];

export default function PartsPageEditor() {
  return (
    <Suspense fallback={<div className="min-h-screen text-white p-8 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-red-500" /></div>}>
      <PartsPageEditorContent />
    </Suspense>
  );
}

function PartsPageEditorContent() {
  const searchParams = useSearchParams();
  const activeSectionId = searchParams?.get('section') || 'hero';

  const [sections, setSections] = useState<PageSection[]>(DEFAULT_SECTIONS);
  const [modalState, setModalState] = useState<{ isOpen: boolean; initialCategory: string; subcategories: string[] }>({ isOpen: false, initialCategory: '', subcategories: [] });
  const [allTrucks, setAllTrucks] = useState<Truck[]>([]);
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
      const res = await fetch(`${API_BASE}/pages/parts`);
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
      const res = await fetch(`${API_BASE}/pages/parts`, {
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
          items: [...items, { id: newId, title: 'New Category', desc: '', icon: 'Globe', img: '', subcategories: [], features: [], specs: {} }]
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
            <FileText size={12} /> Webpages / Parts &amp; Supply
          </div>
          <h1 className="text-2xl font-bold">Parts Inventory</h1>
          <p className="text-zinc-400 text-sm mt-1">Filter through our comprehensive catalog or explore the most queried components across all categories.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/parts-supply" target="_blank" rel="noopener noreferrer">
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
        <span><strong>Parts Page Media Requirements:</strong> Hero Background &rarr; 16:9 Image. Category &amp; Featured Cards &rarr; 4:3 Image ratio.</span>
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
                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5 block">Background Image URL</label>
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

                    <div className="p-4 border border-zinc-700/50 bg-zinc-800/30 rounded-xl text-center">
                      <p className="text-zinc-400 text-sm">To select specific parts, please ensure the Parts inventory API is connected.</p>
                    </div>
                  </div>
                )}

                {/* Categories Editor */}
                {section.type === 'categories' && (
                  <div>
                    <div className="flex items-center justify-between mb-4 border-t border-zinc-800 pt-5 mt-5">
                      <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-2">
                        <ImageIcon size={14} /> Category Cards
                      </h4>
                      <Button onClick={() => addEcosystemItem(section.id)} size="sm" variant="outline" className="h-8 border-dashed border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700">
                        <Plus size={14} className="mr-1" /> Add Category
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.config.items?.map((item: any, idx: number) => (
                        <Card key={item.id ?? idx} className="bg-zinc-800/60 border border-zinc-700 rounded-xl overflow-hidden">
                          {/* Card header */}
                          <div className="flex items-center justify-between px-4 pt-4 pb-2">
                            <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                            <div className="flex items-center gap-1">
                              {/* Add inventory */}
                              <button
                                title="Add Inventory"
                                onClick={() => setModalState({ isOpen: true, initialCategory: item.title || '', subcategories: Array.isArray(item.subcategories) ? item.subcategories : [] })}
                                className="text-zinc-500 hover:text-green-400 bg-zinc-900 rounded-full p-1.5 border border-zinc-700 transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                              {/* Delete */}
                              <button
                                title="Delete Category"
                                onClick={() => deleteEcosystemItem(section.id, item.id)}
                                className="text-zinc-500 hover:text-red-400 bg-zinc-900 rounded-full p-1.5 border border-zinc-700 transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                          {/* Description */}
                          <p className="text-xs text-zinc-400 px-4 pb-3">{item.desc}</p>
                          {/* Subcategories badges */}
                          {Array.isArray(item.subcategories) && item.subcategories.length > 0 && (
                            <div className="flex flex-wrap gap-1 px-4 pb-3">
                              {item.subcategories.map((sub: string, si: number) => (
                                <span key={si} className="text-[10px] bg-zinc-700 text-zinc-300 rounded-full px-2 py-0.5">{sub}</span>
                              ))}
                            </div>
                          )}
                          {/* Subcategories input */}
                          <div className="px-4 pb-4 border-t border-zinc-700/50 pt-3">
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">Subcategories (comma separated)</label>
                            <input
                              value={Array.isArray(item.subcategories) ? item.subcategories.join(', ') : ''}
                              onChange={e => updateEcosystemItem(section.id, item.id, 'subcategories', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg h-8 px-3 text-white text-xs focus:outline-none focus:border-red-500"
                              placeholder="e.g. Fog Lamps, DRLs, Headlights"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })()}
      </div>

      {/* Part Editor Modal */}
      <PartEditorModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        onSave={handleSave}
        partToEdit={null}
        initialCategory={modalState.initialCategory}
        subcategories={modalState.subcategories}
      />
    </div>
  );
}
