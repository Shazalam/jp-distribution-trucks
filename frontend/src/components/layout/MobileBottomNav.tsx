"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Truck, Wrench, Package, Search, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Trucks", href: "/trucks", icon: Truck },
  { name: "Customs", href: "/custom-builds", icon: Wrench },
  { name: "Parts", href: "/parts-supply", icon: Package },
  { name: "Locator", href: "/special-parts-locator", icon: Search },
  { name: "Wholesale", href: "/wholesale-retail", icon: Building2 },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // If path starts with admin, do not render mobile bottom nav
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/10 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:hidden transition-all duration-300"
      aria-label="Mobile Navigation Bar"
    >
      <div 
        className="w-full max-w-[600px] mx-auto flex justify-around items-center px-1"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)",
          paddingTop: "8px",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/" 
            ? pathname === "/" 
            : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 py-1 min-h-[48px] min-w-[48px] transition-all duration-200 active:scale-95 select-none relative group"
              aria-label={item.name}
            >
              {/* Active Indicator Line */}
              <span className={cn(
                "absolute top-0 w-8 h-1 bg-red-600 rounded-full transition-all duration-300 transform scale-x-0 origin-center",
                isActive && "scale-x-100"
              )} />

              <div className="relative flex items-center justify-center">
                <Icon 
                  size={22} 
                  className={cn(
                    "transition-all duration-200 ease-in-out",
                    isActive 
                      ? "text-red-600 dark:text-red-500 scale-110" 
                      : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
                  )} 
                />
              </div>
              
              <span className={cn(
                "text-[9px] min-[360px]:text-[10px] min-[400px]:text-[10.5px] font-bold tracking-wide transition-all duration-200 mt-1 uppercase text-center truncate w-full px-0.5",
                isActive 
                  ? "text-red-600 dark:text-red-500" 
                  : "text-neutral-500 dark:text-neutral-400"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
