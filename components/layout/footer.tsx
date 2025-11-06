import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site.config"
import { formatPhone } from "@/lib/utils/currency"

const navigation = [
  { name: "Imóveis", href: "/imoveis" },
  { name: "A Imobiliária", href: "/a-imobiliaria" },
  { name: "Lançamentos", href: "/lancamentos" },
  { name: "Condomínios", href: "/condominios" },
  { name: "Contato", href: "/contato" },
]

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(200,153,104,0.14) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            animation: "wave 24s linear infinite",
            willChange: "transform"
          }}
        />
        <div
          className="absolute -left-56 bottom-[-140px] w-[580px] h-[580px] rounded-full bg-[#c89968]/18 blur-[140px]"
          style={{ animation: "footer-orbit-left 32s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-160px] bottom-[-120px] w-[520px] h-[520px] rounded-full bg-[#c89968]/14 blur-[140px]"
          style={{ animation: "footer-orbit-right 28s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-x-[-15%] bottom-0 h-48 bg-gradient-to-t from-[#c89968]/20 via-[#c89968]/8 to-transparent"
          style={{ animation: "footer-sweep 18s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-[#c89968]/25 to-transparent"
          style={{ animation: "footer-sweep 20s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute left-1/3 bottom-10 w-20 h-20 rounded-full border border-[#c89968]/30"
          style={{ animation: "float-3 12s ease-in-out infinite", willChange: "transform" }}
        />
        <div
          className="absolute right-1/4 bottom-24 w-16 h-16 rounded-full border border-[#c89968]/25"
          style={{ animation: "float-4 10s ease-in-out infinite", willChange: "transform" }}
        />
      </div>
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:border-l lg:border-white/5 lg:pl-8 first:lg:border-none first:lg:pl-0">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo2.png"
                alt="Donna Imobiliária"
                width={36}
                height={36}
                className="h-9 w-9 rounded-md bg-white/10 ring-1 ring-white/10 object-contain"
                priority
              />
              <div>
                <p className="text-xl font-semibold text-white leading-none tracking-wide">Donna Negociações</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest">Imobiliárias</p>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-400">
              Conectando você a experiências únicas e histórias de sucesso no mercado imobiliário.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-gray-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{site.creci}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{site.cnpj}</span>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              {site.instagram && (
                <Link aria-label="Instagram" href={site.instagram} target="_blank" className="rounded-full border border-white/10 p-2 text-gray-400 backdrop-blur hover:border-white/30 hover:text-white hover:-translate-y-0.5 transition">
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {site.facebook && (
                <Link aria-label="Facebook" href={site.facebook} target="_blank" className="rounded-full border border-white/10 p-2 text-gray-400 backdrop-blur hover:border-white/30 hover:text-white hover:-translate-y-0.5 transition">
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {/* Removido YouTube por enquanto */}
            </div>
          </div>

          {/* Navigation */}
          {/* Links removidos conforme solicitado */}

          {/* Contact */}
          <div className="lg:border-l lg:border-white/5 lg:pl-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Endereço</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-white/70" /><span>{site.address}</span></li>
            </ul>
            <Button variant="outline" size="sm" className="mt-4 border-white/20 bg-transparent text-white hover:bg-white/10 rounded-md" asChild>
              <Link href={site.mapUrl || "#"} target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2 h-4 w-4" /> Ver no Mapa
              </Link>
            </Button>
          </div>

          {/* Hours & Social */}
          <div className="lg:border-l lg:border-white/5 lg:pl-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-white/70" />
                <Link href={`tel:${site.phone}`} className="text-gray-400 hover:text-white transition-colors">{formatPhone(site.phone)}</Link>
              </li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-white/70" />
                <Link href={`mailto:${site.email}`} className="text-gray-400 hover:text-white transition-colors">{site.email}</Link>
              </li>
            </ul>
          </div>

          <div className="lg:border-l lg:border-white/5 lg:pl-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Horário de Funcionamento</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-white/70" /><span>{site.openingWeekdays}</span></div>
              <div className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-white/70" /><span>{site.openingSaturday}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          <p>© 2024 Donna Imobiliária. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
