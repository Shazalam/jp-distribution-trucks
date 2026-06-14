"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';

const QuoteModal = dynamic(() => import("@/components/ui/quote-modal").then(mod => mod.QuoteModal), { ssr: false });

interface CtaQuoteButtonProps {
  text?: string;
  initialInquiryType?: "truck" | "build" | "parts" | "wholesale" | "fleet";
}

export function CtaQuoteButton({ text = "REQUEST A QUOTE", initialInquiryType = "truck" }: CtaQuoteButtonProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <Button 
        size="lg" 
        onClick={() => setIsQuoteModalOpen(true)}
        className="w-full sm:w-auto bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold h-14 px-8 text-sm uppercase rounded shadow-[0_0_20px_rgba(204,0,0,0.3)] transition-all"
      >
        {text}
      </Button>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialInquiryType={initialInquiryType}
      />
    </>
  );
}
