"use client";

import { useState } from "react";
import { Upload, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpecialPartsLocator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* HEADER */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#111111]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 rounded-full px-4 py-1.5 mb-6">
             <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">New Feature</span>
             <span className="text-red-500 font-bold text-xs tracking-wider uppercase">Parts Locator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase">
            Special <span className="text-red-600">Parts Locator</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Can&apos;t find a rare Toyota Hilux part? Our sourcing team in Thailand will find it for you. Submit the details and we&apos;ll get back to you with a quote.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="bg-green-900/20 border border-green-500/50 rounded-xl p-12 text-center">
              <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
              <p className="text-gray-400">
                Our sourcing team is now looking for your part. We will contact you via email or WhatsApp within 24-48 hours with a quote and availability.
              </p>
              <Button 
                className="mt-8 bg-red-600 hover:bg-red-700" 
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <div className="bg-[#111111] border border-white/10 rounded-xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Full Name *</label>
                    <input required type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Email Address *</label>
                    <input required type="email" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">WhatsApp / Phone Number *</label>
                    <input required type="tel" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="+597 8000000" />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Search className="w-5 h-5 text-red-500" /> Vehicle & Part Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">Vehicle Model (e.g., Hilux Vigo) *</label>
                      <input required type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Toyota Hilux Vigo" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">Year *</label>
                      <input required type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="2012" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-300">VIN / Chassis Number</label>
                      <input type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Optional but recommended for exact fit" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-300">Part Name or Description *</label>
                      <textarea required rows={4} className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Describe the part you are looking for in detail..."></textarea>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Reference Image (Optional)</label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                      <Upload className="w-10 h-10 text-gray-500 mx-auto mb-4 group-hover:text-red-500 transition-colors" />
                      <p className="text-sm text-gray-400 mb-2">Drag and drop an image, or click to browse</p>
                      <p className="text-xs text-gray-600">Supports JPG, PNG, WEBP (Max 5MB)</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md transition-all shadow-[0_0_15px_rgba(217,4,41,0.3)] disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting Request..." : "Find My Part"}
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By submitting, you agree to our privacy policy and terms of service.
                  </p>
                </div>

              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
