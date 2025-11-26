import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="py-16 bg-donna-navy text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video/Image */}
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/professional-real-estate-agent-in-modern-office.jpg')",
                }}
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
            <div className="space-y-6 text-white/95">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                Na Donna Negociações Imobiliária, nossa missão é criar <span className="text-white underline decoration-donna-gold/60 decoration-2 underline-offset-4">conexões
                autênticas</span> entre pessoas e imóveis, proporcionando <span className="text-white underline decoration-donna-gold/60 decoration-2 underline-offset-4">experiências
                únicas</span> e <span className="text-white underline decoration-donna-gold/60 decoration-2 underline-offset-4">histórias de sucesso</span>.
              </h2>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                Oferecemos um <span className="text-white">atendimento diferenciado</span> para quem deseja comprar,
                vender, alugar ou contar com uma <span className="text-white">consultoria especializada</span> no
                mercado imobiliário.
              </p>
              <p>
                Com o apoio de <span className="text-white">tecnologia moderna</span> e <span className="text-white">ferramentas inovadoras</span> de
                visualização, tornamos a busca pelo imóvel ideal mais rápida, prática e eficiente, sem abrir mão do nosso
                maior valor: o <span className="text-white">relacionamento humano</span>.
              </p>
            </div>

            <Button className="bg-donna-gold hover:bg-donna-gold-dark text-white" asChild>
              <Link href="/a-imobiliaria">SAIBA MAIS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
