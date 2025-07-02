import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">
                PLAYPHYSIO<sup className="text-xs">®</sup>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforming respiratory therapy from a dreaded chore to an exciting challenge through smart gamification
              and thoughtful design.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center hover:bg-sky-200 transition-colors"
              >
                <Twitter className="w-4 h-4 text-sky-600" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/benefits" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Clinical Research
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-gray-600 hover:text-cyan-500 transition-colors text-sm">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-gray-600 text-sm">hello@playphysio.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-gray-600 text-sm">1-800-PHYSIO-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-600 text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 Playphysio. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">Clinically validated • FDA approved • HIPAA compliant</p>
        </div>
      </div>
    </footer>
  )
}
