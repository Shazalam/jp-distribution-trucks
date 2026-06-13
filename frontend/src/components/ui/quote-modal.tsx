"use client";

import { X, MapPin, Phone, Mail, Clock } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-7xl h-[90vh] md:h-[80vh] animate-in zoom-in-95 duration-300">
        
        {/* Close Button (Half inside, half outside Top-Right) */}
        <button 
          onClick={onClose}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-[110] p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-[0_0_20px_rgba(217,4,41,0.5)] border-4 border-[#111] hover:scale-110"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="bg-[#111] w-full h-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(217,4,41,0.2)] flex flex-col lg:flex-row relative border border-white/10">

          {/* LEFT SIDE: VIDEO */}
        <div className="hidden lg:block lg:w-5/12 relative h-full bg-black border-r border-white/10">
          <video 
            src="/custom_hero_bg_vid.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/20"></div>
          
          <div className="absolute bottom-12 left-10 right-10">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg">
              Drive Your <br/><span className="text-red-600">Ambition.</span>
            </h2>
            <p className="text-gray-300 font-medium">
              Join thousands of satisfied clients across Suriname and the globe who trust JP Distribution for their Toyota Hilux needs.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT & FORM */}
        <div className="w-full lg:w-7/12 h-full flex flex-col bg-[#050505] p-8 lg:p-16 justify-center">
          
          <div className="mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Get Your <span className="text-red-600">Quote</span>
            </h3>
            <p className="text-gray-400 text-lg md:text-xl">Contact us directly via WhatsApp, Phone, or Email for an immediate consultation and personalized quote.</p>
          </div>

          <div className="flex flex-col gap-10 text-base md:text-xl font-medium text-gray-300">
            <a href="https://maps.google.com/?q=Magentakanaalweg+120,+Paramaribo,+Suriname" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group hover:text-white transition-colors cursor-pointer">
              <MapPin className="w-8 h-8 text-red-500 shrink-0 mt-1" />
              <span>Magentakanaalweg 120,<br/>Paramaribo, Suriname</span>
            </a>
            <a href="tel:+5978520700" className="flex items-start gap-6 group hover:text-white transition-colors cursor-pointer">
              <Phone className="w-8 h-8 text-red-500 shrink-0 mt-1" />
              <span>+597 8520700<br/>+597 8840750</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jpdistribution.sr@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group hover:text-white transition-colors cursor-pointer">
              <Mail className="w-8 h-8 text-red-500 shrink-0 mt-1" />
              <span>jpdistribution.sr@gmail.com</span>
            </a>
            <div className="flex items-start gap-6 group hover:text-white transition-colors">
              <Clock className="w-8 h-8 text-red-500 shrink-0 mt-1" />
              <span>Mon - Fri: 8:00 AM - 5:00 PM<br/>Sat: 8:00 AM - 1:00 PM</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
  );
}
