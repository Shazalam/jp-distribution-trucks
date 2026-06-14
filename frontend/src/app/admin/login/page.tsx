"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      router.push("/admin/requests");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Secure Lead Management CRM
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold px-4 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="admin@jp-distribution.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl h-14 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] mt-4"
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

        </div>
        
        <div className="text-center mt-8 text-xs text-gray-600 uppercase tracking-widest font-bold">
          &copy; {new Date().getFullYear()} JP Distribution. All rights reserved.
        </div>
      </div>
    </div>
  );
}
