"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate Auth
    setTimeout(() => {
      if (email === "admin@jpdistribution.sr" && password === "admin123") {
        // Set fake token
        localStorage.setItem("admin_token", "dummy_token");
        router.push("/admin");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
      <div className="max-w-md w-full bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700"></div>

        <div className="text-center mb-8">
          <div className="bg-red-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white uppercase">Admin Portal</h1>
          <p className="text-sm text-gray-400 mt-2">Sign in to manage inventory and quotes</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 text-sm p-3 rounded-md mb-6 flex items-start gap-2">
            <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors" 
                placeholder="admin@jpdistribution.sr" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-300">Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all disabled:opacity-70"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setEmail("admin@jpdistribution.sr");
                setPassword("admin123");
              }}
              className="w-full border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              Autofill Testing Credentials
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-600 mt-8">
          &copy; {new Date().getFullYear()} JP Distribution. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
