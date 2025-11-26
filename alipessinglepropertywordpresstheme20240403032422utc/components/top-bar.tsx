import { Facebook, Twitter, Instagram } from "lucide-react"
import { FaPinterestP } from "react-icons/fa"

export default function TopBar() {
  return (
    <div className="bg-[#1a1410] border-b border-[#2a2420] py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-[#c89968] transition-colors">
              <Facebook size={14} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#c89968] transition-colors">
              <Twitter size={14} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#c89968] transition-colors">
              <FaPinterestP size={14} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#c89968] transition-colors">
              <Instagram size={14} />
            </a>
          </div>

          {/* Hours */}
          <div className="text-gray-400 text-xs">Mon to Sat: 8.00 am - 7.00 pm</div>

          {/* Contact Info */}
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <span>📍</span>
              <span>30 Commercial Road Fratton, Australia</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>✉️</span>
              <span>needhelp@company.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
