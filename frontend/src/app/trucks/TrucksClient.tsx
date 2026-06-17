"use client";
import Image from "next/image";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Truck, Wrench, Settings, Package, 
  Globe, CheckCircle2, ChevronRight, ChevronLeft, Phone, 
  Mail, MapPin, Target, Award, Zap, Activity, Navigation, Maximize, X, MessageCircle, HeadphonesIcon,
  Search, ClipboardCheck, FileText, Ship, Pickaxe
} from 'lucide-react';

const IconMap: Record<string, React.ElementType> = {
  Globe, Package, Truck, Wrench, Target, Settings, ShieldCheck, Pickaxe
};
import { Button } from "@/components/ui/button";
import { CtaQuoteButton } from "@/components/ui/cta-quote-button";
import dynamic from "next/dynamic";

const WhatWeOfferCarousel = dynamic(() => import("@/components/ui/what-we-offer-carousel").then(mod => mod.WhatWeOfferCarousel), {
  ssr: true,
});
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/lib/submitLead";

// Dummy Data for Ecosystems (This would also eventually move to backend)
const ECOSYSTEMS = [
  { 
    id: 1, title: "Adventure & Overland", 
    desc: "Engineered for remote exploration and self-sustained travel across extreme terrain.", 
    icon: <Globe className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg",
    features: ["Turnkey custom overland builds", "Integrated canopy & tent systems", "Long-range fuel tank options"],
    specs: { Payload: "950 kg", Clearance: "11.5 inches", Drivetrain: "4x4 w/ Lockers" }
  },
  { 
    id: 2, title: "Commercial & Business", 
    desc: "Reliable, high-payload utility vehicles designed to maximize operational efficiency.", 
    icon: <Package className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498078/jp-distribution/trucks/cards/truck-2.png",
    features: ["Reinforced flatbed installations", "High-capacity load suspension", "Cost-effective fleet pricing"],
    specs: { Payload: "1,200 kg", CargoSpace: "Class-Leading", Reliability: "99.9% Uptime" }
  },
  { 
    id: 3, title: "Fleet Operations", 
    desc: "Standardized, durable trucks optimized for large-scale enterprise deployments.", 
    icon: <Truck className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498080/jp-distribution/trucks/cards/truck-3.png",
    features: ["Standardized maintenance parts", "Telematics & GPS pre-wiring", "Dedicated fleet account manager"],
    specs: { Volume: "10-100+ Units", Delivery: "Global Logistics", Support: "24/7 B2B Portal" }
  },
  { 
    id: 4, title: "Construction & Utility", 
    desc: "Heavy-duty chassis builds ready for demanding work sites and heavy hauling.", 
    icon: <Wrench className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498081/jp-distribution/trucks/cards/truck-4.png",
    features: ["Heavy-duty leaf spring upgrades", "Custom toolboxes & storage", "Site-compliant lighting & safety"],
    specs: { Suspension: "Heavy Duty", Towing: "3,500 kg", Protection: "Steel Bullbars" }
  },
  { 
    id: 5, title: "Agriculture", 
    desc: "Rugged rural mobility solutions built to withstand harsh farming environments.", 
    icon: <Target className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498040/jp-distribution/custom-builds/cards/build-1.png",
    features: ["Corrosion-resistant undercoating", "High-torque diesel powertrains", "All-terrain tire packages"],
    specs: { Engine: "High Torque", Durability: "Extreme", Tires: "All-Terrain" }
  },
  { 
    id: 6, title: "Mining & Industrial", 
    desc: "Specialized safety-compliant vehicles engineered for subterranean and surface mining.", 
    icon: <Settings className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498042/jp-distribution/custom-builds/cards/build-2.png",
    features: ["ROPS/FOPS certified roll cages", "Mine-spec electrical & lighting", "Battery isolators & fire suppression"],
    specs: { Safety: "Mine-Spec", RollCage: "Certified", Visibility: "360° LED" }
  },
  { 
    id: 7, title: "Government & Security", 
    desc: "Armored and patrol-ready platforms built for enforcement and secure transport.", 
    icon: <ShieldCheck className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498044/jp-distribution/custom-builds/cards/build-3.png",
    features: ["Discrete B6/B7 armor plating", "Run-flat tire systems", "Upgraded heavy-duty brakes"],
    specs: { Armor: "B6 / B7 Options", Brakes: "Heavy Duty", Security: "Maximized" }
  },
  { 
    id: 8, title: "Emergency & Rescue", 
    desc: "Rapid response vehicles equipped for medical, fire, and disaster recovery missions.", 
    icon: <Activity className="w-6 h-6" />, img: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498046/jp-distribution/custom-builds/cards/build-4.png",
    features: ["Emergency light & siren systems", "Custom medical/rescue canopies", "Dual battery & high-output alternators"],
    specs: { Electrical: "Dual Battery", Response: "Rapid", Storage: "Custom Medical" }
  },
];

