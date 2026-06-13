"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Settings, Wrench, Package, ShieldCheck, Search,
  Activity, Zap, Compass, CheckCircle2, ChevronRight, ChevronLeft, 
  SlidersHorizontal, Phone, ArrowUpRight, Plus, Mountain, Filter,
  Briefcase, Truck, HardHat, Tractor, Pickaxe, Shield, Stethoscope
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// --- DUMMY DATA ---

const BUILD_CATEGORIES = [
  { title: "Expedition Builds", desc: "Long-range self-sustained travel setups.", img: "/cinematic_hilux_hero.png" },
  { title: "Overland Builds", desc: "Premium camping and exploration platforms.", img: "/desert-runner.png" },
  { title: "Adventure Builds", desc: "Weekend warrior and trail-ready modifications.", img: "/build1.png" },
  { title: "Commercial Utility Builds", desc: "Heavy-duty chassis configurations for work.", img: "/truck2.png" },
  { title: "Fleet Customization", desc: "Standardized enterprise deployments.", img: "/truck3.png" },
  { title: "Mining & Industrial Builds", desc: "Safety-compliant subterranean specs.", img: "/build2.png" },
  { title: "Agricultural Builds", desc: "Rugged platforms for farming and rural use.", img: "/build3.png" },
  { title: "Emergency & Rescue Vehicles", desc: "Rapid response and medical transport.", img: "/build4.png" },
  { title: "Security & Patrol Builds", desc: "Armored enforcement platforms.", img: "/black-edition.png" },
];

const SIGNATURE_SERIES = [
  { name: "JP Expedition Series", desc: "The ultimate global travel platform.", img: "/cinematic_hilux_hero.png" },
  { name: "JP Adventure Series", desc: "Engineered for extreme trails.", img: "/desert-runner.png" },
  { name: "JP Extreme Series", desc: "Uncompromised off-road dominance.", img: "/truck1.png" },
  { name: "JP Commercial Series", desc: "Built for the heaviest payloads.", img: "/truck4.png" },
  { name: "JP Fleet Series", desc: "Standardized, durable, and efficient.", img: "/truck3.png" },
  { name: "JP Rescue Series", desc: "Rapid response medical and extraction.", img: "/build2.png" },
  { name: "JP Security Series", desc: "Tactical defense and transport.", img: "/black-edition.png" },
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

const CONFIG_CATEGORIES = [
  "Vehicle Model", "Suspension Package", "Wheel Package", "Lighting Package",
  "Roof System", "Recovery Equipment", "Exterior Styling", "Storage Systems"
];

export default function CustomBuildsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeMission, setActiveMission] = useState(0);
  const [activeConfigTab, setActiveConfigTab] = useState(CONFIG_CATEGORIES[0]);
  const [selectedBuild, setSelectedBuild] = useState<{title: string, desc: string, img: string} | null>(null);

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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* 1. HERO SECTION (Compact Banner Style) */}
      <section className="relative pt-24 pb-8 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/cinematic_hilux_hero.png" 
            alt="Custom Toyota Hilux Build" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
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
                        <img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
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
                  <img src={series.img} alt={series.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
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
              
              <Button size="lg" className="w-fit bg-red-600 hover:bg-red-700 text-white px-10 h-14 font-bold tracking-widest uppercase rounded-sm shadow-[0_0_20px_rgba(217,4,41,0.4)] transition-all relative z-10">
                Configure This Mission
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDIO CONFIGURATOR */}
      <section className="py-24 bg-[#050505]">
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
                {[1, 2, 3].map((opt) => (
                  <div key={opt} className="flex items-center justify-between p-8 rounded-xl border border-white/5 bg-[#050505] hover:bg-white/5 hover:border-red-500/50 cursor-pointer transition-colors group">
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2 uppercase tracking-wider">Premium {activeConfigTab} Level {opt}</h4>
                      <p className="text-sm text-gray-500">Highest tier engineering and premium grade materials.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-red-500">
                      {opt === 1 && <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(217,4,41,0.8)]"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/4 bg-[#0a0a0a] p-8 md:p-12 border-l border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-6">Build Summary</h3>
                <ul className="space-y-6 text-sm font-medium text-gray-400 mb-12">
                  <li className="flex justify-between items-center"><span className="uppercase text-gray-500">Model</span> <span className="text-white font-bold bg-[#111] px-3 py-1 rounded">Hilux Revo</span></li>
                  <li className="flex justify-between items-center"><span className="uppercase text-gray-500">Suspension</span> <span className="text-white font-bold bg-[#111] px-3 py-1 rounded">Level 1</span></li>
                  <li className="flex justify-between items-center"><span className="uppercase text-gray-500">Wheels</span> <span className="text-white font-bold bg-[#111] px-3 py-1 rounded">Level 1</span></li>
                </ul>
              </div>
              <div>
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold tracking-widest uppercase py-7 rounded-sm text-sm transition-all">
                  Generate Custom Quote
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
              <img src="/cinematic_hilux_hero.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <img src="/desert-runner.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <img src="/truck2.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <img src="/truck3.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group border border-white/5 hover:border-white/20 transition-colors">
              <img src="/truck4.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="pt-16 pb-32 relative bg-[#050505] border-t border-red-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#111]/50 to-transparent z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-xl">
            Your Vision. <br/>
            <span className="text-red-600">Our Build Expertise.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-medium">
            Whether you&apos;re preparing for remote exploration, commercial operations, fleet deployment, or specialized missions, JP Distribution creates vehicles engineered beyond boundaries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 h-14 font-bold tracking-widest uppercase rounded-sm shadow-[0_0_30px_rgba(217,4,41,0.4)] transition-all">
              Start Your Custom Build
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black px-8 h-14 font-bold tracking-widest uppercase rounded-sm transition-all">
              Speak With A Specialist
            </Button>
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
                <img 
                  src={selectedBuild.img} 
                  alt={selectedBuild.title} 
                  className="w-full h-full object-cover opacity-80"
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
                  <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-xs h-12 px-6 rounded-sm shadow-[0_0_15px_rgba(217,4,41,0.4)] transition-all">
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
