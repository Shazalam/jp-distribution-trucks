"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, Truck, Zap, Target, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CtaQuoteButton } from "@/components/ui/cta-quote-button";

export default function AboutPage() {
  const stats = [
    { label: "Vehicles Exported", value: "10,000+" },
    { label: "Countries Served", value: "50+" },
    { label: "Years Experience", value: "15+" },
    { label: "Global Partners", value: "200+" }
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
      title: "Uncompromising Quality",
      desc: "Every vehicle and part undergoes rigorous inspection before export. We do not compromise on the reliability of the Toyota name."
    },
    {
      icon: <Globe className="w-8 h-8 text-red-500" />,
      title: "Global Network",
      desc: "Leveraging direct connections in Japan, Thailand, and globally to secure the exact inventory our clients require."
    },
    {
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: "Rapid Execution",
      desc: "Time is money. Our streamlined logistics pipeline ensures swift procurement and shipping to your destination port."
    },
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: "Purpose-Built Solutions",
      desc: "We don't just sell trucks; we engineer mobility ecosystems for mining, agriculture, and tactical operations."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority src="https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg" 
            alt="Toyota Hilux Fleet" 
            className="object-cover opacity-30 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/60 to-[#050505]"></div>
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-500 font-bold text-xs tracking-[0.2em] uppercase">Who We Are</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
              Powering Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Mobility.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-2xl border-l-4 border-red-600 pl-6">
              JP Distribution is the premier exporter of Toyota commercial vehicles and specialized parts, bridging the gap between unmatched Japanese engineering and global industrial demands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative -mt-12 z-20 max-w-[1800px] mx-auto px-6 lg:px-16 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight group-hover:text-red-500 transition-colors duration-300">{stat.value}</h3>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498071/jp-distribution/trucks/cards/black-edition.png" alt="Our Operations" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-red-600/90 backdrop-blur-md inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4">
                    <Globe className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Global Headquarters</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
                  The <span className="text-red-600">Heritage</span> of Excellence
                </h2>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>
                    Founded on the principles of reliability and relentless performance, JP Distribution started with a simple mission: to make the world's most durable commercial vehicles accessible to the industries that need them most.
                  </p>
                  <p>
                    Today, we stand as a vital link in the global supply chain. From the rugged terrains of South America to the demanding mining operations in Africa, our vehicles are the backbone of countless enterprises.
                  </p>
                  <p>
                    We don't just export vehicles; we deliver certainty. Our deep-rooted relationships with manufacturers in Thailand and Japan allow us to secure priority allocations, custom build slots, and rare parts that others simply cannot access.
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                      <Award className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">ISO 9001:2015</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Certified Exporter</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                      <Users className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">24/7 Support</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Dedicated Managers</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              The JP <span className="text-red-600">Difference</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Our operational philosophy is built on four core pillars that ensure our clients receive unparalleled service and equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#111] border border-white/5 p-8 rounded-2xl hover:bg-[#151515] hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className="bg-[#1a1a1a] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-[#050505]">
        <div className="w-[96%] max-w-[1800px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0c10]">
          <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
            <div className="absolute inset-0 z-0">
               <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" src="https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498067/jp-distribution/shared/backgrounds/cta-background.png" 
                alt="Toyota Hilux Ready to Source" 
                className="object-cover object-[70%_center] opacity-60"
              />
              {/* Gradients to fade left text area and bottom for the info bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent"></div>
            </div>
            
            <div className="px-6 lg:px-16 h-full relative z-10 flex flex-col justify-center">
              <div className="max-w-3xl mt-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">
                  READY TO UPGRADE YOUR <span className="text-red-600">FLEET?</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                  Contact our enterprise procurement team today to discuss your specific vehicle requirements, custom build options, and wholesale logistics.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <CtaQuoteButton text="REQUEST A QUOTE" initialInquiryType="fleet" />
                  
                  {/* Dealer Application button with the distinct color bar from the design */}
                  <Link href="/wholesale-retail" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full relative overflow-hidden bg-black/40 border-white/20 hover:bg-white/10 text-white font-bold h-14 px-8 text-sm uppercase rounded backdrop-blur-sm group transition-all">
                      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-green-400 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                      <span className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-red-600"></span>
                      DEALER APPLICATION
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

