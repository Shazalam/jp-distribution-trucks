"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppCTA() {
  return (
    <motion.a
      href="https://wa.me/5978520700"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_clicked", { location: "floating_cta" })}
      className="fixed bottom-24 right-6 md:bottom-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#1EBE5D] transition-colors group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={32} className="fill-current" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-black text-sm font-bold py-2 px-4 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
