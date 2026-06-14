"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/submitLead";

export default function GetQuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    const requirements = formData.get("requirements") as string;

    try {
      await submitLead({
        formType: "General Quote Request",
        sourcePage: "Get Quote Page",
        sourceSection: "Main Form",
        clickedButton: "Send Request",
        customerName: name,
        email: email,
        phone: phone,
        companyName: company,
        message: `Inquiry Type: ${inquiryType}\nDestination: ${destination}\n\nRequirements: ${requirements}`
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit quote:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* HEADER */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#111111] to-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase">
            Get A <span className="text-red-600">Quote</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ready to import a truck or order parts? Fill out the form below with your requirements, and our team will provide you with a comprehensive quote including shipping to your location.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          {submitted ? (
             <div className="bg-[#111111] border border-green-500/30 rounded-xl p-12 text-center shadow-[0_0_30px_rgba(34,197,94,0.1)]">
               <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-10 h-10 text-green-500" />
               </div>
               <h2 className="text-2xl font-bold text-white mb-4">Quote Request Sent Successfully!</h2>
               <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                 Thank you for reaching out to JP Distribution. One of our specialists will review your request and contact you within 24 hours.
               </p>
               <Button 
                 className="bg-red-600 hover:bg-red-700 h-12 px-8 font-bold" 
                 onClick={() => setSubmitted(false)}
               >
                 Submit Another Request
               </Button>
             </div>
          ) : (
            <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Inquiry Type */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-300">What are you looking for? *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="cursor-pointer">
                      <input type="radio" name="inquiryType" value="truck" className="peer sr-only" defaultChecked />
                      <div className="text-center p-3 rounded-md border border-white/10 bg-[#050505] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                        Truck Import
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="inquiryType" value="build" className="peer sr-only" />
                      <div className="text-center p-3 rounded-md border border-white/10 bg-[#050505] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                        Custom Build
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="inquiryType" value="parts" className="peer sr-only" />
                      <div className="text-center p-3 rounded-md border border-white/10 bg-[#050505] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                        Parts (Retail)
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="inquiryType" value="wholesale" className="peer sr-only" />
                      <div className="text-center p-3 rounded-md border border-white/10 bg-[#050505] text-gray-400 peer-checked:border-red-500 peer-checked:bg-red-500/10 peer-checked:text-white transition-all text-sm font-semibold">
                        Wholesale
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Personal Info */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Full Name *</label>
                    <input name="name" required type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Company Name (Optional)</label>
                    <input name="company" type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="JP Trading LLC" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Email Address *</label>
                    <input name="email" required type="email" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">WhatsApp / Phone Number *</label>
                    <input name="phone" required type="tel" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="+597 8000000" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-300">Destination Country / Port *</label>
                    <input name="destination" required type="text" className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Paramaribo, Suriname" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-gray-300">Detailed Requirements *</label>
                  <textarea name="requirements" required rows={5} className="w-full bg-[#050505] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none" placeholder="Please describe exactly what you are looking for (e.g., Toyota Hilux Revo 2021, White, Automatic, Full Lift Kit...)"></textarea>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md transition-all shadow-[0_0_15px_rgba(217,4,41,0.3)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] disabled:opacity-70 group"
                  >
                    {isSubmitting ? "Sending..." : "Send Request"}
                    {!isSubmitting && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </div>

              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
