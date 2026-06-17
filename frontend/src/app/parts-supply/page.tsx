"use client";
import Image from "next/image";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Settings, Wrench, Package, ShieldCheck, Search, 
  Upload, Camera, MessageSquare, Anchor, FileText, CheckCircle2, 
  MapPin, Truck, Zap, Activity, Filter, Box, Shield, Plane, X, Phone,
  Award, HeadphonesIcon, MessageCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CtaQuoteButton } from "@/components/ui/cta-quote-button";
import { submitLead } from "@/lib/submitLead";

// --- DUMMY DATA ---

const ECOSYSTEMS = [
  { title: "OEM Genuine Parts", desc: "Factory original components.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498058/jp-distribution/parts-supply/categories/parts-engine.png", count: "1,200+" },
  { title: "Performance Upgrades", desc: "Engine and powertrain tuning.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498084/jp-distribution/wholesale-retail/cards/wholesale-parts.jpg", count: "450+" },
  { title: "Overland Equipment", desc: "Camping and survival gear.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498060/jp-distribution/parts-supply/categories/parts-overland.png", count: "320+" },
  { title: "Fleet Maintenance", desc: "Bulk service components.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498080/jp-distribution/trucks/cards/truck-3.png", count: "890+" },
  { title: "Commercial Components", desc: "Heavy-duty chassis parts.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498081/jp-distribution/trucks/cards/truck-4.png", count: "540+" },
  { title: "Recovery Equipment", desc: "Winches, straps, and boards.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498042/jp-distribution/custom-builds/cards/build-2.png", count: "150+" },
  { title: "Lighting Systems", desc: "LED bars and tactical lights.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png", count: "210+" },
  { title: "Suspension & Lift Kits", desc: "Fox, King, and heavy-duty leafs.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498063/jp-distribution/parts-supply/categories/parts-suspension.png", count: "380+" },
  { title: "Electrical Components", desc: "Wiring, ECUs, and dual-batteries.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png", count: "650+" },
  { title: "Body & Exterior Parts", desc: "Bumpers, armor, and panels.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498054/jp-distribution/parts-supply/categories/parts-body.png", count: "720+" },
  { title: "Interior Components", desc: "Seats, trim, and electronics.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498078/jp-distribution/trucks/cards/truck-2.png", count: "410+" },
  { title: "Rare Thailand Imports", desc: "Exclusive JDM/THDM parts.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg", count: "180+" },
];

const SIDEBAR_CATEGORIES = [
  {
    name: "Lighting Systems",
    subcategories: ["Fog Lamps", "DRLs", "Headlights", "Light Bars", "Tail Lights"]
  },
  {
    name: "Suspension & Lift Kits",
    subcategories: ["Coil Springs", "Leaf Springs", "Shocks & Struts", "Lift Kits", "Control Arms"]
  },
  {
    name: "OEM Genuine Parts",
    subcategories: ["Engine Components", "Transmission", "Brakes", "Filters", "Belts & Hoses"]
  },
  {
    name: "Performance Upgrades",
    subcategories: ["Exhaust Systems", "Cold Air Intakes", "Tuners", "Turbo Kits"]
  },
  {
    name: "Overland Equipment",
    subcategories: ["Roof Racks", "Awnings", "Tents", "Storage Systems"]
  },
  {
    name: "Fleet Maintenance",
    subcategories: ["Bulk Oil Filters", "Brake Pads", "Wiper Blades", "Fluids"]
  },
  {
    name: "Recovery Equipment",
    subcategories: ["Winches", "Recovery Straps", "Traction Boards", "Hi-Lift Jacks"]
  },
  {
    name: "Body & Exterior Parts",
    subcategories: ["Bumpers", "Armor", "Panels"]
  }
];