const COMPARISON_DATA = [
  { id: "revo", name: "Revo Standard", engine: "2.4L Turbo Diesel", drive: "4x2 / 4x4 Optional", payload: "1,000 kg", suspension: "Standard Leaf", price: "$29,900" },
  { id: "vigo", name: "Vigo Commercial", engine: "2.5L D-4D Diesel", drive: "4x4 Standard", payload: "1,150 kg", suspension: "Heavy Duty Leaf", price: "$34,500" },
  { id: "adventure", name: "Adventure Build", engine: "2.8L GD-6 Turbo Diesel", drive: "4x4 w/ Locking Diffs", payload: "950 kg (Upgraded GVM)", suspension: "2\" Lift Fox Racing Shocks", price: "$52,800" },
  { id: "expedition", name: "Travo Expedition", engine: "2.8L Turbo Diesel", drive: "4x4 w/ Crawl Control", payload: "1,050 kg", suspension: "Ironman 4x4 Nitro Gas", price: "$48,500" },
  { id: "fleet", name: "Fleet Edition", engine: "2.4L Diesel", drive: "4x2 Standard", payload: "1,200 kg", suspension: "Heavy Duty Leaf", price: "$28,000" }
];

export default function TrucksClient({ featuredTrucks, pageConfig }: { featuredTrucks: any[], pageConfig?: any }) {
  // Extract sections from pageConfig if available
  const sections = pageConfig?.sections || [];
  
  const getSection = (id: string) => sections.find((s: any) => s.id === id) || { enabled: true, config: {} };
  
  const heroSection = getSection('hero');
  const ecosystemsSection = getSection('ecosystems');
  const featuredSection = getSection('featured');
  const comparisonSection = getSection('comparison');
  const processSection = getSection('process');
  const ctaSection = getSection('cta');

  // Filter trucks based on section selection if configured
  const displayTrucks = featuredSection.selectedTruckIds?.length > 0 
    ? featuredTrucks.filter(t => featuredSection.selectedTruckIds.includes(t._id))
    : featuredTrucks;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeEcosystem, setActiveEcosystem] = useState<any>(ECOSYSTEMS[0]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [activeTruck, setActiveTruck] = useState<any>(null);

  const [col1Id, setCol1Id] = useState("revo");
  const [col2Id, setCol2Id] = useState("vigo");
  const [col3Id, setCol3Id] = useState("adventure");

  const col1 = COMPARISON_DATA.find(t => t.id === col1Id) || COMPARISON_DATA[0];
  const col2 = COMPARISON_DATA.find(t => t.id === col2Id) || COMPARISON_DATA[1];
  const col3 = COMPARISON_DATA.find(t => t.id === col3Id) || COMPARISON_DATA[2];
  const sliderRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    let frameId: number;
    let direction = 1;
    const speed = 0.5;
    
    const scroll = () => {
      if (!el.matches(':hover')) {
        el.scrollLeft += speed * direction;
        // Check boundaries
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          direction = -1;
        } else if (el.scrollLeft <= 0) {
          direction = 1;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };
    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Form State
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", requirements: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return alert("Please fill required fields (Name, Email, Phone)");
    setIsSubmitting(true);
    try {
      await submitLead({
        formType: "Custom Build Request",
        sourcePage: "Trucks",
        sourceSection: "Transform Your Platform",
        selectedBuild: activeEcosystem.title,
        clickedButton: "Submit Request",
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.company,
        message: formData.requirements
      });
      setSubmitSuccess(true);
      setFormData({ name: "", company: "", email: "", phone: "", requirements: "" });
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsRequesting(false);
      }, 3000);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSliderMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="min-h-[80vh] bg-[#050505] text-white selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      {heroSection.enabled && (
        <section className="relative pt-24 pb-12 w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority 
              src={heroSection.config.backgroundImage || "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg"}
              alt="Toyota Hilux Extreme" 
              className="object-cover opacity-50 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl"
                dangerouslySetInnerHTML={{ 
                  __html: (!heroSection.config.heading || heroSection.config.heading === 'Built For Every Journey.\nEngineered For Every Ecosystem.') 
                    ? 'Built For <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Every</span> Journey. <br class="hidden md:block"/><span class="text-red-600">Engineered</span> For Every Ecosystem.' 
                    : heroSection.config.heading.replace(/\n/g, '<br/>')
                }}
            />
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
              {heroSection.config.subheading || 'From adventure-ready overland builds to commercial fleet solutions, discover Toyota Hilux trucks designed to perform in every environment and every industry.'}
            </p>
          </div>
        </section>
      )}

      {/* 2. MOBILITY ECOSYSTEMS SECTION */}
      {ecosystemsSection.enabled && (
        <section className="py-14 md:py-20 relative bg-[#050505]">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
                  {ecosystemsSection.config.heading || 'Mobility Ecosystems'}
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-medium">
                  {ecosystemsSection.config.subheading || 'We engineer purpose-built Hilux platforms tailored for specific industries, rigorous demands, and extreme environments.'}
                </p>
              </div>
            <div className="shrink-0">
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-sm h-12 px-6">
                View All Ecosystems <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(ecosystemsSection.config.items && ecosystemsSection.config.items.length > 0 ? ecosystemsSection.config.items : ECOSYSTEMS).map((eco: any) => {
              const IconComponent = typeof eco.icon === 'string' ? (IconMap[eco.icon] || Globe) : null;
              
              return (
              <div 
                key={eco.id} 
                className="group relative h-[400px] rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] cursor-pointer"
                onClick={() => {
                  setActiveEcosystem(eco);
                  setIsRequesting(false);
                  document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Background Image */}
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={eco.img} alt={eco.title} className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center text-red-500 mb-6 border border-red-500/30 backdrop-blur-md group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {IconComponent ? <IconComponent className="w-6 h-6" /> : eco.icon}
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-3 text-white group-hover:text-red-500 transition-colors">
                    {eco.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {eco.desc}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white group-hover:text-red-500 transition-colors">
                    <span>Explore Models</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
    )}


      {/* 2.5 TRANSFORM YOUR PLATFORM - CONFIGURATOR */}
      <section id="configurator" className="py-24 bg-[#0a0c10] border-t border-white/5 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
              Transform Your <span className="text-red-600">Platform</span>
            </h2>
          </div>

          <div className="flex flex-col xl:flex-row gap-12 lg:gap-16">
            
            {/* LEFT SIDE - INTERACTIVE SLIDER PREVIEW (45%) */}
            <div className="xl:w-[45%] relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none group"
                 ref={sliderRef}
                 onMouseMove={handleSliderMove}
                 onTouchMove={handleSliderMove}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEcosystem.id}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* After Image (Custom Build) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={activeEcosystem.img} alt={activeEcosystem.title} className="object-cover opacity-90" draggable="false" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>
                    <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded text-white text-xs font-bold uppercase tracking-widest border border-white/20 z-20">
                      CUSTOM BUILD
                    </div>
                  </div>

                  {/* Before Image (Base Model) */}
                  <div 
                    className="absolute inset-0 border-r-2 border-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498081/jp-distribution/trucks/cards/truck-4.png" alt="Base Model Before" className="object-cover" draggable="false" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded text-white text-xs font-bold uppercase tracking-widest border border-white/20 z-20">
                      BASE MODEL
                    </div>
                  </div>

                  {/* Slider Handle */}
                  <div 
                    className="absolute top-0 bottom-0 flex items-center justify-center z-30"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-ew-resize">
                      <div className="flex gap-1">
                        <ChevronLeft className="w-4 h-4 text-black" />
                        <ChevronRight className="w-4 h-4 text-black -ml-2" />
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE - CONFIGURATION OPTIONS (55%) */}
            <div className="xl:w-[55%] flex flex-col h-full min-h-[600px] relative">
              <AnimatePresence mode="wait">
                {isRequesting ? (
                  /* REQUEST BUILD HANDOFF FORM */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 bg-[#050505] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                      <div className="bg-red-600/20 p-3 rounded-xl border border-red-500/30">
                        {activeEcosystem.icon}
                      </div>
                      <div>
                        <h3 className="text-xl text-white font-bold uppercase tracking-wider">Request Build</h3>
                        <p className="text-red-500 text-sm font-bold tracking-widest uppercase">{activeEcosystem.title}</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Full Name *</label>
                          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Company / Organization</label>
                          <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Overland Co." />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address *</label>
                          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="john@example.com" required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Phone Number *</label>
                          <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="+1 (555) 000-0000" required />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Specific Requirements</label>
                          <textarea value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg h-24 p-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none" placeholder="Tell us about your build requirements..." />
                        </div>
                      </div>

                      {submitSuccess ? (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-lg flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm">
                          <CheckCircle2 className="w-5 h-5" /> Request Submitted Successfully
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <Button type="button" onClick={() => setIsRequesting(false)} variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/10 text-white uppercase tracking-widest text-xs font-bold rounded-lg transition-colors">
                            Back to Studio
                          </Button>
                          <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white uppercase tracking-widest text-sm font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] rounded-lg transition-colors">
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                          </Button>
                        </div>
                      )}
                    </form>
                  </motion.div>
                ) : (
                  /* CONFIGURATOR INTERFACE */
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full"
                  >
                    {/* Package Selector Tabs */}
                    <div ref={tabsRef} className="flex overflow-x-auto gap-4 pb-4 mb-8 hide-scrollbar cursor-grab active:cursor-grabbing" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {ECOSYSTEMS.map((eco) => (
                        <button
                          key={eco.id}
                          onClick={() => setActiveEcosystem(eco)}
                          className={`shrink-0 flex items-center justify-center px-6 py-3 rounded-xl border transition-all duration-300 ${
                            activeEcosystem.id === eco.id 
                            ? 'bg-red-600/10 border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                            : 'bg-[#111] border-white/5 hover:bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className={`text-xs font-bold uppercase tracking-widest ${activeEcosystem.id === eco.id ? 'text-white' : 'text-gray-400'}`}>
                            {eco.title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Details Panel */}
                    <div className="flex-1 bg-[#050505] border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col mb-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                        {React.cloneElement(activeEcosystem.icon as React.ReactElement<any>, { className: "w-48 h-48" })}
                      </div>

                      <div className="relative z-10">
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                          <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
                            {activeEcosystem.title}
                          </h3>
                          <Button 
                            onClick={() => setIsRequesting(true)}
                            className="w-full xl:w-auto h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] transition-all group"
                          >
                            Request Build <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                          {activeEcosystem.desc}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 border-y border-white/10 py-6">
                          {activeEcosystem.specs && Object.entries(activeEcosystem.specs).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">{key}</span>
                              <span className="text-sm font-bold text-white uppercase tracking-wider">{value as string}</span>
                            </div>
                          ))}
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">Lead Time</span>
                            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">8-12 Weeks</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Standard Components</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {activeEcosystem.features?.map((feature: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 bg-[#111] border border-white/5 p-3 rounded-lg hover:border-red-500/30 transition-colors cursor-default">
                                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                                <span className="text-xs font-medium text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED TRUCK COLLECTIONS */}
      {featuredSection.enabled && (
        <section className="py-14 md:py-20 bg-[#0a0c10] border-y border-white/5 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white"
                  dangerouslySetInnerHTML={{ __html: featuredSection.config.heading || 'Featured <span class="text-red-600">Collections</span>' }}
              />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {featuredSection.config.subheading || 'Browse our curated selection of premium Toyota Hilux builds ready for immediate deployment or global export.'}
              </p>
            </div>

            <WhatWeOfferCarousel>
              {displayTrucks.map((truck: any, idx: number) => (
                <div 
                  key={truck._id || idx} 
                  className="w-[350px] md:w-[400px] shrink-0 snap-center group cursor-pointer"
                  onClick={() => setActiveTruck(truck)}
                >
                  <div className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#111]">
                    {truck.images?.[0] && (
                      <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={truck.images[0]} alt={truck.title} className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest">
                        {truck.condition || 'NEW'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-red-600 text-white text-[12px] font-bold px-4 py-2 rounded-sm shadow-lg">
                        ${truck.price?.toLocaleString() || 'POA'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-wide mb-4 group-hover:text-red-500 transition-colors">
                      {truck.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-400 mb-6 font-medium">
                      <div className="flex flex-col border-b border-white/5 pb-2">
                         <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Brand</span>
                        <span className="text-white">{truck.brand}</span>
                      </div>
                      <div className="flex flex-col border-b border-white/5 pb-2">
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Model</span>
                        <span className="text-white">{truck.model}</span>
                      </div>
                    <div className="flex flex-col border-b border-white/5 pb-2">
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Year</span>
                      <span className="text-white">{truck.year}</span>
                    </div>
                    <div className="flex flex-col border-b border-white/5 pb-2">
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Availability</span>
                      <span className="text-emerald-500">{truck.stockStatus || 'In Stock'}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-red-500 font-bold text-sm uppercase tracking-widest">
                    Explore Details <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </WhatWeOfferCarousel>
        </div>
      </section>
      )}



      {/* 5. TRUCK COMPARISON TOOL */}
      {comparisonSection.enabled && (
        <section className="py-14 md:py-20 bg-[#0a0c10] border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tight mb-4 text-white"
                  dangerouslySetInnerHTML={{ __html: comparisonSection.config.heading || 'Platform <span class="text-red-600">Comparison</span>' }}
              />
              <p className="text-gray-400 max-w-2xl mx-auto">
                {comparisonSection.config.subheading || 'Compare technical specifications across our most popular Hilux build platforms.'}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#050505]">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 text-gray-400 font-bold uppercase tracking-widest text-xs w-1/4">Specification</th>
                    <th className="p-6 text-white font-bold uppercase tracking-widest text-sm w-1/4">
                      <select 
                        value={col1Id} 
                        onChange={(e) => setCol1Id(e.target.value)}
                        className="bg-[#111] border border-white/20 text-white rounded px-2 py-1 focus:outline-none focus:border-red-500 w-full"
                      >
                        {COMPARISON_DATA.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </th>
                    <th className="p-6 text-white font-bold uppercase tracking-widest text-sm w-1/4">
                      <select 
                        value={col2Id} 
                        onChange={(e) => setCol2Id(e.target.value)}
                        className="bg-[#111] border border-white/20 text-white rounded px-2 py-1 focus:outline-none focus:border-red-500 w-full"
                      >
                        {COMPARISON_DATA.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </th>
                    <th className="p-6 text-white font-bold uppercase tracking-widest text-sm w-1/4 border-l border-red-500/30 bg-red-900/10">
                      <select 
                        value={col3Id} 
                        onChange={(e) => setCol3Id(e.target.value)}
                        className="bg-[#111] border border-red-500/50 text-white rounded px-2 py-1 focus:outline-none focus:border-red-500 w-full"
                      >
                        {COMPARISON_DATA.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-gray-300">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-500 uppercase tracking-widest text-xs">Engine</td>
                    <td className="p-6">{col1.engine}</td>
                    <td className="p-6">{col2.engine}</td>
                    <td className="p-6 border-l border-white/5 text-white">{col3.engine}</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-500 uppercase tracking-widest text-xs">Drivetrain</td>
                    <td className="p-6">{col1.drive}</td>
                    <td className="p-6">{col2.drive}</td>
                    <td className="p-6 border-l border-white/5 text-white">{col3.drive}</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-500 uppercase tracking-widest text-xs">Payload Capacity</td>
                    <td className="p-6">{col1.payload}</td>
                    <td className="p-6">{col2.payload}</td>
                    <td className="p-6 border-l border-white/5 text-white">{col3.payload}</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-500 uppercase tracking-widest text-xs">Suspension</td>
                    <td className="p-6">{col1.suspension}</td>
                    <td className="p-6">{col2.suspension}</td>
                    <td className="p-6 border-l border-white/5 text-white">{col3.suspension}</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-500 uppercase tracking-widest text-xs">Starting Price</td>
                    <td className="p-6 font-bold">{col1.price}</td>
                    <td className="p-6 font-bold">{col2.price}</td>
                    <td className="p-6 border-l border-white/5 font-bold text-red-500">{col3.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 6. IMPORT PROCESS TIMELINE & TRUST */}
      {processSection.enabled && (
        <section className="py-14 md:py-20 bg-[#050505] relative overflow-hidden">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <h4 className="text-red-600 font-bold text-xs md:text-sm mb-3 uppercase tracking-widest">THAILAND TO SURINAME</h4>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 uppercase tracking-tight"
                  dangerouslySetInnerHTML={{ __html: processSection.config.heading || 'OUR JOURNEY. YOUR PEACE OF MIND.' }}
              />
            </div>

            {/* Horizontal Timeline */}
            <div className="relative w-full overflow-x-auto mb-16 pb-8 pt-4 hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* The Connecting Line */}
              <div className="absolute top-[56px] left-[7%] w-[86%] h-[2px] bg-red-600/10 z-0 hidden lg:block overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                  style={{
                    boxShadow: "0 0 20px 4px rgba(220, 38, 38, 0.9)",
                    animation: "movingLight 8s linear infinite"
                  }}
                ></div>
                <style>{`
                  @keyframes movingLight {
                    0% { left: -20%; }
                    100% { left: 120%; }
                  }
                `}</style>
              </div>
              
              <div className="flex flex-nowrap lg:grid lg:grid-cols-7 gap-6 min-w-max lg:min-w-0 relative z-10">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">01</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">SOURCING</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Carefully selected from trusted dealers in Thailand.</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <ClipboardCheck className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">02</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">INSPECTION</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">120+ point inspection for quality, performance & reliability.</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">03</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">CUSTOMIZATION</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Built to your needs with expert craftsmanship & premium parts.</p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">04</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">EXPORT</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Documentation, customs clearance & secure loading.</p>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <Ship className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">05</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">OCEAN FREIGHT</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Safe & insured shipping across the ocean to Suriname.</p>
                </div>

                {/* Step 6 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">06</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">ARRIVAL</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Cleared through customs & prepared for delivery.</p>
                </div>

                {/* Step 7 */}
                <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#080b12] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">07</div>
                  <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3">DELIVERY</h4>
                  <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Delivered to your door ready for the road.</p>
                </div>

              </div>
            </div>


          </div>
        </section>
      )}

      {/* 7. REDESIGNED CTA SECTION */}
      {ctaSection.enabled && (
        <section className="relative bg-[#050505]">
          <div className="w-[96%] max-w-[1800px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0c10]">
            
            {/* Top Image Banner */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
              <div className="absolute inset-0 z-0">
                 <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498069/jp-distribution/shared/backgrounds/unique-hilux-cta.jpg" 
                  alt="Unique Off-Road Toyota Hilux" 
                  className="object-cover object-[70%_center] opacity-60"
                />
                {/* Gradients to fade left text area and bottom for the info bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent"></div>
              </div>
              
              <div className="px-6 lg:px-16 h-full relative z-10 flex flex-col justify-center">
                <div className="max-w-3xl mt-4">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight"
                      dangerouslySetInnerHTML={{ __html: ctaSection.config.heading || 'READY TO IMPORT, BUILD, OR SOURCE?' }}
                  />
                  <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                    {ctaSection.config.subheading || 'Partner with a trusted Toyota Hilux import and parts specialist committed to quality, transparency, and your success.'}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <CtaQuoteButton text="REQUEST A QUOTE" initialInquiryType="truck" />
                    
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
      )}



      {/* FEATURED TRUCK DETAILS MODAL */}
      {activeTruck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveTruck(null)}
          ></div>
          
          {/* Modal Content Wrapper (To allow button overflow) */}
          <div className="relative z-10 w-full max-w-5xl">
            
            <button 
              onClick={() => setActiveTruck(null)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-colors border-2 border-[#050505]"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full bg-[#0a0c10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">

            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
              <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src={activeTruck.img} alt={activeTruck.name} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] md:bg-gradient-to-r md:from-transparent md:to-[#0a0c10]"></div>
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-lg">
                  {activeTruck.badge}
                </span>
                <span className="bg-black/80 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest">
                  In Stock
                </span>
              </div>
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px] mb-4">
                <ShieldCheck className="w-4 h-4" /> Ready for Global Export
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2 leading-none">
                {activeTruck.name}
              </h2>
              <div className="text-2xl font-bold text-gray-300 mb-8">
                {activeTruck.price} <span className="text-xs text-gray-500 tracking-widest ml-2">EXW THAILAND</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10 border-y border-white/10 py-8">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2"><Settings className="w-3 h-3"/> Engine</span>
                  <span className="text-sm font-bold text-white uppercase">{activeTruck.engine}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2"><Zap className="w-3 h-3"/> Transmission</span>
                  <span className="text-sm font-bold text-white uppercase">{activeTruck.trans}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2"><Navigation className="w-3 h-3"/> Drivetrain</span>
                  <span className="text-sm font-bold text-white uppercase">{activeTruck.drive}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2"><MapPin className="w-3 h-3"/> Location</span>
                  <span className="text-sm font-bold text-white uppercase">Bangkok Hub</span>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest h-14 text-base">
                  Request Quote
                </Button>
                <Button variant="outline" className="border-red-600/50 hover:bg-red-600 hover:text-white text-red-500 w-14 h-14 shrink-0 flex items-center justify-center p-0 rounded-md transition-colors">
                  <Phone className="w-5 h-5" />
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

