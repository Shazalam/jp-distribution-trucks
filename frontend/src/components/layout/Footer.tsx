import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-10 pb-6">
      <div className="w-[96%] max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold tracking-tighter text-white italic">
                  JP
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-tight tracking-wide text-white">
                    DISTRIBUTION
                  </span>
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                    Import &bull; Export &bull; Logistics
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-lg leading-snug mb-4">
              Your trusted partner for Toyota Hilux imports, custom overland builds, genuine parts, and global logistics.
            </p>
            <div className="flex space-x-4">
              {/* <img src="/flags/thailand.svg" alt="Thailand" className="w-8 h-6 object-cover rounded-sm border border-white/20" />
              <img src="/flags/suriname.svg" alt="Suriname" className="w-8 h-6 object-cover rounded-sm border border-white/20" /> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4 tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/trucks" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Truck Imports</Link>
              </li>
              <li>
                <Link href="/custom-builds" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Custom Builds</Link>
              </li>
              <li>
                <Link href="/parts-supply" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Parts & Supply</Link>
              </li>
              <li>
                <Link href="/special-parts-locator" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Special Parts Locator</Link>
              </li>
              <li>
                <Link href="/wholesale-retail" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Wholesale & Retail</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4 tracking-wider">COMPANY</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-500 text-lg transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/commitments" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Our Commitments</Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-red-500 text-lg transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4 tracking-wider">CONTACT US</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-lg">
                <MapPin className="text-red-500 shrink-0 w-6 h-6 mt-0.5" />
                <span className="leading-snug">Magentakanaalweg 120,<br />Paramaribo, Suriname</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-lg">
                <Phone className="text-red-500 shrink-0 w-6 h-6" />
                <span>+597 8520700 / +597 8840750</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-lg">
                <Mail className="text-red-500 shrink-0 w-6 h-6" />
                <span>jpdistribution.sr@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} JP Distribution. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
