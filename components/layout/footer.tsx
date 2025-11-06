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
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-6 py-16">
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
