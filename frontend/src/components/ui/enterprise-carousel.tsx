"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";

const CARDS = [
  {
    id: 1,
    image: "/images/trucks/cards/truck-1.png",
    badge: "ADVENTURE",
    badgeColor: "bg-emerald-600",
    title: "HILUX REVO ADVENTURE",
    subtitle: "2.8L Diesel • 4x4 • Automatic",
    price: "$42,800",
    priceLabel: "STARTING FROM",
    href: "/custom-builds?category=Adventure Builds"
  },
  {
    id: 2,
    image: "/images/trucks/cards/truck-2.png",
    badge: "EXPEDITION",
    badgeColor: "bg-teal-700",
    title: "HILUX TRAVO EXPEDITION",
    subtitle: "2.8L Diesel • 4x4 • Manual",
    price: "$48,500",
    priceLabel: "STARTING FROM",
    href: "/custom-builds?category=Expedition Builds"
  },
  {
    id: 3,
    image: "/images/trucks/cards/truck-3.png",
    badge: "OVERLAND",
    badgeColor: "bg-red-700",
    title: "HILUX VIGO OVERLAND",
    subtitle: "2.5L Diesel • 4x4 • Manual",
    price: "$36,900",
    priceLabel: "STARTING FROM",
    href: "/custom-builds?category=Overland Builds"
  },
  {
    id: 4,
    image: "/images/trucks/cards/truck-4.png",
    badge: "CLASSIC",
    badgeColor: "bg-emerald-800",
    title: "HILUX TIGER CLASSIC",
    subtitle: "2.4L Diesel • 4x2 • Manual",
    price: "$24,800",
    priceLabel: "STARTING FROM",
    href: "/custom-builds?category=Classic Builds"
  },
  {
    id: 5,
    image: "/images/trucks/cards/black-edition.png",
    badge: "LUXURY",
    badgeColor: "bg-blue-600",
    title: "HILUX BLACK EDITION",
    subtitle: "Premium roadside coverage for luxury transportation.",
    price: "ENTERPRISE",
    priceLabel: "CUSTOM PLAN",
    href: "/custom-builds?category=Security %26 Patrol Builds"
  },
  {
    id: 6,
    image: "/images/custom-builds/cards/desert-runner.png",
    badge: "EXTREME",
    badgeColor: "bg-amber-600",
    title: "HILUX DESERT RUNNER",
    subtitle: "Built for remote recovery & off-road operations.",
    price: "FLEET",
    priceLabel: "CUSTOM PLAN",
    href: "/custom-builds?category=Extreme Builds"
  },
  {
    id: 7,
    image: "/images/trucks/cards/fleet-edition.png",
    badge: "COMMERCIAL",
    badgeColor: "bg-emerald-600",
    title: "HILUX FLEET EDITION",
    subtitle: "Enterprise fleet continuity & dispatch coordination.",
    price: "COMMERCIAL",
    priceLabel: "CUSTOM PLAN",
    href: "/custom-builds?category=Fleet Customization"
  },
  {
    id: 8,
    image: "/images/trucks/cards/nomad-edition.png",
    badge: "CAMPER",
    badgeColor: "bg-purple-600",
    title: "HILUX NOMAD EDITION",
    subtitle: "Roadside continuity for RV operators & campers.",
    price: "NOMAD",
    priceLabel: "CUSTOM PLAN",
    href: "/custom-builds?category=Overland Builds"
  }
];

export function EnterpriseCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scrollSpeed = 1.0; 
    
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
    <div className="w-full relative py-4 group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      
      {/* Navigation Arrows */}
      <button 
        onClick={handleScrollLeft}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-red-600 border border-white/20 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={handleScrollRight}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-red-600 border border-white/20 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 w-full overflow-x-auto hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {/* Render 2 identical sets for seamless loop */}
        {[...Array(2)].map((_, setIdx) => (
          <div key={setIdx} className="flex gap-6 shrink-0 pr-6">
            
            {CARDS.map((card) => (
              <Link 
                href={card.href}
                key={card.id} 
                className="w-[300px] h-[400px] md:w-[360px] md:h-[480px] rounded-xl overflow-hidden group/card border border-white/10 hover:border-red-500/50 transition-all duration-500 relative flex flex-col cursor-pointer shrink-0"
              >
                {/* Background Image */}
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 opacity-90 group-hover/card:opacity-100" 
                />
                
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`${card.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider`}>
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative mt-auto p-6 md:p-8 flex flex-col z-10 w-full">
                  <h3 className="text-white font-serif font-bold text-xl md:text-2xl uppercase mb-1 tracking-wide leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm font-medium mb-6 line-clamp-2">
                    {card.subtitle}
                  </p>
                  
                  <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col">
                      <div className="text-white font-bold text-xl md:text-2xl">{card.price}</div>
                      <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-0.5">{card.priceLabel}</div>
                    </div>
                    <div className="text-red-500 hover:text-red-400 font-bold text-[11px] md:text-xs uppercase flex items-center transition-colors shrink-0">
                      EXPLORE DETAILS <ChevronRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}

