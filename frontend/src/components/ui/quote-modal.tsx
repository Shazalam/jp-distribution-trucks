"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/submitLead";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequirements?: string;
  initialInquiryType?: string;
}

export function QuoteModal({ isOpen, onClose, initialRequirements = "", initialInquiryType = "truck" }: QuoteModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"contact" | "form">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requirementsText, setRequirementsText] = useState(initialRequirements);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const inquiryType = formData.get("inquiryType") as string;
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const destination = formData.get("destination") as string;

    try {
      await submitLead({
        formType: "General Quote Request",
        sourcePage: "Navbar Quote Modal",
        sourceSection: "Modal Form",
        clickedButton: "Send Request",
        customerName: name,
        email: email,
        phone: phone,
        companyName: company,
        message: `Inquiry Type: ${inquiryType}\nDestination: ${destination}\n\nRequirements: ${requirementsText}`
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit quote:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMounted(true);
      setRequirementsText(initialRequirements);
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialRequirements]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
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
            src="https://res.cloudinary.com/dd8a5dpnh/video/upload/f_auto,q_auto/v1781498582/jp-distribution/custom-builds/hero/custom-hero-bg.mp4" 
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
            <p className="text-gray-300 font-medium leading-relaxed">
              Global export of premium, custom-engineered Toyota vehicles. Built to conquer any terrain, delivered anywhere.
            </p>
          </div>
        </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="w-full lg:w-7/12 h-full flex flex-col bg-[#050505] relative">
            
            {/* Custom Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "form" ? "text-red-500 border-b-2 border-red-500 bg-red-500/5" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
              >
                Request a Quote
              </button>
              <button 
                onClick={() => setActiveTab("contact")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "contact" ? "text-red-500 border-b-2 border-red-500 bg-red-500/5" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
              >
                Contact Us
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
            {activeTab === "contact" ? (
              // CONTACT DETAILS
              <div className="min-h-full flex flex-col justify-center items-center py-8">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-10 text-center">
                  Global Headquarters
                </h3>
                <div className="flex flex-col gap-8 text-base md:text-lg font-medium text-gray-300 w-full max-w-md">
                  <a href="https://maps.google.com/?q=Magentakanaalweg+120,+Paramaribo,+Suriname" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center gap-3 group hover:text-white transition-colors cursor-pointer">
                    <MapPin className="w-8 h-8 text-red-500 shrink-0" />
                    <span>Magentakanaalweg 120,<br/>Paramaribo, Suriname</span>
                  </a>
                  <a href="tel:+5978520700" className="flex flex-col items-center text-center gap-3 group hover:text-white transition-colors cursor-pointer">
                    <Phone className="w-8 h-8 text-red-500 shrink-0" />
                    <span>+597 8520700<br/>+597 8840750</span>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jpdistribution.sr@gmail.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center gap-3 group hover:text-white transition-colors cursor-pointer">
                    <Mail className="w-8 h-8 text-red-500 shrink-0" />
                    <span>jpdistribution.sr@gmail.com</span>
                  </a>
                  <div className="flex flex-col items-center text-center gap-3 group hover:text-white transition-colors">
                    <Clock className="w-8 h-8 text-red-500 shrink-0" />
                    <span>Mon - Fri: 8:00 AM - 5:00 PM<br/>Sat: 8:00 AM - 1:00 PM</span>
                  </div>
                </div>
              </div>
            ) : (
              // FORM
              <div className="min-h-full flex flex-col justify-center">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Request Sent Successfully!</h2>
                    <p className="text-gray-400 mb-8 max-w-sm">One of our specialists will review your request and contact you shortly.</p>
                    <Button className="bg-red-600 hover:bg-red-700 font-bold px-8" onClick={() => setSubmitted(false)}>
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Inquiry Type */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-300">What are you looking for? *</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <label className="cursor-pointer">
                          <input type="radio" name="inquiryType" value="truck" className="peer sr-only" defaultChecked={initialInquiryType === 'truck'} />
                          <div className="text-center p-3 rounded-md border border-white/10 bg-[#111] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                            Truck Import
                          </div>
                        </label>
                        <label className="cursor-pointer">
                          <input type="radio" name="inquiryType" value="build" className="peer sr-only" defaultChecked={initialInquiryType === 'build'} />
                          <div className="text-center p-3 rounded-md border border-white/10 bg-[#111] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                            Custom Build
                          </div>
                        </label>
                        <label className="cursor-pointer">
                          <input type="radio" name="inquiryType" value="parts" className="peer sr-only" defaultChecked={initialInquiryType === 'parts'} />
                          <div className="text-center p-3 rounded-md border border-white/10 bg-[#111] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                            Parts (Retail)
                          </div>
                        </label>
                        <label className="cursor-pointer">
                          <input type="radio" name="inquiryType" value="wholesale" className="peer sr-only" defaultChecked={initialInquiryType === 'wholesale'} />
                          <div className="text-center p-3 rounded-md border border-white/10 bg-[#111] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                            Wholesale
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-300">Full Name *</label>
                        <input name="name" required type="text" className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 text-sm" placeholder="John Doe" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-300">Company Name (Optional)</label>
                        <input name="company" type="text" className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 text-sm" placeholder="JP Trading LLC" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-300">Email Address *</label>
                        <input name="email" required type="email" className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 text-sm" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-300">WhatsApp / Phone Number *</label>
                        <input name="phone" required type="tel" className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 text-sm" placeholder="+597 8000000" />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-sm font-bold text-gray-300">Destination Country / Port *</label>
                        <input name="destination" required type="text" className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 text-sm" placeholder="Paramaribo, Suriname" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-300">Detailed Requirements *</label>
                      <textarea name="requirements" required rows={4} value={requirementsText} onChange={(e) => setRequirementsText(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 resize-none text-sm" placeholder="Please describe exactly what you are looking for (e.g., Toyota Hilux Revo 2021, White, Automatic, Full Lift Kit...)"></textarea>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md transition-all shadow-[0_0_20px_rgba(217,4,41,0.4)] disabled:opacity-70 group mt-4"
                    >
                      {isSubmitting ? "Sending..." : "Send Request"}
                      {!isSubmitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>,
  document.body
  );
}

