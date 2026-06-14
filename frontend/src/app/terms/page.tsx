export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-[104px] pb-24 text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 mt-12">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="text-gray-400 font-medium">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="prose prose-invert prose-red max-w-none">
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Welcome to JP Distribution. These Terms of Service govern your use of our website and our vehicle procurement, 
            custom building, and global logistics services. By accessing our platform or engaging our services, you agree 
            to be bound by these terms.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">1. Services Provided</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            JP Distribution specializes in the global export of Toyota commercial vehicles, overland custom builds, and the 
            supply of genuine Toyota parts. All vehicle specifications, lead times, and shipping schedules are subject to 
            manufacturer availability and international logistics constraints.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">2. Quotes & Ordering</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
            Quotes provided through our online platform or directly by our procurement team are valid for the period specified 
            on the quote. Due to global supply chain volatility, prices and availability may change. An order is only confirmed 
            upon the receipt of the agreed deposit or full payment as outlined in your specific contract.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">3. Custom Builds</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            For custom overland or tactical builds, specifications must be finalized and signed off prior to the commencement 
            of engineering. Once a custom build has entered the fabrication phase, modifications to the order may incur 
            additional fees and extend delivery timelines.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">4. Shipping & Logistics</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We operate on standard international Incoterms (typically CIF or FOB, depending on your agreement). JP Distribution 
            is not liable for delays caused by customs clearance, port strikes, extreme weather, or other Force Majeure events. 
            The buyer is responsible for ensuring the vehicle meets all local import regulations in the destination country.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">5. Warranty & Liability</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            New vehicles carry the standard manufacturer warranty applicable in the export region. Custom parts and modifications 
            provided by JP Distribution are covered under our specific build warranty, detailed in your purchase agreement. 
            JP Distribution's liability is strictly limited to the value of the goods provided.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">6. Contact Information</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            For any legal notices or questions regarding these Terms of Service, please contact our administrative team at: <br />
            <a href="mailto:jpdistribution.sr@gmail.com" className="text-red-500 hover:text-red-400 transition-colors">jpdistribution.sr@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
