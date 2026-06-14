"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function ThankYouPage() {
  useEffect(() => {
    // Fire pageview or conversion event on load
    trackEvent("thank_you_page_viewed");
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#111] border border-white/10 rounded-3xl p-8 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Request Received</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Thank you for reaching out to JP Distribution Trucks. Your inquiry has been submitted successfully. A member of our enterprise procurement team will contact you shortly.
        </p>

        <Link href="/">
          <button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-colors flex items-center justify-center gap-2 group">
            Return to Homepage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
