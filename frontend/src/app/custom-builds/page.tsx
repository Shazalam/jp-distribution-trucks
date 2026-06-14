"use client";
import Image from "next/image";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Settings, Wrench, Package, ShieldCheck, Search,
  Activity, Zap, Compass, CheckCircle2, ChevronRight, ChevronLeft, 
  SlidersHorizontal, Phone, ArrowUpRight, Plus, Mountain, Filter,
  Briefcase, Truck, HardHat, Tractor, Pickaxe, Shield, Stethoscope, MessageCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/ui/quote-modal";
import { CtaQuoteButton } from "@/components/ui/cta-quote-button";

// --- DUMMY DATA ---

const BUILD_CATEGORIES = [
  { title: "Expedition Builds", desc: "Long-range self-sustained travel setups.", img: "/images/home/hero/cinematic-hilux-hero.png" },
  { title: "Overland Builds", desc: "Premium camping and exploration platforms.", img: "/images/custom-builds/cards/desert-runner.png" },
  { title: "Adventure Builds", desc: "Weekend warrior and trail-ready modifications.", img: "/images/custom-builds/cards/build-1.png" },
  { title: "Commercial Utility Builds", desc: "Heavy-duty chassis configurations for work.", img: "/images/trucks/cards/truck-2.png" },
  { title: "Fleet Customization", desc: "Standardized enterprise deployments.", img: "/images/trucks/cards/truck-3.png" },
  { title: "Mining & Industrial Builds", desc: "Safety-compliant subterranean specs.", img: "/images/custom-builds/cards/build-2.png" },
  { title: "Agricultural Builds", desc: "Rugged platforms for farming and rural use.", img: "/images/custom-builds/cards/build-3.png" },
  { title: "Emergency & Rescue Vehicles", desc: "Rapid response and medical transport.", img: "/images/custom-builds/cards/build-4.png" },
  { title: "Security & Patrol Builds", desc: "Armored enforcement platforms.", img: "/images/trucks/cards/black-edition.png" },
  { title: "Extreme Builds", desc: "Pushing limits with custom upgrades and performance.", img: "/images/custom-builds/cards/build-4.png" },
  { title: "Classic Builds", desc: "Restored and highly durable legacy platforms.", img: "/images/custom-builds/cards/build-3.png" },
];

const SIGNATURE_SERIES = [
  { name: "JP Expedition Series", desc: "The ultimate global travel platform.", img: "/images/home/hero/cinematic-hilux-hero.png" },
  { name: "JP Adventure Series", desc: "Engineered for extreme trails.", img: "/images/custom-builds/cards/desert-runner.png" },
  { name: "JP Extreme Series", desc: "Uncompromised off-road dominance.", img: "/images/trucks/cards/truck-1.png" },
  { name: "JP Commercial Series", desc: "Built for the heaviest payloads.", img: "/images/trucks/cards/truck-4.png" },
  { name: "JP Fleet Series", desc: "Standardized, durable, and efficient.", img: "/images/trucks/cards/truck-3.png" },
  { name: "JP Rescue Series", desc: "Rapid response medical and extraction.", img: "/images/custom-builds/cards/build-2.png" },
  { name: "JP Security Series", desc: "Tactical defense and transport.", img: "/images/trucks/cards/black-edition.png" },
];

const MISSIONS = [
  { name: "Adventure Travel", icon: <Compass /> },
  { name: "Camping", icon: <Mountain /> },
  { name: "Commercial Operations", icon: <Briefcase /> },
  { name: "Fleet Management", icon: <Truck /> },
  { name: "Construction", icon: <HardHat /> },
  { name: "Agriculture", icon: <Tractor /> },
  { name: "Mining", icon: <Pickaxe /> },
  { name: "Security", icon: <Shield /> },
  { name: "Emergency Services", icon: <Stethoscope /> }
];

