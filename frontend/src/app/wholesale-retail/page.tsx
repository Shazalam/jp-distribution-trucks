"use client";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, ShieldCheck, Ship, Box, ArrowRight, Search, ClipboardCheck, Package, FileText, Globe, X, CheckCircle2, MessageCircle } from "lucide-react";
import { submitLead } from "@/lib/submitLead";

export default function WholesaleRetailPage() {
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    message: ""
  });

  const handleDealerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      return alert("Please fill in all required fields.");
    }
    setIsSubmitting(true);
    try {
      await submitLead({
        formType: "Dealer Account Application",
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.company,
        country: formData.country,
        message: formData.message,
        sourcePage: "Wholesale & Retail"
      });
      setSubmitSuccess(true);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-[80vh] bg-[#050505] text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* 1. HERO & DUAL-TRACK ADVANTAGE */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        {/* Background Image Container - Only takes up the top part */}
        <div className="absolute top-0 left-0 right-0 h-[450px] md:h-[500px] z-0 overflow-hidden">
          <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="/images/wholesale-retail/cards/wholesale-parts.png" 
            alt="Wholesale Warehouse" 
            className="object-cover opacity-30"
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
              <Button onClick={() => setIsDealerModalOpen(true)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest h-12 rounded-sm transition-all shadow-[0_0_20px_rgba(217,4,41,0.3)] hover:shadow-[0_0_30px_rgba(217,4,41,0.5)]">
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
              <Link href="/parts-supply" className="w-full block">
                <Button variant="outline" className="w-full bg-transparent border-white/20 hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest h-12 rounded-sm transition-all">
                  Shop Retail Parts
                </Button>
              </Link>
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
                  READY TO PARTNER WITH US?
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                  Contact our wholesale department today to set up your enterprise account and unlock exclusive pricing tiers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => setIsDealerModalOpen(true)} className="w-full sm:w-auto bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold h-14 px-8 text-sm uppercase rounded shadow-[0_0_20px_rgba(204,0,0,0.3)] transition-all">
                    CONTACT WHOLESALE TEAM
                  </Button>
                  
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

      {/* Dealer Account Modal */}
      {isDealerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl relative overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111]">
              <div className="flex items-center gap-3">
                <div className="bg-red-600/20 p-2 rounded-lg border border-red-500/30">
                  <Ship className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-lg leading-tight">Dealer Application</h3>
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Enterprise Wholesale Program</p>
                </div>
              </div>
              <button onClick={() => setIsDealerModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {submitSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center text-center relative">
                  {/* Glowing background effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-50"></div>
                    <div className="relative w-20 h-20 bg-[#0a0a0a] border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] rounded-full flex items-center justify-center mb-8 z-10">
                      <CheckCircle2 className="w-10 h-10 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 tracking-tighter drop-shadow-lg">
                    Application Received
                  </h3>
                  
                  <p className="text-gray-400 max-w-md mx-auto mb-10 text-sm leading-relaxed font-medium">
                    Your dealer application has been securely routed to our Enterprise Wholesale division. A dedicated account manager will be in touch within 24 hours.
                  </p>
                  
                  <Button 
                    onClick={() => { setIsDealerModalOpen(false); setSubmitSuccess(false); }} 
                    className="bg-transparent border border-white/20 hover:bg-white hover:text-black text-white uppercase tracking-widest font-bold px-10 h-12 transition-all duration-300"
                  >
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleDealerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Contact Name *</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Company Name *</label>
                      <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Dealership LLC" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Business Email *</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="sales@dealership.com" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Phone Number *</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="+1 555 000 0000" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Country / Region</label>
                      <input type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="United States" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Expected Volume &amp; Requirements</label>
                      <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-red-500 transition-colors h-24 resize-none" placeholder="Tell us about your dealership and expected order volume..."></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <Button type="button" onClick={() => setIsDealerModalOpen(false)} variant="outline" className="border-white/20 hover:bg-white/10 text-white uppercase tracking-widest font-bold">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white uppercase tracking-widest font-bold px-8 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