const DUMMY_PARTS = [
  { name: "Toyota Hilux LED Fog Lamps", category: "Lighting Systems", subcategory: "Fog Lamps", price: "$145.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png", popular: true },
  { name: "TRD Pro Style Grille DRL", category: "Lighting Systems", subcategory: "DRLs", price: "$120.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png", popular: true },
  { name: "Fox 2.0 Performance Series IFP", category: "Suspension & Lift Kits", subcategory: "Shocks & Struts", price: "$495.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498063/jp-distribution/parts-supply/categories/parts-suspension.png", popular: true },
  { name: "Old Man Emu 2-Inch Lift Kit", category: "Suspension & Lift Kits", subcategory: "Lift Kits", price: "$1,850.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498063/jp-distribution/parts-supply/categories/parts-suspension.png", popular: false },
  { name: "Genuine OEM Oil Filter 90915-YZZD1", category: "OEM Genuine Parts", subcategory: "Filters", price: "$12.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498058/jp-distribution/parts-supply/categories/parts-engine.png", popular: true },
  { name: "TRD Cat-Back Exhaust System", category: "Performance Upgrades", subcategory: "Exhaust Systems", price: "$850.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498084/jp-distribution/wholesale-retail/cards/wholesale-parts.jpg", popular: true },
  { name: "ARB Touring Awning", category: "Overland Equipment", subcategory: "Awnings", price: "$350.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498060/jp-distribution/parts-supply/categories/parts-overland.png", popular: false },
  { name: "Warn VR EVO 10-S Winch", category: "Recovery Equipment", subcategory: "Winches", price: "$980.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498042/jp-distribution/custom-builds/cards/build-2.png", popular: true },
  { name: "Projecta Dual Battery System", category: "Electrical Components", subcategory: "Wiring", price: "$299.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png", popular: true },
  { name: "Ironman 4x4 Commercial Bull Bar", category: "Body & Exterior Parts", subcategory: "Bumpers", price: "$1,200.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498054/jp-distribution/parts-supply/categories/parts-body.png", popular: true },
  { name: "Rigid Industries 40\" Light Bar", category: "Lighting Systems", subcategory: "Light Bars", price: "$850.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png", popular: false },
  { name: "Genuine Toyota Brake Pads", category: "Fleet Maintenance", subcategory: "Brake Pads", price: "$85.00", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498080/jp-distribution/trucks/cards/truck-3.png", popular: true },
];

const COLLECTIONS = [
  { name: "Engine & Powertrain", desc: "Complete engines, turbos, and cooling.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498058/jp-distribution/parts-supply/categories/parts-engine.png" },
  { name: "Transmission Systems", desc: "Manual, auto, and heavy-duty clutches.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498061/jp-distribution/parts-supply/categories/parts-performance.png" },
  { name: "Suspension Packages", desc: "Lift kits and load-bearing upgrades.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498063/jp-distribution/parts-supply/categories/parts-suspension.png" },
  { name: "Off-Road Accessories", desc: "Bull bars, snorkels, and armor.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498054/jp-distribution/parts-supply/categories/parts-body.png" },
  { name: "Roof Rack Systems", desc: "Cargo and tent mounting solutions.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498060/jp-distribution/parts-supply/categories/parts-overland.png" },
  { name: "Camping Equipment", desc: "Awnings, tents, and storage.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498047/jp-distribution/custom-builds/cards/desert-runner.png" },
  { name: "Commercial Accessories", desc: "Canopies and toolboxes.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498081/jp-distribution/trucks/cards/truck-4.png" },
  { name: "Performance Packages", desc: "ECU remaps and exhaust systems.", img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498084/jp-distribution/wholesale-retail/cards/wholesale-parts.jpg" },
];

const QA_CARDS = [
  "Supplier Verification", "Product Authentication", "Quality Inspection", 
  "Packaging Standards", "Warranty Support", "Shipping Protection"
];

const THAILAND_NETWORK = [
  { title: "Verified Suppliers", icon: <ShieldCheck /> },
  { title: "OEM Networks", icon: <Settings /> },
  { title: "Performance Brands", icon: <Zap /> },
  { title: "Overland Equipment Partners", icon: <MapPin /> },
  { title: "Specialized Manufacturers", icon: <Wrench /> },
  { title: "Hard-To-Find Parts Program", icon: <Search /> }
];

const WHOLESALE_BENEFITS = [
  { title: "Bulk Pricing", desc: "Unlock aggressive tiered discounts for volume orders, drastically reducing your bottom line." },
  { title: "Container Shipments", desc: "We manage complete 20ft and 40ft container consolidation directly from Thailand to your port." },
  { title: "Dealer Support", desc: "Gain access to a dedicated B2B portal with real-time inventory tracking and comprehensive resources." },
  { title: "Fleet Supply Programs", desc: "Set up automated, scheduled parts replenishment to ensure your fleet operations never experience downtime." },
  { title: "Priority Sourcing", desc: "Get VIP first access to extremely rare JDM imports and highly sought-after, limited production stock." },
  { title: "Dedicated Account Managers", desc: "Work closely with a 1-on-1 strategic advisor for all your global procurement and complex logistics planning." }
];

const PROCESS_STEPS = [
  { title: "Search Parts", icon: <Search />, desc: "Find genuine and aftermarket parts in our extensive catalog." },
  { title: "Request Quote", icon: <FileText />, desc: "Get competitive pricing and shipping estimates instantly." },
  { title: "Supplier Verification", icon: <ShieldCheck />, desc: "We verify authenticity and quality with trusted Thai suppliers." },
  { title: "Thailand Sourcing", icon: <MapPin />, desc: "Directly sourced from factories and wholesalers in Thailand." },
  { title: "Inspection", icon: <CheckCircle2 />, desc: "Rigorous quality inspection before packaging." },
  { title: "Packaging", icon: <Package />, desc: "Secure, export-grade packaging to prevent transit damage." },
  { title: "Shipping", icon: <Anchor />, desc: "Fast and insured ocean or air freight global logistics." },
  { title: "Delivery", icon: <Truck />, desc: "Delivered straight to your workshop or door, ready to install." }
];

const INVENTORY_CATEGORIES = [
  "In Stock", "Special Order", "Thailand Warehouse", "Incoming Inventory", "Limited Availability"
];

const GLOBAL_SHIPPING = [
  { title: "Air Freight", icon: <Plane /> },
  { title: "Ocean Freight", icon: <Anchor /> },
  { title: "Container Shipping", icon: <Box /> },
  { title: "Export Documentation", icon: <FileText /> },
  { title: "Customs Assistance", icon: <Shield /> },
  { title: "Shipment Tracking", icon: <Activity /> }
];

export default function PartsSupplyPage() {
  const [activeInventoryTab, setActiveInventoryTab] = useState(INVENTORY_CATEGORIES[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPart, setSelectedPart] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      if (category) {
        setActiveCategory(category);
      }
    }
  }, []);

  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return alert("Please fill required fields (Name, Email, Phone)");
    setIsSubmitting(true);
    try {
      await submitLead({
        formType: "Parts Request",
        sourcePage: "Parts & Supply",
        sourceSection: "Part Details",
        selectedPart: selectedPart?.name,
        clickedButton: "Submit Request",
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.company,
        message: formData.message,
        requestDetails: {
          partCategory: selectedPart?.category
        }
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsQuoteFormOpen(false);
        setSubmitSuccess(false);
        setSelectedPart(null);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      }, 3000);
    } catch (error: any) {
      alert("Error: " + error.message);
      console.error('Error submitting quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [apiParts, setApiParts] = useState<any[]>([]);
  const [pageConfig, setPageConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [partsRes, configRes] = await Promise.all([
          fetch('http://localhost:5000/api/cms/parts'),
          fetch('http://localhost:5000/api/cms/pages/parts')
        ]);
        const partsData = await partsRes.json();
        const configData = await configRes.json();

        if (partsData.success) {
          // Filter to only show published parts
          setApiParts(partsData.data.filter((p: any) => p.status === 'Published'));
        }
        if (configData.success && configData.data) {
          setPageConfig(configData.data);
        }
      } catch (error) {
        console.error('Failed to fetch parts or config:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Compute displayed parts based on selection
  const displayedParts = apiParts.filter(part => {
    // 1. Search Query filter (overrides all)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return part.name.toLowerCase().includes(q) || 
             part.category?.toLowerCase().includes(q) || 
             part.description?.toLowerCase().includes(q);
    }
    // 2. Category filters
    if (activeCategory) return part.category === activeCategory;
    
    return true; 
  });

  const sections = pageConfig?.sections || [];
  const getSection = (id: string) => sections.find((s: any) => s.id === id) || { enabled: true };
  const heroSection = getSection('hero');
  const categoriesSection = getSection('categories');
  const featuredSection = getSection('featured');
  const ctaSection = getSection('cta');

  return (
    <div className="min-h-[80vh] bg-[#050505] text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* 1. HERO SECTION */}
      {heroSection.enabled && (
      <section className="relative pt-24 pb-8 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={heroSection.config?.backgroundImage || "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498084/jp-distribution/wholesale-retail/cards/wholesale-parts.jpg"} 
            alt="Premium Toyota Parts Warehouse" 
            className="object-cover opacity-50 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl">
            {(() => {
              const headingText = heroSection.config?.heading || 'Built Beyond Boundaries.';
              const parts = headingText.split('.');
              const part1 = parts[0] ? parts[0].trim() + (headingText.includes('.') ? '.' : '') : '';
              const part2 = parts[1] ? parts[1].trim() + (parts.length > 2 || headingText.endsWith('.') ? '.' : '') : '';
              return (
                <>
                  {part1} {part2 && <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">{part2}</span>}
                </>
              );
            })()}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {heroSection.config?.subheading || "Transforming Toyota Hilux trucks into purpose-built machines engineered for adventure, business, utility, and extreme environments."}
          </p>
        </div>
      </section>
      )}

      {/* 2. PARTS INVENTORY (SPLIT LAYOUT) */}
      {categoriesSection.enabled && (
      <section id="parts-inventory" className="py-24 relative bg-[#050505] border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Parts <span className="text-red-600">Inventory</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Filter through our comprehensive catalog or explore the most queried components across all categories.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT SIDEBAR: FILTERS */}
            <div className="w-full lg:w-1/4 shrink-0 space-y-6">
              
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH PARTS..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value !== "") {
                      setActiveCategory(null);
                      setActiveSubcategory(null);
                    }
                  }}
                  className="w-full bg-[#111] border border-white/10 rounded-xl h-14 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(217,4,41,0.2)] transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
                <h3 className="text-3xl font-black uppercase tracking-wide text-white mb-6 flex items-center gap-2">
                  <Filter className="w-6 h-6 text-red-600" /> Categories
                </h3>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  
                  {/* Show All / Default Option */}
                  <div className="border-b border-white/5 pb-4">
                    <button 
                      onClick={() => {
                        setActiveCategory(null);
                        setActiveSubcategory(null);
                        setSearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between text-left font-bold uppercase tracking-wide text-base transition-colors ${!activeCategory && !activeSubcategory && searchQuery === "" ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
                    >
                      ALL PARTS / MOST QUERIED
                      {!activeCategory && !activeSubcategory && searchQuery === "" ? <ArrowRight className="w-5 h-5 text-red-600" /> : <ArrowRight className="w-5 h-5 opacity-30" />}
                    </button>
                  </div>

                  {SIDEBAR_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <button 
                        onClick={() => {
                          setActiveCategory(cat.name === activeCategory ? null : cat.name);
                          setActiveSubcategory(null);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center justify-between text-left font-bold uppercase tracking-wide text-base transition-colors ${activeCategory === cat.name ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
                      >
                        {cat.name}
                        {activeCategory === cat.name ? <ArrowRight className="w-5 h-5 text-red-600 rotate-90 transition-transform" /> : <ArrowRight className="w-5 h-5 opacity-30" />}
                      </button>
                      
                      {/* Subcategories Dropdown */}
                      {activeCategory === cat.name && (
                        <div className="mt-4 pl-4 border-l border-red-900/30 space-y-3">
                          {cat.subcategories.map((sub, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => {
                                setActiveSubcategory(sub === activeSubcategory ? null : sub);
                                setSearchQuery("");
                              }}
                              className={`block w-full text-left text-sm uppercase tracking-widest transition-colors py-1.5 ${activeSubcategory === sub ? 'text-red-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT: PARTS GRID */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  {searchQuery ? `SEARCH RESULTS FOR "${searchQuery}"` : activeSubcategory || activeCategory || "Most Queried Parts"}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Showing {displayedParts.length} Results
                </span>
              </div>

              {isLoading ? (
                <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
                  <Activity className="w-8 h-8 mb-4 opacity-50 animate-pulse" />
                  <p className="text-sm font-bold uppercase tracking-widest">Loading Parts...</p>
                </div>
              ) : displayedParts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedParts.map((part, idx) => (
                    <div 
                      key={part._id || idx} 
                      className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group hover:border-red-600/30 transition-all flex flex-col h-[400px] cursor-pointer"
                      onClick={() => {
                        setSelectedPart(part);
                        setIsQuoteFormOpen(false);
                        setSubmitSuccess(false);
                      }}
                    >
                      <div className="h-1/2 relative overflow-hidden bg-black shrink-0">
                        {part.images?.[0] && (
                          <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={part.images[0]} alt={part.name} className="object-cover group-hover:scale-110 group-hover:opacity-100 opacity-80 transition-all duration-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-100"></div>
                        {part.popular && !activeCategory && !activeSubcategory && (
                           <div className="absolute top-4 left-4">
                             <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                               Highly Queried
                             </span>
                           </div>
                        )}
                      </div>
                      
                      <div className="h-1/2 p-5 flex flex-col flex-grow relative bg-[#111] z-10 -mt-2">
                        <div className="text-red-500 font-bold tracking-widest uppercase text-[10px] mb-2">{part.subcategory || part.category}</div>
                        <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight mb-2 line-clamp-1">{part.name}</h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
                          ${part.price?.toLocaleString()}
                        </p>
                        <div className="mt-auto">
                           <Button className="w-full bg-white/5 hover:bg-red-600 text-white font-bold tracking-widest uppercase text-xs transition-all border border-white/10 hover:border-red-600 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                             Details
                           </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500">
                  <Search className="w-8 h-8 mb-4 opacity-50" />
                  <p className="text-sm font-bold uppercase tracking-widest">No parts found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 3. FEATURED COLLECTIONS */}
      {featuredSection.enabled && (
      <section className="py-14 md:py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Featured <span className="text-red-600">Collections</span>
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar">
            <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
            {COLLECTIONS.map((col, idx) => (
              <div key={idx} className="w-[300px] md:w-[350px] shrink-0 snap-center bg-[#111] rounded-2xl overflow-hidden border border-white/5 group hover:border-white/20 transition-colors">
                <div className="h-[200px] overflow-hidden relative">
                  <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={col.img} alt={col.name} className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase tracking-wide mb-3">{col.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">{col.desc}</p>
                  <Button 
                    onClick={() => {
                      setSearchQuery(col.name);
                      document.getElementById('parts-inventory')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white rounded-sm font-bold tracking-widest uppercase transition-colors text-xs"
                  >
                    Explore Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 4. SPECIAL PARTS LOCATOR */}
      <section className="py-14 md:py-20 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4">Direct Sourcing</h4>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                Can&apos;t Find It? <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">We&apos;ll Source It.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Leverage our deep connections within the Thai automotive manufacturing sector. We can source ultra-rare components, discontinued OEM parts, and highly specialized aftermarket upgrades.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-[#111] p-4 rounded-lg border border-white/5"><Camera className="text-red-500 w-5 h-5"/> <span className="text-sm font-bold uppercase tracking-wide">Upload Part Image</span></div>
                <div className="flex items-center gap-3 bg-[#111] p-4 rounded-lg border border-white/5"><Upload className="text-red-500 w-5 h-5"/> <span className="text-sm font-bold uppercase tracking-wide">Upload Part Number</span></div>
                <div className="flex items-center gap-3 bg-[#111] p-4 rounded-lg border border-white/5"><MessageSquare className="text-emerald-500 w-5 h-5"/> <span className="text-sm font-bold uppercase tracking-wide">WhatsApp Assistance</span></div>
              </div>
            </div>

            {/* Locator Form Mockup */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-6">Sourcing Request</h3>
              <div className="space-y-4">
                <input type="text" placeholder="FULL NAME" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-4 text-sm uppercase tracking-widest text-white focus:outline-none focus:border-red-500 transition-colors" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-4 text-sm uppercase tracking-widest text-white focus:outline-none focus:border-red-500 transition-colors" />
                  <input type="tel" placeholder="CONTACT NUMBER" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-4 text-sm uppercase tracking-widest text-white focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <input type="text" placeholder="PART NAME OR NUMBER" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-4 text-sm uppercase tracking-widest text-white focus:outline-none focus:border-red-500 transition-colors" />
                <div className="w-full bg-[#111] border-2 border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500 transition-colors">
                  <Camera className="w-8 h-8 text-gray-500 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Click to upload part image</span>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase h-14 mt-4">
                  Request Part Sourcing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUALITY ASSURANCE & WHY CHOOSE US */}
      <section className="py-24 bg-[#0a0c10] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-4">
              Every Part Verified. <br/><span className="text-red-600">Every Shipment Trusted.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {QA_CARDS.map((item, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 rounded-xl p-6 text-center hover:bg-white/5 hover:border-red-500/50 transition-all group">
                <div className="w-12 h-12 mx-auto rounded-full bg-black flex items-center justify-center text-red-500 mb-4 shadow-[0_0_15px_rgba(217,4,41,0.2)] group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THAILAND SOURCING NETWORK */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
               {THAILAND_NETWORK.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-xl flex items-center gap-4">
                  <div className="text-red-500 shrink-0">{item.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white">{item.title}</span>
                </div>
               ))}
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-6">
                Thailand <span className="text-red-600">Sourcing Network</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Thailand is the manufacturing hub for the Toyota Hilux. We bypass global middlemen to connect you directly with the source—from official Toyota OEM warehouses to elite aftermarket fabricators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHOLESALE & DEALER PROGRAM */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Wholesale & <span className="text-red-600">Dealer Program</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Enterprise-grade supply solutions tailored for global dealerships, massive fleet operators, and high-volume aftermarket distributors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
             {WHOLESALE_BENEFITS.map((item, idx) => (
                <div className="bg-[#050505] border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-colors" key={idx}>
                  <h4 className="text-lg text-white font-bold uppercase tracking-wide mb-3">{item.title}</h4>
                  <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                </div>
             ))}
          </div>
          <div className="text-center">
            <Link href="/wholesale-retail">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 h-14 font-bold tracking-widest uppercase rounded-sm shadow-[0_0_20px_rgba(217,4,41,0.4)] transition-all">
                Explore Enterprise Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS TIMELINE */}
      <section className="pt-16 pb-8 lg:pb-12 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 text-center">
          <h4 className="text-red-600 font-bold text-xs md:text-sm mb-3 uppercase tracking-widest">GLOBAL SUPPLY CHAIN</h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-20 uppercase tracking-tight">
            LOGISTICS WORKFLOW
          </h2>

          <div className="relative w-full overflow-x-auto pb-8 pt-4 hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* The Connecting Line */}
            <div className="absolute top-[56px] left-[7%] w-[86%] h-[2px] bg-red-600/10 z-0 hidden lg:block overflow-hidden rounded-full">
              <div 
                className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent left-0"
                style={{
                  boxShadow: "0 0 20px 4px rgba(220, 38, 38, 0.9)",
                  animation: "movingLight 8s linear infinite"
                }}
              ></div>
              <style>{`
                @keyframes movingLight {
                  0% { transform: translateX(-160px); }
                  100% { transform: translateX(85vw); }
                }
              `}</style>
            </div>
            
            <div className="flex flex-nowrap lg:grid lg:grid-cols-8 gap-6 min-w-max lg:min-w-0 relative z-10">
              
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <div className="text-white w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                      {step.icon}
                    </div>
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">0{idx + 1}</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">{step.title}</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">{step.desc}</p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      {ctaSection.enabled && (
      <section className="relative bg-[#050505] overflow-hidden">
        <div className="w-[96%] max-w-[1800px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0c10]">
          
          {/* Top Image Banner */}
          <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
            <div className="absolute inset-0 z-0">
               <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498067/jp-distribution/shared/backgrounds/cta-background.png" 
                alt="Toyota Hilux Ready to Source" 
                className="object-cover object-[70%_center] opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent"></div>
            </div>
            
            <div className="px-6 lg:px-16 h-full relative z-10 flex flex-col justify-center">
              <div className="max-w-3xl mt-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">
                  READY TO IMPORT, BUILD, OR SOURCE?
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                  Whether you're maintaining a fleet, upgrading an expedition vehicle, or sourcing rare components, JP Distribution delivers quality parts backed by expertise and global logistics support.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <CtaQuoteButton text="REQUEST PARTS QUOTE" initialInquiryType="parts" />
                  
                  <Link href="https://wa.me/5978520700" target="_blank" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full relative overflow-hidden bg-black/40 border-white/20 hover:bg-white/10 text-white font-bold h-14 px-8 text-sm uppercase rounded backdrop-blur-sm group transition-all">
                      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-green-400 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                      <span className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-red-600"></span>
                      <MessageCircle className="w-5 h-5 mr-3 text-white hidden group-hover:block transition-all" />
                      WHATSAPP SUPPORT
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
      )}

      {/* PART DETAILS MODAL */}
      {selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm transition-opacity">
          
          <div className="relative w-full max-w-6xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => {
                setSelectedPart(null);
                setIsQuoteFormOpen(false);
                setSubmitSuccess(false);
              }}
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-[110] p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-[0_0_20px_rgba(217,4,41,0.5)] border-4 border-[#0a0a0a] hover:scale-110"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(217,4,41,0.2)] min-h-[60vh] md:min-h-[70vh]">

              {/* Image Side (Cinematic slow pan) */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black">
                {selectedPart.images?.[0] && (
                  <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={selectedPart.images[0]} 
                    alt={selectedPart.name} 
                    className="object-cover opacity-80"
                    style={{ animation: 'slowPan 20s linear infinite alternate' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r"></div>
                <style>{`
                  @keyframes slowPan {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.15); }
                  }
                `}</style>
              </div>

              {/* Details Side / Form Side */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between relative z-10 overflow-y-auto max-h-[70vh]">
                
                {!isQuoteFormOpen ? (
                  <>
                    <div>
                      <div className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
                        {selectedPart.category} {selectedPart.subcategory && `/ ${selectedPart.subcategory}`}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-4">
                        {selectedPart.name}
                      </h2>
                      <div className="text-xl text-gray-300 font-bold tracking-widest mb-6">
                        ${selectedPart.price?.toLocaleString()}
                      </div>
                      <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                        Experience ultimate performance and reliability with the {selectedPart.name}. Sourced directly from our premium networks in Thailand, guaranteeing authenticity and peak functionality for your vehicle.
                      </p>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-base md:text-lg font-bold uppercase tracking-widest text-gray-400"><ShieldCheck className="w-6 h-6 text-red-600 mr-3" /> Verified Authentic Component</li>
                        <li className="flex items-center text-base md:text-lg font-bold uppercase tracking-widest text-gray-400"><Plane className="w-6 h-6 text-red-600 mr-3" /> Global Air Freight Available</li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto self-end w-full">
                      <Link href="tel:+18005550199" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-bold tracking-widest uppercase text-xs h-12 px-6 rounded-sm transition-colors">
                          <Phone className="w-4 h-4 mr-2" /> Contact Us
                        </Button>
                      </Link>
                      <Button onClick={() => setIsQuoteFormOpen(true)} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-xs h-12 px-6 rounded-sm shadow-[0_0_15px_rgba(217,4,41,0.4)] transition-all">
                        Request a Quote
                      </Button>
                    </div>
                  </>
                ) : submitSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in zoom-in">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/50">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-wider">Quote Requested!</h3>
                    <p className="text-gray-400">Our team will contact you shortly regarding the {selectedPart.name}.</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setIsQuoteFormOpen(false)} className="flex items-center text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors mb-6">
                      <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Details
                    </button>
                    <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6">Request Quote</h3>
                    <p className="text-gray-400 text-sm mb-6">Fill out the details below to receive pricing and availability for <strong className="text-white">{selectedPart.name}</strong>.</p>
                    
                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:border-red-500 outline-none w-full" />
                        <input type="text" placeholder="Company (Optional)" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:border-red-500 outline-none w-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:border-red-500 outline-none w-full" />
                        <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:border-red-500 outline-none w-full" />
                      </div>
                      <textarea placeholder="Additional Requirements or Questions" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="bg-[#111] border border-white/10 rounded-md py-3 px-4 text-white focus:border-red-500 outline-none w-full resize-none"></textarea>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                        <Button type="button" variant="outline" className="w-full sm:flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 font-bold uppercase text-xs h-12" onClick={() => setIsQuoteFormOpen(false)}>
                          Back
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-xs h-12 shadow-[0_0_15px_rgba(217,4,41,0.4)] disabled:opacity-50">
                          {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

