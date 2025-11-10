import { Target, Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MissionSection() {
  return (
    <section className="pt-8 pb-16 md:pt-10 bg-[#1a1410]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-serif mb-4">Nossa Essência</h2>
            <p className="text-[#e9e4df] max-w-2xl mx-auto">
              Construímos relacionamentos duradouros baseados na confiança, transparência e no compromisso de realizar
              sonhos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <Card className="text-center reveal reveal-slow reveal-delay-1 bg-white/95 border border-[#e8e6e2] shadow-[0_14px_28px_rgba(169,151,119,.18)]">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#c89968' }}>
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2b1f16] mb-4">Missão</h3>
                <p className="text-[#3A3A3A]">
                  Oferecer soluções imobiliárias personalizadas, conectando pessoas aos seus lares ideais com
                  transparência, agilidade e excelência no atendimento.
                </p>
              </CardContent>
            </Card>

            {/* Visão */}
            <Card className="text-center reveal reveal-slow reveal-delay-2 bg-white/95 border border-[#e8e6e2] shadow-[0_14px_28px_rgba(169,151,119,.18)]">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#c89968' }}>
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2b1f16] mb-4">Visão</h3>
                <p className="text-[#3A3A3A]">
                  Ser reconhecida como a imobiliária de referência em Uberaba, inovando constantemente e superando
                  expectativas dos nossos clientes.
                </p>
              </CardContent>
            </Card>

            {/* Valores */}
            <Card className="text-center reveal reveal-slow reveal-delay-3 bg-white/95 border border-[#e8e6e2] shadow-[0_14px_28px_rgba(169,151,119,.18)]">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#c89968' }}>
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2b1f16] mb-4">Valores</h3>
                <p className="text-[#3A3A3A]">
                  Transparência, ética, compromisso, inovação e relacionamento humano são os pilares que guiam todas as
                  nossas ações.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* História */}
          <div className="mt-16 rounded-lg p-8 reveal reveal-slower reveal-delay-2 bg-white/90 border border-[#e8e6e2] shadow-[0_10px_24px_rgba(0,0,0,.06)]">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#2b1f16] font-serif mb-6 text-center">Nossa História</h3>
              <div className="space-y-4 text-[#3A3A3A]">
                <p>
                  A Donna Negociações Imobiliárias nasceu para transformar sonhos em conquistas, com base em confiança,
                  profissionalismo e excelência. Fundada em 2023 por especialistas com mais de 12 anos de experiência,
                  nossa missão é oferecer um atendimento humano, transparente e personalizado.
                </p>
                <p>
                  Mais do que intermediar negócios, ajudamos pessoas a encontrar lares que refletem seus sonhos e
                  necessidades, sempre com qualidade, integridade e segurança.
                </p>
                <p>
                  Na Donna, acreditamos que cada cliente merece uma experiência tranquila, clara e gratificante, por isso
                  trabalhamos para construir relacionamentos duradouros e fazer parte de histórias felizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
