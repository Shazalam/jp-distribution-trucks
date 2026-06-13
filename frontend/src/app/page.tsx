import Link from "next/link";
import { ArrowRight, ShieldCheck, Settings, Globe, Truck, CheckCircle2, ChevronRight, Package, Wrench, Search, Star, HeartHandshake, ClipboardCheck, FileText, Ship, Phone, Mail, MessageCircle, HeadphonesIcon, Award, User, Shield, Mountain, Map, Briefcase, Network, Tent, Compass, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnterpriseCarousel } from "@/components/ui/enterprise-carousel";
import { WhatWeOfferCarousel } from "@/components/ui/what-we-offer-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO & PROMISE FULL-SCREEN SECTION */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-between overflow-hidden bg-black pt-[30px]">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            src="/custom_hero_bg_vid.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover object-[70%_center] opacity-100"
          />
          {/* Top 20% fade to black to merge with Navbar */}
          <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black via-black/80 to-transparent"></div>
          
          {/* Left side premium fade starting from 60% */}
          <div className="absolute top-0 left-0 w-full lg:w-[65%] h-full bg-gradient-to-r from-black via-black/95 to-transparent"></div>
          
          {/* Additional atmospheric shadow and soft glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
          
          {/* Subtle particles/fog simulation (CSS) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen animate-pulse pointer-events-none"></div>
        </div>

        {/* MAIN HERO CONTENT */}
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10 w-full flex-1 flex flex-col justify-start pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
            
            {/* Left Content */}
            <div className="max-w-[800px] flex flex-col justify-start">
              <h3 className="font-bold tracking-widest text-xs md:text-sm mb-4 uppercase drop-shadow-md bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent inline-block">
                THAILAND TO SURINAME & BEYOND
              </h3>
              
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] mb-8 uppercase tracking-tighter drop-shadow-2xl">
                <span className="animate-shine-white text-white block mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">YOUR JOURNEY.</span>
                <span className="animate-shine-red text-red-600 block drop-shadow-[0_0_40px_rgba(217,4,41,0.4)]">OUR COMMITMENT.</span>
              </h1>
              
              <div className="text-xl md:text-2xl text-gray-300 mb-12 max-w-[700px] leading-relaxed font-medium drop-shadow-md">
                <p>We import, customize, and supply Toyota Hilux trucks and genuine parts from Thailand to Suriname and international markets.</p>
                <p className="text-white font-bold tracking-wide mt-1">Built for adventure. Backed by trust. Delivered with care.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 mb-6">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-12 text-sm transition-all duration-300 hover:scale-105 uppercase tracking-wide rounded border border-red-500/50 shadow-[0_0_30px_rgba(217,4,41,0.3)] hover:shadow-[0_0_50px_rgba(217,4,41,0.5)]">
                  <Link href="/trucks">
                    IMPORT A TRUCK
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 bg-black/30 backdrop-blur-md hover:bg-white/10 text-white font-bold h-14 px-8 text-sm transition-all duration-300 uppercase tracking-wide rounded shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <Link href="/get-quote">
                    REQUEST PARTS QUOTE
                  </Link>
                </Button>
              </div>

              {/* Floating Trust Badges Box */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl py-5 px-5 inline-flex flex-nowrap whitespace-nowrap gap-x-5 lg:gap-x-6 items-center shadow-[0_30px_60px_rgba(0,0,0,0.6)] w-max max-w-[90vw] xl:max-w-[1200px] overflow-x-auto relative z-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-12 h-12 text-red-500 shrink-0 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg uppercase tracking-wider drop-shadow-md">100% Inspected</h4>
                    <p className="text-gray-300 text-sm md:text-base tracking-wide">Quality Guarantee</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-12 h-12 text-red-500 shrink-0 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg uppercase tracking-wider drop-shadow-md">Genuine Parts</h4>
                    <p className="text-gray-300 text-sm md:text-base tracking-wide">Verified Network</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-12 h-12 text-red-500 shrink-0 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg uppercase tracking-wider drop-shadow-md">Global Shipping</h4>
                    <p className="text-gray-300 text-sm md:text-base tracking-wide">Safe & Secure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-12 h-12 text-red-500 shrink-0 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg uppercase tracking-wider drop-shadow-md">Dedicated Support</h4>
                    <p className="text-gray-300 text-sm md:text-base tracking-wide">We&apos;re Here For You</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Content - Empty to let background show through */}
            <div className="hidden lg:block"></div>

          </div>
        </div>

        {/* BOTTOM PROMISE BAR (INSIDE HERO) */}
        <div className="relative z-20 w-[96%] max-w-[1800px] mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl py-4 mt-auto mb-28 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="px-6 lg:px-10">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-center">
              
              <div className="xl:col-span-1">
                <h4 className="text-red-600 font-bold text-xs mb-1 uppercase">OUR PROMISE</h4>
                <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2 uppercase leading-tight">
                  BUILT ON TRUST. <br className="hidden xl:block" /> DRIVEN BY QUALITY.
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-2 leading-relaxed max-w-xl">
                  From the moment we source to the moment we deliver, every step is handled with precision, transparency, and responsibility.
                </p>
                <Link href="/commitments" className="text-red-500 hover:text-red-400 font-bold text-[11px] uppercase flex items-center transition-colors">
                  LEARN MORE ABOUT OUR COMMITMENTS <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </div>
              
              <div className="xl:col-span-2">
                <div className="bg-black/50 border border-white/10 rounded-xl py-3 px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-3 gap-x-2 text-center relative overflow-hidden">
                  <div className="flex flex-col justify-center relative">
                    <span className="text-white font-bold text-2xl md:text-3xl">15+</span>
                    <span className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-wider">YEARS EXPERIENCE</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden md:block"></div>
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <span className="text-white font-bold text-2xl md:text-3xl">2,500+</span>
                    <span className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-wider">VEHICLES IMPORTED</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden lg:block"></div>
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <span className="text-white font-bold text-2xl md:text-3xl">250K+</span>
                    <span className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-wider">PARTS DELIVERED</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden md:block"></div>
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <span className="text-white font-bold text-2xl md:text-3xl">500+</span>
                    <span className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-wider">BUSINESS PARTNERS</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden lg:block"></div>
                  </div>
                  <div className="flex flex-col justify-center relative">
                    <span className="text-white font-bold text-2xl md:text-3xl">35+</span>
                    <span className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-wider">COUNTRIES SERVED</span>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden md:block"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-white font-bold text-2xl md:text-3xl">98%</span>
                    <span className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-wider">CUSTOMER SATISFACTION</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE BUSINESS SECTIONS */}
      <section className="pt-16 pb-10 bg-[#050505] relative z-20">
        {/* Seamless fade from black hero to #050505 background */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight drop-shadow-lg">
              What We <span className="text-red-600">Offer</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Complete solutions for truck imports, custom builds, and genuine parts.
            </p>
          </div>

          <WhatWeOfferCarousel>
            
            {/* Truck Imports */}
            <Link href="/trucks" className="group block h-full w-[320px] md:w-[350px] shrink-0 snap-center">
              <div className="rounded-xl overflow-hidden h-full border border-white/10 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(217,4,41,0.3)] flex flex-col bg-[#050505]">
                {/* Title Above Image */}
                <div className="p-4 flex items-center gap-4 bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
                  <div className="bg-[#3a0d0d] p-2.5 rounded-xl border border-red-500/20">
                    <Truck className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-lg md:text-xl uppercase tracking-widest">Truck Imports</h3>
                </div>
                {/* Image */}
                <div className="h-48 overflow-hidden relative shrink-0 z-10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=2069&auto=format&fit=crop" alt="Truck Imports" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Glassmorphism Text Below */}
                <div className="p-6 flex flex-col flex-1 bg-white/5 backdrop-blur-md z-20">
                  <p className="text-gray-300 font-serif text-sm leading-relaxed mb-6">
                    Toyota Hilux Tiger, Vigo, Revo, Travo Overland, brand-new Toyota trucks, and more selected brands.
                  </p>
                  <span className="text-red-500 font-serif font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform mt-auto">
                    View Inventory <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Custom Builds */}
            <Link href="/custom-builds" className="group block h-full w-[320px] md:w-[350px] shrink-0 snap-center">
              <div className="rounded-xl overflow-hidden h-full border border-white/10 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(217,4,41,0.3)] flex flex-col bg-[#050505]">
                <div className="p-4 flex items-center gap-4 bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
                  <div className="bg-[#3a0d0d] p-2.5 rounded-xl border border-red-500/20">
                    <Wrench className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-lg md:text-xl uppercase tracking-widest">Custom Builds</h3>
                </div>
                <div className="h-48 overflow-hidden relative shrink-0 z-10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="/desert-runner.png" alt="Custom Builds" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white/5 backdrop-blur-md z-20">
                  <p className="text-gray-300 font-serif text-sm leading-relaxed mb-6">
                    Overland builds, off-road upgrades, lift kits, wheels, bumpers, lighting, suspension, and special-purpose builds.
                  </p>
                  <span className="text-red-500 font-serif font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform mt-auto">
                    See Gallery <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Parts & Supply */}
            <Link href="/parts-supply" className="group block h-full w-[320px] md:w-[350px] shrink-0 snap-center">
              <div className="rounded-xl overflow-hidden h-full border border-white/10 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(217,4,41,0.3)] flex flex-col bg-[#050505]">
                <div className="p-4 flex items-center gap-4 bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
                  <div className="bg-[#3a0d0d] p-2.5 rounded-xl border border-red-500/20">
                    <Settings className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-lg md:text-xl uppercase tracking-widest">Parts & Supply</h3>
                </div>
                <div className="h-48 overflow-hidden relative shrink-0 z-10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="/premium_wholesale_parts.png" alt="Parts Supply" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white/5 backdrop-blur-md z-20">
                  <p className="text-gray-300 font-serif text-sm leading-relaxed mb-6">
                    Genuine new and used Toyota parts, engines, transmissions, suspension, electrical parts, body parts, and accessories.
                  </p>
                  <span className="text-red-500 font-serif font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform mt-auto">
                    Browse Parts <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Special Parts Locator */}
            <Link href="/special-parts-locator" className="group block h-full w-[320px] md:w-[350px] shrink-0 snap-center">
              <div className="rounded-xl overflow-hidden h-full border border-white/10 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(217,4,41,0.3)] flex flex-col bg-[#050505]">
                <div className="p-4 flex items-center justify-between bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#3a0d0d] p-2.5 rounded-xl border border-red-500/20">
                      <Search className="h-5 w-5 text-red-500" />
                    </div>
                    <h3 className="text-white font-serif font-bold text-lg md:text-xl uppercase tracking-widest">Parts Locator</h3>
                  </div>
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
                </div>
                <div className="h-48 overflow-hidden relative shrink-0 z-10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="/1.png" alt="Parts Locator" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white/5 backdrop-blur-md z-20">
                  <p className="text-gray-300 font-serif text-sm leading-relaxed mb-6">
                    Can&apos;t find a rare part? Use our smart form to request rare parts. Just enter your vehicle model, VIN, and upload a reference image.
                  </p>
                  <span className="text-red-500 font-serif font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform mt-auto">
                    Find My Part <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Wholesale Orders */}
            <Link href="/wholesale-retail" className="group block h-full w-[320px] md:w-[350px] shrink-0 snap-center">
              <div className="rounded-xl overflow-hidden h-full border border-white/10 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(217,4,41,0.3)] flex flex-col bg-[#050505]">
                <div className="p-4 flex items-center gap-4 bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
                  <div className="bg-[#3a0d0d] p-2.5 rounded-xl border border-red-500/20">
                    <Package className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-lg md:text-xl uppercase tracking-widest">Wholesale</h3>
                </div>
                <div className="h-48 overflow-hidden relative shrink-0 z-10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="/wholesale_parts.png" alt="Wholesale Orders" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white/5 backdrop-blur-md z-20">
                  <p className="text-gray-300 font-serif text-sm leading-relaxed mb-6">
                    Bulk pricing for businesses, full container shipments, and dedicated dealer & distributor support globally.
                  </p>
                  <span className="text-red-500 font-serif font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform mt-auto">
                    Wholesale Inquiry <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Export & Logistics */}
            <Link href="/commitments" className="group block h-full w-[320px] md:w-[350px] shrink-0 snap-center">
               <div className="rounded-xl overflow-hidden h-full border border-white/10 transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(217,4,41,0.3)] flex flex-col bg-[#050505]">
                <div className="p-4 flex items-center gap-4 bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
                  <div className="bg-[#3a0d0d] p-2.5 rounded-xl border border-red-500/20">
                    <Globe className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-lg md:text-xl uppercase tracking-widest">Export & Logistics</h3>
                </div>
                <div className="h-48 overflow-hidden relative shrink-0 z-10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="/safe_shipping.png" alt="Export & Logistics" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white/5 backdrop-blur-md z-20">
                  <p className="text-gray-300 font-serif text-sm leading-relaxed mb-6">
                    Safe shipping, export documentation support, and full logistics handling from Thailand to Suriname and global destinations.
                  </p>
                  <span className="text-red-500 font-serif font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform mt-auto">
                    Our Commitments <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

          </WhatWeOfferCarousel>
        </div>
      </section>

      {/* ENTERPRISE MOBILITY VEHICLE ECOSYSTEM */}
      <section className="pt-10 pb-24 bg-gradient-to-b from-[#050505] to-black relative overflow-hidden">
        {/* Smooth transition fade if needed, though from-[#050505] handles it */}
        
        {/* Background ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col mb-16 items-center text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight mb-6">Built for Every Mobility Ecosystem</h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
              Supporting luxury vehicles, commercial fleets, RV operators, and enterprise transportation ecosystems through nationwide roadside infrastructure and intelligent mobility coordination.
            </p>
          </div>
        </div>

        {/* Infinite Carousel Component */}
        <EnterpriseCarousel />
      </section>

      {/* CUSTOM BUILDS */}
      <section className="pt-16 pb-20 bg-[#050505] relative z-20">
        {/* Seamless fade from black previous section to #050505 background */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h4 className="text-red-600 font-bold text-xs mb-2 uppercase tracking-widest">CUSTOM BUILDS</h4>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">BUILT BEYOND BOUNDARIES</h2>
            </div>
            <Link href="/custom-builds" className="text-red-600 hover:text-red-500 font-bold text-xs uppercase flex items-center transition-colors">
              VIEW ALL BUILDS <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Build 1 */}
            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors bg-[#111]">
              <img src="/build1.png" alt="Expedition Builds" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-black/80"></div>
              <div className="absolute inset-0 p-6 flex flex-col">
                <h3 className="text-white font-bold text-lg uppercase mb-2">EXPEDITION BUILDS</h3>
                <p className="text-gray-300 text-xs leading-relaxed max-w-[200px]">Engineered for long journeys and extreme conditions.</p>
                <Link href="/builds/expedition" className="mt-auto text-red-600 font-bold text-xs uppercase flex items-center group-hover:translate-x-2 transition-transform">
                  EXPLORE <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Build 2 */}
            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors bg-[#111]">
              <img src="/build2.png" alt="Adventure Builds" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-black/80"></div>
              <div className="absolute inset-0 p-6 flex flex-col">
                <h3 className="text-white font-bold text-lg uppercase mb-2">ADVENTURE BUILDS</h3>
                <p className="text-gray-300 text-xs leading-relaxed max-w-[200px]">Perfect for off-road exploration and overland trips.</p>
                <Link href="/builds/adventure" className="mt-auto text-red-600 font-bold text-xs uppercase flex items-center group-hover:translate-x-2 transition-transform">
                  EXPLORE <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Build 3 */}
            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors bg-[#111]">
              <img src="/build3.png" alt="Commercial Builds" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-black/80"></div>
              <div className="absolute inset-0 p-6 flex flex-col">
                <h3 className="text-white font-bold text-lg uppercase mb-2">COMMERCIAL BUILDS</h3>
                <p className="text-gray-300 text-xs leading-relaxed max-w-[200px]">Built tough for business, fleets, and daily operations.</p>
                <Link href="/builds/commercial" className="mt-auto text-red-600 font-bold text-xs uppercase flex items-center group-hover:translate-x-2 transition-transform">
                  EXPLORE <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Build 4 */}
            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors bg-[#111]">
              <img src="/build4.png" alt="Extreme Builds" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-black/80"></div>
              <div className="absolute inset-0 p-6 flex flex-col">
                <h3 className="text-white font-bold text-lg uppercase mb-2">EXTREME BUILDS</h3>
                <p className="text-gray-300 text-xs leading-relaxed max-w-[200px]">Pushing limits with custom upgrades and performance.</p>
                <Link href="/builds/extreme" className="mt-auto text-red-600 font-bold text-xs uppercase flex items-center group-hover:translate-x-2 transition-transform">
                  EXPLORE <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GENUINE PARTS */}
      <section className="pt-8 pb-10 bg-[#050505] relative z-20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h4 className="text-red-600 font-bold text-xs mb-2 uppercase tracking-widest">GENUINE PARTS & SUPPLY</h4>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">QUALITY PARTS. UNMATCHED RELIABILITY.</h2>
            </div>
            <Link href="/parts-supply" className="text-red-600 hover:text-red-500 font-bold text-xs uppercase flex items-center transition-colors">
              VIEW ALL PARTS <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            
            {/* Part 1 */}
            <Link href="/parts/engine" className="relative h-40 md:h-48 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors block bg-[#111]">
              <img src="/parts-engine.png" alt="Engine Components" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#111] border border-red-600 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                  <Settings className="w-4 h-4" />
                </div>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider">ENGINE COMPONENTS</h4>
              </div>
            </Link>

            {/* Part 2 */}
            <Link href="/parts/suspension" className="relative h-40 md:h-48 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors block bg-[#111]">
              <img src="/parts-suspension.png" alt="Suspension Systems" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#111] border border-red-600 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider">SUSPENSION SYSTEMS</h4>
              </div>
            </Link>

            {/* Part 3 */}
            <Link href="/parts/electrical" className="relative h-40 md:h-48 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors block bg-[#111]">
              <img src="/parts-electrical.png" alt="Electrical & Lighting" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#111] border border-red-600 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                  <Star className="w-4 h-4" />
                </div>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider">ELECTRICAL & LIGHTING</h4>
              </div>
            </Link>

            {/* Part 4 */}
            <Link href="/parts/overland" className="relative h-40 md:h-48 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors block bg-[#111]">
              <img src="/parts-overland.png" alt="Overland Equipment" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#111] border border-red-600 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                  <Package className="w-4 h-4" />
                </div>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider">OVERLAND EQUIPMENT</h4>
              </div>
            </Link>

            {/* Part 5 */}
            <Link href="/parts/body" className="relative h-40 md:h-48 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors block bg-[#111]">
              <img src="/parts-body.png" alt="Body & Exterior" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#111] border border-red-600 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                  <Wrench className="w-4 h-4" />
                </div>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider">BODY & EXTERIOR</h4>
              </div>
            </Link>

            {/* Part 6 */}
            <Link href="/parts/performance" className="relative h-40 md:h-48 rounded-xl overflow-hidden group border border-white/10 hover:border-red-500/50 transition-colors block bg-[#111]">
              <img src="/parts-performance.png" alt="Performance Parts" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#111] border border-red-600 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_10px_rgba(217,4,41,0.3)]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-wider">PERFORMANCE PARTS</h4>
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* COMMITMENTS SECTION */}
      <section className="pt-10 pb-24 bg-[#0a0a0a] relative">
        {/* Seamless fade from #050505 background to #0a0a0a */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none"></div>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
            <div className="h-px bg-gradient-to-r from-transparent to-red-600 w-16 md:w-48 opacity-70"></div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight shrink-0">
              OUR COMMITMENTS
            </h2>
            <div className="h-px bg-gradient-to-l from-transparent to-red-600 w-16 md:w-48 opacity-70"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group hover:border-red-500/30 transition-colors">
              <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=500" alt="Quality Inspection" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-[3px] border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold text-lg group-hover:text-black transition-colors">01</span>
                </div>
              </div>
              <div className="pt-10 pb-6 px-5 flex flex-col flex-1 text-center items-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4 h-12 flex items-center justify-center leading-tight">QUALITY<br/>INSPECTION</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">Every vehicle is carefully inspected before export to ensure reliability, performance, and roadworthiness.</p>
                <div className="w-full border border-red-600/50 bg-transparent text-red-500 text-[10px] md:text-xs font-bold py-2.5 px-2 rounded-lg uppercase tracking-wider group-hover:bg-red-600/10 transition-colors">
                  100% Pre-Export Inspection
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group hover:border-red-500/30 transition-colors">
              <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=500" alt="Genuine Parts" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-[3px] border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold text-lg group-hover:text-black transition-colors">02</span>
                </div>
              </div>
              <div className="pt-10 pb-6 px-5 flex flex-col flex-1 text-center items-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4 h-12 flex items-center justify-center leading-tight">GENUINE PARTS<br/>COMMITMENT</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">We source only genuine Toyota parts and verified components from trusted suppliers for long-lasting performance.</p>
                <div className="w-full border border-red-600/50 bg-transparent text-red-500 text-[10px] md:text-xs font-bold py-2.5 px-2 rounded-lg uppercase tracking-wider group-hover:bg-red-600/10 transition-colors">
                  Verified Genuine Parts Network
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group hover:border-red-500/30 transition-colors">
              <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=500" alt="Transparent Pricing" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-[3px] border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold text-lg group-hover:text-black transition-colors">03</span>
                </div>
              </div>
              <div className="pt-10 pb-6 px-5 flex flex-col flex-1 text-center items-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4 h-12 flex items-center justify-center leading-tight">TRANSPARENT<br/>PRICING</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">No hidden costs. No surprises. Clear, itemized quotations with competitive pricing for all customers.</p>
                <div className="w-full border border-red-600/50 bg-transparent text-red-500 text-[10px] md:text-xs font-bold py-2.5 px-2 rounded-lg uppercase tracking-wider group-hover:bg-red-600/10 transition-colors">
                  Transparent Pricing Guarantee
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group hover:border-red-500/30 transition-colors">
              <div className="h-40 relative">
                <img src="/safe_shipping.png" alt="Safe Shipping" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-[3px] border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold text-lg group-hover:text-black transition-colors">04</span>
                </div>
              </div>
              <div className="pt-10 pb-6 px-5 flex flex-col flex-1 text-center items-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4 h-12 flex items-center justify-center leading-tight">SAFE<br/>SHIPPING</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">Every shipment is carefully packed, documented, and tracked from origin to destination.</p>
                <div className="w-full border border-red-600/50 bg-transparent text-red-500 text-[10px] md:text-xs font-bold py-2.5 px-2 rounded-lg uppercase tracking-wider group-hover:bg-red-600/10 transition-colors">
                  Safe Shipping Commitment
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group hover:border-red-500/30 transition-colors">
              <div className="h-40 relative">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500" alt="After-Sales Support" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-[3px] border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold text-lg group-hover:text-black transition-colors">05</span>
                </div>
              </div>
              <div className="pt-10 pb-6 px-5 flex flex-col flex-1 text-center items-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4 h-12 flex items-center justify-center leading-tight">AFTER-SALES<br/>SUPPORT</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">Our relationship doesn&apos;t end at delivery. We provide ongoing support, guidance & technical assistance.</p>
                <div className="w-full border border-red-600/50 bg-transparent text-red-500 text-[10px] md:text-xs font-bold py-2.5 px-2 rounded-lg uppercase tracking-wider group-hover:bg-red-600/10 transition-colors">
                  Dedicated Customer Support
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group hover:border-red-500/30 transition-colors">
              <div className="h-40 relative">
                <img src="/wholesale_parts.png" alt="Wholesale Partner" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-[3px] border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold text-lg group-hover:text-black transition-colors">06</span>
                </div>
              </div>
              <div className="pt-10 pb-6 px-5 flex flex-col flex-1 text-center items-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4 h-12 flex items-center justify-center leading-tight">WHOLESALE<br/>PARTNER</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">We support dealers, distributors, workshops, and fleet operators with bulk pricing, priority service & long-term plans.</p>
                <div className="w-full border border-red-600/50 bg-transparent text-red-500 text-[10px] md:text-xs font-bold py-2.5 px-2 rounded-lg uppercase tracking-wider group-hover:bg-red-600/10 transition-colors">
                  Wholesale Partner Program
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="pt-16 pb-8 lg:pb-12 bg-[#080b12] relative border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 text-center">
          <h4 className="text-red-600 font-bold text-xs md:text-sm mb-3 uppercase tracking-widest">THAILAND TO SURINAME</h4>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-20 uppercase tracking-tight">
            OUR JOURNEY. YOUR PEACE OF MIND.
          </h2>

          <div className="relative w-full overflow-x-auto pb-8 pt-4 hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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

      {/* REDESIGNED CTA SECTION */}
      <section className="relative bg-[#050505]">
        <div className="w-[96%] max-w-[1800px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0c10]">
          
          {/* Top Image Banner */}
          <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
            <div className="absolute inset-0 z-0">
               <img 
                src="/cta-background.png" 
                alt="Toyota Hilux Ready to Source" 
                className="w-full h-full object-cover object-[70%_center] opacity-60"
              />
              {/* Gradients to fade left text area and bottom for the info bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent"></div>
            </div>
            
            <div className="px-6 lg:px-16 h-full relative z-10 flex flex-col justify-center">
              <div className="max-w-3xl mt-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">
                  READY TO IMPORT, BUILD, OR SOURCE?
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                  Partner with a trusted Toyota Hilux import and parts specialist committed to quality, transparency, and your success.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold h-14 px-8 text-sm uppercase rounded shadow-[0_0_20px_rgba(204,0,0,0.3)] transition-all">
                    <Link href="/contact">
                      CONTACT SALES
                    </Link>
                  </Button>
                  
                  {/* Whatsapp button with the distinct color bar from the design */}
                  <Button asChild size="lg" variant="outline" className="relative overflow-hidden bg-black/40 border-white/20 hover:bg-white/10 text-white font-bold h-14 px-8 text-sm uppercase rounded backdrop-blur-sm group transition-all">
                    <Link href="https://wa.me/5978520700" target="_blank">
                      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-green-400 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                      <span className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-red-600"></span>
                      <MessageCircle className="w-5 h-5 mr-3 text-white hidden group-hover:block transition-all" />
                      WHATSAPP SUPPORT
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dark Features Bar */}
          <div className="bg-[#0a0c10] border-t border-white/5 relative z-20">
            <div className="px-6 lg:px-16 py-6 lg:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-10 h-10 text-[#ff2a2a] drop-shadow-[0_0_10px_rgba(255,42,42,0.6)] shrink-0" strokeWidth={2} />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wide mb-1">SECURE PAYMENTS</h4>
                    <p className="text-gray-300 text-[11px] leading-relaxed">Your payments are safe<br/>and protected.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3">
                  <Truck className="w-10 h-10 text-[#ff2a2a] drop-shadow-[0_0_10px_rgba(255,42,42,0.6)] shrink-0" strokeWidth={2} />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wide mb-1">SAFE SHIPPING</h4>
                    <p className="text-gray-300 text-[11px] leading-relaxed">Global logistics with<br/>full tracking.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-[#ff2a2a] drop-shadow-[0_0_10px_rgba(255,42,42,0.6)] shrink-0" strokeWidth={2} />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wide mb-1">QUALITY GUARANTEE</h4>
                    <p className="text-gray-300 text-[11px] leading-relaxed">100% inspected vehicles<br/>& genuine parts.</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-3">
                  <HeadphonesIcon className="w-10 h-10 text-[#ff2a2a] drop-shadow-[0_0_10px_rgba(255,42,42,0.6)] shrink-0" strokeWidth={2} />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wide mb-1">DEDICATED SUPPORT</h4>
                    <p className="text-gray-300 text-[11px] leading-relaxed">Our team is always<br/>ready to assist.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
