"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global React Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center bg-[#050505] text-white px-4">
      <div className="bg-[#111] border border-red-500/20 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
        <div className="mx-auto w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
          System Error
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          An unexpected error occurred while loading this section. Our team has been notified.
        </p>
        <Button 
          onClick={() => reset()}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    </div>
  );
}
