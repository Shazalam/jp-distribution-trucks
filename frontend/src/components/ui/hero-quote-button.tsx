"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/ui/quote-modal";

export function HeroQuoteButton() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <Button 
        size="lg" 
        variant="outline" 
        onClick={() => setIsQuoteModalOpen(true)}
        className="w-full border-white/20 bg-black/30 backdrop-blur-md hover:bg-white/10 text-white font-bold h-14 px-8 text-sm transition-all duration-300 hover:scale-105 uppercase tracking-wide rounded shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        REQUEST A QUOTE
      </Button>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