const CONFIG_OPTIONS_DATA: Record<string, {name: string, desc: string}[]> = {
  "Vehicle Model": [
    { name: "Hilux Revo Standard", desc: "Base model with standard factory specifications." },
    { name: "Hilux Revo Premium", desc: "Upgraded interior and enhanced factory comfort features." },
    { name: "Hilux Revo GR Sport", desc: "Top-tier performance model with Gazoo Racing styling." }
  ],
  "Suspension Package": [
    { name: "Heavy Duty 2-Inch Lift", desc: "Upgraded shocks and springs for moderate trail use." },
    { name: "Overland Pro System", desc: "Adjustable bypass shocks with increased payload capacity." },
    { name: "Extreme Long Travel", desc: "Competition-grade suspension for high-speed desert running." }
  ],
  "Wheel Package": [
    { name: "All-Terrain 32\"", desc: "Standard 17-inch alloy wheels wrapped in rugged A/T tires." },
    { name: "Mud-Terrain 33\"", desc: "Beadlock-capable wheels with aggressive 33-inch M/T tires." },
    { name: "Extreme 35\" Setup", desc: "Forged beadlock wheels with massive 35-inch crawler tires." }
  ],
  "Lighting Package": [
    { name: "Trail Basic", desc: "Upgraded LED headlight bulbs and fog light replacements." },
    { name: "Overland Illumination", desc: "A-pillar ditch lights and a 20-inch bumper light bar." },
    { name: "360° Night Vision", desc: "Full roof-rack lightbar, ditch lights, and surround area lighting." }
  ],
  "Roof System": [
    { name: "Standard Crossbars", desc: "Basic load bars for mounting light cargo or sports gear." },
    { name: "Platform Cargo Rack", desc: "Low-profile aluminum platform for versatile gear mounting." },
    { name: "Heavy-Duty Expedition Tent Rack", desc: "Reinforced rack system to support rooftop tents and awnings." }
  ],
  "Recovery Equipment": [
    { name: "Basic Recovery Kit", desc: "Snatch strap, shackles, and a heavy-duty shovel." },
    { name: "Winch Prep & Boards", desc: "Hidden winch mount installed with traction boards." },
    { name: "Ultimate Extraction", desc: "12,000lb Warn Winch, kinetic ropes, MAXTRAX, and Hi-Lift jack." }
  ],
  "Exterior Styling": [
    { name: "Blackout Package", desc: "Chrome delete and matte black badging." },
    { name: "Trail Armor", desc: "Steel rock sliders and underbody skid plates." },
    { name: "Full Expedition Armor", desc: "Steel front/rear bumpers, rock sliders, and full underbody protection." }
  ],
  "Storage Systems": [
    { name: "Bed Liner & Tie-Downs", desc: "Premium spray-in liner with adjustable cargo cleats." },
    { name: "Drawer System", desc: "Twin sliding drawers with a flat load surface." },
    { name: "Complete Canopy Setup", desc: "Aluminum canopy with integrated drawers, fridge slide, and gullwing doors." }
  ]
};

const CONFIG_CATEGORIES = Object.keys(CONFIG_OPTIONS_DATA);

