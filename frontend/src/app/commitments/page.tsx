import { ShieldCheck, Truck, Package, HeartHandshake, Globe, Wrench, Coins, Headphones } from "lucide-react";

export default function CommitmentsPage() {
  const commitments = [
    {
      title: "Quality Inspection Commitment",
      description: "Every truck and part we export undergoes a rigorous multi-point inspection in Thailand before shipping to ensure it meets our strict quality standards for Suriname roads.",
      icon: <ShieldCheck className="w-8 h-8 text-red-500" />
    },
    {
      title: "Genuine Parts Commitment",
      description: "We guarantee the authenticity of all new OEM parts. For used parts, we transparently disclose the condition and source, ensuring you get exactly what you pay for.",
      icon: <Wrench className="w-8 h-8 text-red-500" />
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees. Our quotes include all agreed-upon costs for the vehicle/part, customization, and export logistics. You know exactly what you are paying for upfront.",
      icon: <Coins className="w-8 h-8 text-red-500" />
    },
    {
      title: "Safe Packaging",
      description: "Whether it's a delicate sensor or a full engine block, we use industry-standard packing materials to ensure your parts arrive in pristine condition.",
      icon: <Package className="w-8 h-8 text-red-500" />
    },
    {
      title: "Thailand Sourcing",
      description: "Leveraging our direct partnerships in Thailand, the global hub for Toyota Hilux, we bypass middlemen to bring you the best selection and prices directly.",
      icon: <Globe className="w-8 h-8 text-red-500" />
    },
    {
      title: "Suriname Customer Support",
      description: "With a dedicated presence in Paramaribo, you have local support you can trust. We speak your language and understand the local market needs.",
      icon: <HeartHandshake className="w-8 h-8 text-red-500" />
    },
    {
      title: "Wholesale Partner Commitment",
      description: "We are committed to helping local dealers and businesses grow by providing consistent supply, bulk discounts, and priority container loading.",
      icon: <Package className="w-8 h-8 text-red-500" />
    },
    {
      title: "Shipping & Logistics",
      description: "We handle the complex export/import documentation and coordinate with reliable freight forwarders to ensure timely and safe delivery to your port.",
      icon: <Truck className="w-8 h-8 text-red-500" />
    },
    {
      title: "After-Sales Support",
      description: "Our relationship doesn't end at delivery. We provide ongoing support, maintenance advice, and priority access to replacement parts for our truck customers.",
      icon: <Headphones className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* HEADER */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#111111]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase">
            Our <span className="text-red-600">Commitments</span>
          </h1>
          <p className="text-xl text-gray-300 font-medium mb-4">
            Built on Trust. Driven by Quality. Delivered with Responsibility.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            At JP Distribution, our foundation is built on the promises we make to our customers. We are dedicated to providing the highest level of service in the automotive import and logistics industry.
          </p>
        </div>
      </section>

      {/* COMMITMENTS GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-red-900/30 blur-[120px]"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-red-900/20 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#111111] border border-white/5 rounded-xl p-8 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,4,41,0.05)] hover:-translate-y-1 group"
              >
                <div className="bg-[#1a1a1a] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-red-600/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES BANNER */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">THE JP DISTRIBUTION GUARANTEE</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 text-white mb-3" />
              <span className="text-white font-bold tracking-wide">100% Inspected</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-12 h-12 text-white mb-3" />
              <span className="text-white font-bold tracking-wide">Global Logistics</span>
            </div>
            <div className="flex flex-col items-center">
              <Coins className="w-12 h-12 text-white mb-3" />
              <span className="text-white font-bold tracking-wide">Secure Payments</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
