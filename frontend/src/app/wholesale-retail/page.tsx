import { Button } from "@/components/ui/button";
import { Settings, ShieldCheck, Ship, Box, ArrowRight, Search, ClipboardCheck, Package, FileText, Globe } from "lucide-react";

export default function WholesaleRetailPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* 1. HERO & DUAL-TRACK ADVANTAGE */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        {/* Background Image Container - Only takes up the top part */}
        <div className="absolute top-0 left-0 right-0 h-[450px] md:h-[500px] z-0 overflow-hidden">
          <img 
            src="/wholesale_parts.png" 
            alt="Wholesale Warehouse" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-16 text-center mt-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-none drop-shadow-2xl">
            Wholesale & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Retail.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-16 font-medium leading-relaxed drop-shadow-md">
            Whether you are outfitting a single expedition vehicle or supplying a global dealer network, our dual-track logistics infrastructure scales to meet your exact demand.
          </p>
        </div>

        <div className="relative z-20 max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Enterprise Wholesale */}
            <div className="bg-[#111] border border-white/10 rounded-3xl p-10 hover:border-red-600/30 transition-colors relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-red-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-4 mb-6">
                <Ship className="w-12 h-12 text-red-600 shrink-0" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Enterprise Wholesale</h2>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Designed for global dealerships, fleet operators, and large-scale distributors. We handle container consolidation, massive bulk orders, and complex supply chains directly from Thailand.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Tiered Volume Discount Pricing",
                  "20ft & 40ft Container Consolidation",
                  "Dedicated B2B Account Management",
                  "Priority Factory Sourcing Allocation",
                  "Custom Fleet Replenishment Programs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-red-600 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest h-12 rounded-sm transition-all shadow-[0_0_20px_rgba(217,4,41,0.3)] hover:shadow-[0_0_30px_rgba(217,4,41,0.5)]">
                Apply for Dealer Account
              </Button>
            </div>

            {/* Enthusiast Retail */}
            <div className="bg-[#111] border border-white/10 rounded-3xl p-10 hover:border-red-600/30 transition-colors relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-red-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-4 mb-6">
                <Box className="w-12 h-12 text-white shrink-0" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Enthusiast Retail</h2>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Built for the individual builder, off-road enthusiast, and specialized shop. Get access to rare, high-quality components with fast global shipping for single items.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "No Minimum Order Quantities",
                  "Access to Rare JDM & THDM Imports",
                  "Fast Global Air Freight Shipping",
                  "1-on-1 Build Consultations",
                  "Guaranteed Authentic OEM & Aftermarket"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-300">
                    <Settings className="w-4 h-4 text-white mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full bg-transparent border-white/20 hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest h-12 rounded-sm transition-all">
                Shop Retail Parts
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LOGISTICS WORKFLOW */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Global <span className="text-red-600">Distribution</span>
            </h2>
          </div>

          <div className="relative w-full overflow-x-auto pb-8 pt-4 hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* The Connecting Line */}
            <div className="absolute top-[56px] left-[8%] w-[84%] h-[2px] bg-red-600/10 z-0 hidden lg:block overflow-hidden rounded-full">
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
            
            <div className="flex flex-nowrap lg:grid lg:grid-cols-6 gap-6 min-w-max lg:min-w-0 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">01</div>
                <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">SOURCING</h4>
                <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Priority allocations directly from trusted suppliers and factories.</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">02</div>
                <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">QUALITY CONTROL</h4>
                <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Rigorous inspections ensuring authenticity and condition.</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">03</div>
                <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">PACKAGING</h4>
                <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Secure crating and container consolidation for max protection.</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">04</div>
                <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">EXPORT CLEARANCE</h4>
                <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Seamless handling of all export documentation and duties.</p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <Ship className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">05</div>
                <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">GLOBAL TRANSIT</h4>
                <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Insured ocean and air freight routing worldwide.</p>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col items-center w-[160px] lg:w-auto shrink-0 relative group">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-[#050505] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <Box className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-500 font-bold text-sm mb-1 tracking-wider">06</div>
                <h4 className="text-white font-bold text-[13px] md:text-sm uppercase mb-3 text-center">FINAL DELIVERY</h4>
                <p className="text-gray-400 text-xs text-center leading-relaxed px-2">Direct to your facility, fully tracked and accounted for.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="pt-16 pb-32 relative bg-[#111] border-t border-red-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-xl">
            Ready to <span className="text-red-600">Partner With Us?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-medium">
            Contact our wholesale department today to set up your enterprise account and unlock exclusive pricing tiers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 h-14 font-bold tracking-widest uppercase rounded-sm shadow-[0_0_30px_rgba(217,4,41,0.4)] transition-all">
              Contact Wholesale Team <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
