import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-bold text-lg inline-block">
              Chave de Ouro
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Há mais de 20 anos realizando sonhos e conectando pessoas aos seus lares ideais.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#imoveis" className="hover:text-accent transition-colors">
                  Imóveis
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-accent transition-colors">
                  A Imobiliária
                </a>
              </li>
              <li>
                <a href="#lancamentos" className="hover:text-accent transition-colors">
                  Lançamentos
                </a>
              </li>
              <li>
                <a href="#condominios" className="hover:text-accent transition-colors">
                  Condomínios
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>contato@chavedeouro.com.br</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>
                  Rua das Flores, 123
                  <br />
                  São Paulo - SP
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-accent text-accent-foreground p-2 rounded-full hover:bg-accent/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-accent text-accent-foreground p-2 rounded-full hover:bg-accent/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-accent text-accent-foreground p-2 rounded-full hover:bg-accent/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 Imobiliária Chave de Ouro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