export default function CustomBuildsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeMission, setActiveMission] = useState(0);
  const [activeConfigTab, setActiveConfigTab] = useState(CONFIG_CATEGORIES[0]);
  const [selectedBuild, setSelectedBuild] = useState<{title: string, desc: string, img: string} | null>(null);

  const initialOptions = CONFIG_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = 1;
    return acc;
  }, {} as Record<string, number>);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>(initialOptions);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteRequirements, setQuoteRequirements] = useState("");

  const configuratorRef = useRef<HTMLElement>(null);

  const handleConfigureMission = () => {
    let newOptions = { ...initialOptions };
    
    // Set smart defaults based on the mission chosen
    switch(MISSIONS[activeMission].name) {
      case "Adventure Travel":
        newOptions = { ...initialOptions, "Vehicle Model": 2, "Suspension Package": 2, "Lighting Package": 2, "Roof System": 2, "Exterior Styling": 2, "Storage Systems": 2 };
        break;
      case "Camping":
        newOptions = { ...initialOptions, "Roof System": 3, "Storage Systems": 3, "Lighting Package": 2 };
        break;
      case "Commercial Operations":
      case "Fleet Management":
        newOptions = { ...initialOptions, "Suspension Package": 2, "Storage Systems": 1 };
        break;
      case "Construction":
      case "Agriculture":
      case "Mining":
        newOptions = { ...initialOptions, "Suspension Package": 3, "Wheel Package": 2, "Exterior Styling": 3, "Recovery Equipment": 3 };
        break;
      case "Security":
      case "Emergency Services":
        newOptions = { ...initialOptions, "Vehicle Model": 3, "Suspension Package": 3, "Lighting Package": 3, "Exterior Styling": 3, "Recovery Equipment": 2 };
        break;
      default:
        newOptions = { ...initialOptions, "Suspension Package": 2 };
    }
    
    setSelectedOptions(newOptions);
    configuratorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      if (category) {
        setActiveCategory(category);
      }
    }
  }, []);

  // Compute displayed builds based on selection
  const displayedBuilds = BUILD_CATEGORIES.filter(cat => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return cat.title.toLowerCase().includes(q) || cat.desc.toLowerCase().includes(q);
    }
    if (activeCategory) return cat.title === activeCategory;
    return true; // default show all
  });

  return (
    <div className="min-h-[80vh] bg-[#050505] text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* 1. HERO SECTION (Compact Banner Style) */}
      <section className="relative pt-24 pb-8 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority src="/images/home/hero/cinematic-hilux-hero.png" 
            alt="Custom Toyota Hilux Build" 
            className="object-cover opacity-60 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Built Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Boundaries.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Transforming Toyota Hilux trucks into purpose-built machines engineered for adventure, business, utility, and extreme environments.
          </p>
        </div>
      </section>

      {/* 2. PLATFORM CATEGORIES (Sidebar / Grid Layout) */}
      <section className="py-24 relative bg-[#050505] border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Platform <span className="text-red-600">Categories</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Filter through our comprehensive custom build platforms tailored for any global mission.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT SIDEBAR: FILTERS */}
            <div className="w-full lg:w-1/4 shrink-0 space-y-6">
              
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH BUILDS..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value !== "") setActiveCategory(null);
                  }}
                  className="w-full bg-[#111] border border-white/10 rounded-xl h-14 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(217,4,41,0.2)] transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
                <h3 className="text-2xl font-black uppercase tracking-wide text-white mb-6 flex items-center gap-2">
                  <Filter className="w-6 h-6 text-red-600" /> Categories
                </h3>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  
                  {/* Show All / Default Option */}
                  <div className="border-b border-white/5 pb-4">
                    <button 
                      onClick={() => {
                        setActiveCategory(null);
                        setSearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between text-left font-bold uppercase tracking-wide text-base transition-colors ${!activeCategory && searchQuery === "" ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
                    >
                      ALL BUILDS
                      {!activeCategory && searchQuery === "" ? <ArrowRight className="w-5 h-5 text-red-600" /> : <ArrowRight className="w-5 h-5 opacity-30" />}
                    </button>
                  </div>

                  {BUILD_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <button 
                        onClick={() => {
                          setActiveCategory(cat.title === activeCategory ? null : cat.title);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center justify-between text-left font-bold uppercase tracking-wide text-base transition-colors py-1 ${activeCategory === cat.title ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
                      >
                        {cat.title}
                        {activeCategory === cat.title ? <ArrowRight className="w-5 h-5 text-red-600 rotate-90 transition-transform" /> : <ArrowRight className="w-5 h-5 opacity-30" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT: BUILDS GRID */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  {searchQuery ? `SEARCH RESULTS FOR "${searchQuery}"` : activeCategory || "All Custom Platforms"}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Showing {displayedBuilds.length} Results
                </span>
              </div>

              {displayedBuilds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayedBuilds.map((cat, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedBuild(cat)}
                      className="group bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-red-500/30 transition-all flex flex-col h-full relative cursor-pointer"
                    >
                      <div className="h-56 overflow-hidden relative bg-[#0a0a0a]">
                        <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={cat.img} alt={cat.title} className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-1 relative z-10 -mt-6">
                        <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">Custom Platform</div>
                        <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-2 leading-relaxed">{cat.title}</h4>
                        <p className="text-gray-400 text-xs mb-6 leading-relaxed line-clamp-2">{cat.desc}</p>
                        <div className="mt-auto flex items-center justify-between">
                           <span className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">Base Vehicle</span>
                           <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold tracking-widest uppercase bg-transparent border-white/20 text-white hover:bg-white hover:text-black">
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
                  <p className="text-sm font-bold uppercase tracking-widest">No builds found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE BUILD COLLECTION */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Signature <span className="text-red-600">Series</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-4">The absolute pinnacle of our custom engineering and specialized mission deployments.</p>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar">
            <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
            {SIGNATURE_SERIES.map((series, idx) => (
              <div key={idx} className="w-[350px] md:w-[450px] shrink-0 snap-center bg-[#050505] rounded-2xl overflow-hidden border border-white/5 group hover:border-white/20 transition-colors">
                <div className="h-[280px] overflow-hidden relative">
                  <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={series.img} alt={series.name} className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-3">{series.name}</h3>
                  <p className="text-gray-400 text-base mb-8">{series.desc}</p>
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="text-sm text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2 flex justify-between">
                      <span>Suspension</span> <span className="text-white font-bold">Premium Tier</span>
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2 flex justify-between">
                      <span>Protection</span> <span className="text-white font-bold">Full Armor Spec</span>
                    </div>
                  </div>
                  <Button className="w-full bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white rounded-sm font-bold tracking-widest uppercase transition-colors h-12">
                    View Gallery
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY BUILD WITH JP DISTRIBUTION */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
              Why Build With <span className="text-red-600">JP Distribution</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {title: "Thailand Direct Sourcing", desc: "Straight from the manufacturing source."}, 
              {title: "Experienced Build Team", desc: "Decades of extreme environment engineering."}, 
              {title: "Quality Components", desc: "Only the finest globally recognized brands."}, 
              {title: "Custom Engineering", desc: "Bespoke fabrication for unique needs."}, 
              {title: "Global Shipping", desc: "Delivered to any port worldwide."}, 
              {title: "After-Sales Support", desc: "Comprehensive warranty and maintenance."}
            ].map((item, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-colors">
                <h4 className="text-lg text-white font-bold uppercase tracking-wide mb-3 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-600" />
                  {item.title}
                </h4>
                <p className="text-gray-400 text-base leading-relaxed pl-9">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUILD FOR EVERY MISSION */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Build For Every <span className="text-red-600">Mission</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Select your operational requirements to see optimized build configurations.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Mission Selector Tabs */}
            <div className="w-full lg:w-1/3 space-y-3">
              {MISSIONS.map((mission, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMission(idx)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors ${activeMission === idx ? 'bg-red-600 text-white' : 'bg-[#050505] border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <div className={`${activeMission === idx ? 'text-white' : 'text-red-500'}`}>
                    {mission.icon}
                  </div>
                  {mission.name}
                </button>
              ))}
            </div>
            
            {/* Mission Display Area */}
            <div className="w-full lg:w-2/3 bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[500px]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>
              <h3 className="text-4xl lg:text-5xl font-black uppercase text-white mb-6 relative z-10">{MISSIONS[activeMission].name} Platform</h3>
              <p className="text-gray-400 text-lg md:text-xl mb-12 relative z-10 leading-relaxed">Optimized specifically for {MISSIONS[activeMission].name.toLowerCase()} requirements, focusing on durability, payload capacity, and specialized equipment integration to ensure absolute success in the field.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-12">
                <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                  <span className="text-red-500 text-sm uppercase tracking-widest font-bold block mb-2">Recommended Base</span>
                  <span className="font-bold text-white text-lg">Hilux Revo Double Cab 4x4</span>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                  <span className="text-red-500 text-sm uppercase tracking-widest font-bold block mb-2">Core Upgrades</span>
                  <span className="font-bold text-white text-lg">Heavy Duty Suspension, Armor</span>
                </div>
              </div>
              
              <Button 
                onClick={handleConfigureMission}
                size="lg" 
                className="w-fit bg-red-600 hover:bg-red-700 text-white px-10 h-14 font-bold tracking-widest uppercase rounded-sm shadow-[0_0_20px_rgba(217,4,41,0.4)] transition-all relative z-10"
              >
                Configure This Mission
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDIO CONFIGURATOR */}
      <section ref={configuratorRef} className="py-24 bg-[#050505] scroll-mt-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 text-white">
              Studio <span className="text-red-600">Configurator</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Customize every aspect of your build and generate a precise quote request.</p>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col lg:flex-row">
            {/* Config Tabs */}
            <div className="w-full lg:w-1/4 bg-[#0a0a0a] p-8 border-r border-white/5">
              <div className="space-y-3">
                {CONFIG_CATEGORIES.map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveConfigTab(tab)}
                    className={`w-full text-left px-5 py-4 text-xs lg:text-sm font-bold uppercase tracking-widest rounded-sm transition-all ${activeConfigTab === tab ? 'bg-red-600 text-white pl-8 shadow-[0_0_15px_rgba(217,4,41,0.4)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Config Options */}
            <div className="w-full lg:w-2/4 p-8 md:p-12 lg:p-16">
              <h3 className="text-3xl font-black uppercase text-white mb-10">{activeConfigTab} Options</h3>
              <div className="space-y-6">
                {CONFIG_OPTIONS_DATA[activeConfigTab].map((optData, idx) => {
                  const opt = idx + 1;
                  return (
                  <div 
                    key={opt} 
                    onClick={() => setSelectedOptions(prev => ({...prev, [activeConfigTab]: opt}))}
                    className={`flex items-center justify-between p-8 rounded-xl border transition-colors group cursor-pointer ${
                      selectedOptions[activeConfigTab] === opt 
                        ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(217,4,41,0.2)]' 
                        : 'bg-[#050505] border-white/5 hover:bg-white/5 hover:border-red-500/50'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2 uppercase tracking-wider">{optData.name}</h4>
                      <p className="text-sm text-gray-500">{optData.desc}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedOptions[activeConfigTab] === opt ? 'border-red-500' : 'border-white/20 group-hover:border-red-500'
                    }`}>
                      {selectedOptions[activeConfigTab] === opt && <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(217,4,41,0.8)]"></div>}
                    </div>
                  </div>
                )})}
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/4 bg-[#0a0a0a] p-8 md:p-12 border-l border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-6">Build Summary</h3>
                <ul className="space-y-6 text-sm font-medium text-gray-400 mb-12">
                  {CONFIG_CATEGORIES.map(cat => {
                    const selectedLevel = selectedOptions[cat] || 1;
                    const optionName = CONFIG_OPTIONS_DATA[cat]?.[selectedLevel - 1]?.name || `Level ${selectedLevel}`;
                    return (
                    <li key={cat} className="flex justify-between items-center gap-4">
                      <span className="uppercase text-gray-500 text-xs shrink-0">{cat.replace(' Package', '').replace(' System', '').replace(' Equipment', '').replace(' Styling', '')}</span> 
                      <span className="text-white font-bold bg-[#111] px-3 py-1 rounded text-xs text-right truncate">
                        {optionName}
                      </span>
                    </li>
                  )})}
                </ul>
              </div>
              <div>
                <Button 
                  onClick={() => {
                    setQuoteRequirements(`Custom Build Configuration:\n${Object.entries(selectedOptions).map(([key, val]) => `- ${key}: ${CONFIG_OPTIONS_DATA[key]?.[val - 1]?.name || "Level " + val}`).join('\n')}\n\nPlease provide more details about your intended use and any additional requirements here:`);
                    setIsQuoteModalOpen(true);
                  }}
                  className="w-full bg-red-600 text-white hover:bg-red-700 font-bold tracking-widest uppercase py-7 rounded-sm text-sm transition-all shadow-[0_0_20px_rgba(217,4,41,0.3)]"
                >
                  Request Build Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Build <span className="text-red-600">Gallery</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">Explore a curated selection of our most iconic Toyota Hilux custom deployments around the world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <Image alt="JP Distribution Trucks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority src="/images/home/hero/cinematic-hilux-hero.png" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <Image alt="JP Distribution Trucks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="/images/custom-builds/cards/desert-runner.png" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <Image alt="JP Distribution Trucks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="/images/trucks/cards/truck-2.png" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <Image alt="JP Distribution Trucks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="/images/trucks/cards/truck-3.png" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <Image alt="JP Distribution Trucks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="/images/trucks/cards/truck-4.png" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative bg-[#050505]">
        <div className="w-[96%] max-w-[1800px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0c10]">
          <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
            <div className="absolute inset-0 z-0">
               <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="/images/shared/backgrounds/cta-background.png" 
                alt="Toyota Hilux Ready to Source" 
                className="object-cover object-[70%_center] opacity-60"
              />
              {/* Gradients to fade left text area and bottom for the info bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent"></div>
            </div>
            
            <div className="px-6 lg:px-16 h-full relative z-10 flex flex-col justify-center">
              <div className="max-w-3xl mt-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">
                  Your Vision. <span className="text-red-600">Our Build Expertise.</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                  Whether you&apos;re preparing for remote exploration, commercial operations, fleet deployment, or specialized missions, JP Distribution creates vehicles engineered beyond boundaries.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <CtaQuoteButton text="START YOUR CUSTOM BUILD" initialInquiryType="build" />
                  
                  {/* Whatsapp button with the distinct color bar from the design */}
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

      {/* BUILD DETAILS MODAL */}
      {selectedBuild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-6xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedBuild(null)}
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-[110] p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-[0_0_20px_rgba(217,4,41,0.5)] border-4 border-[#0a0a0a] hover:scale-110"
            >
              <Plus className="w-6 h-6 md:w-8 md:h-8 rotate-45" />
            </button>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(217,4,41,0.2)] min-h-[60vh] md:min-h-[70vh]">
              {/* Image Side (Cinematic slow pan) */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={selectedBuild.img} 
                  alt={selectedBuild.title} 
                  className="object-cover opacity-80"
                  style={{ animation: 'slowPan 20s linear infinite alternate' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r"></div>
                <style>{`
                  @keyframes slowPan {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.15); }
                  }
                `}</style>
              </div>

              {/* Details Side */}
              <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between relative z-10">
                <div>
                  <div className="text-red-500 font-bold uppercase tracking-widest text-xs mb-3">
                    Custom Platform Configuration
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wide text-white mb-6">
                    {selectedBuild.title}
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                    {selectedBuild.desc} Engineered to master any environment, ensuring reliability, payload capacity, and off-road dominance.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-base font-bold uppercase tracking-widest text-gray-400">
                      <ShieldCheck className="w-6 h-6 text-red-600 mr-3" /> Fully Custom Engineered
                    </li>
                    <li className="flex items-center text-base font-bold uppercase tracking-widest text-gray-400">
                      <Compass className="w-6 h-6 text-red-600 mr-3" /> Global Export & Delivery
                    </li>
                    <li className="flex items-center text-base font-bold uppercase tracking-widest text-gray-400">
                      <Wrench className="w-6 h-6 text-red-600 mr-3" /> Premium Global Components
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto w-full">
                  <Link href="tel:+18005550199" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-bold tracking-widest uppercase text-xs h-12 px-6 rounded-sm transition-colors">
                      <Phone className="w-4 h-4 mr-2" /> Contact Us
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      setQuoteRequirements(`Interested in Custom Platform: ${selectedBuild?.title || 'Custom Build'}\n\nPlease provide more details about your intended use and any additional requirements here:`);
                      setIsQuoteModalOpen(true);
                      setSelectedBuild(null); // Optional: close the build modal when opening quote
                    }}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-xs h-12 px-6 rounded-sm shadow-[0_0_15px_rgba(217,4,41,0.4)] transition-all"
                  >
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        initialInquiryType="build"
        initialRequirements={quoteRequirements || `Custom Build Inquiry\n\nPlease provide more details here:`}
      />
    </div>
  );
}
