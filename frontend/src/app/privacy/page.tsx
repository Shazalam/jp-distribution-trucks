export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-[104px] pb-24 text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 mt-12">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-gray-400 font-medium">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="prose prose-invert prose-red max-w-none">
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            At JP Distribution, we respect your privacy and are committed to protecting the personal data you share with us. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our services, 
            website, and enterprise procurement team.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">1. Information We Collect</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
            When you request a quote, submit a dealer application, or contact our team, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
            <li><strong>Contact Details:</strong> Name, email address, phone number, and physical address or port of destination.</li>
            <li><strong>Business Information:</strong> Company name, registration details, fleet size, and intended vehicle usage.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and basic analytics data regarding your use of our platform.</li>
          </ul>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">2. How We Use Your Information</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
            We use your data solely to provide and improve our logistics and export services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
            <li>To process your custom build requests and vehicle orders.</li>
            <li>To communicate shipping logistics, supply chain updates, and order status.</li>
            <li>To verify dealer applications and wholesale accounts.</li>
            <li>To improve our website performance and user experience.</li>
          </ul>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">3. Data Sharing & Security</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            JP Distribution does not sell your personal data. We only share necessary information with trusted third-party logistics 
            providers, shipping lines, and customs brokers strictly for the purpose of delivering your vehicles. We implement 
            industry-standard security measures to protect your data from unauthorized access or disclosure.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">4. Your Rights</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Depending on your jurisdiction, you may have the right to access, update, or delete your personal data. If you wish to 
            exercise any of these rights, please contact our administrative team.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-wide text-white mt-12 mb-6">5. Contact Us</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at: <br />
            <a href="mailto:jpdistribution.sr@gmail.com" className="text-red-500 hover:text-red-400 transition-colors">jpdistribution.sr@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
