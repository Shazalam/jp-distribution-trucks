"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function WhatWeOfferCarousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationId: number;
    const scrollSpeed = 1;

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      
      {/* Navigation Arrows */}
      <button 
        onClick={handleScrollLeft}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-[80%] z-30 bg-black/80 hover:bg-red-600 border border-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button 
        onClick={handleScrollRight}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-[80%] z-30 bg-black/80 hover:bg-red-600 border border-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Marquee Track */}
      <div 
        ref={scrollRef}
        className="flex gap-6 pb-12 overflow-x-auto scrollbar-hide scroll-smooth w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
        {children} {/* Duplicate for infinite scroll */}
      </div>
    </div>
  );
}
