import { Target, Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MissionSection() {
  return (
    <section className="pt-10 pb-16 md:pt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 underline-gold animate-fade-up">
              Nossa Essência
            </h2>
            <p className="text-[#e6d6c8] max-w-2xl mx-auto leading-8 animate-fade-in animate-delay-1">
              Construímos relacionamentos duradouros baseados na confiança, transparência e no compromisso de realizar
              sonhos.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-6 opacity-80 animate-fade-in animate-delay-2">
              <div className="divider-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <Card className="text-center card-lux animate-fade-up" style={{ backgroundColor: '#d4a574', color: '#3d2f28', border: '4px solid #816347' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--lux-gold)' }}>
                  <Target className="h-8 w-8 text-white icon-gold" />
                </div>
                <h3 className="text-xl font-semibold text-brown mb-4">Missão</h3>
                <p className="text-brown-gray">
                  Oferecer soluções imobiliárias personalizadas, conectando pessoas aos seus lares ideais com
                  transparência, agilidade e excelência no atendimento.
                </p>
              </CardContent>
            </Card>

            {/* Visão */}
            <Card className="text-center card-lux animate-fade-up animate-delay-1" style={{ backgroundColor: '#d4a574', color: '#3d2f28', border: '4px solid #816347' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--lux-gold)' }}>
                  <Eye className="h-8 w-8 text-white icon-gold" />
                </div>
                <h3 className="text-xl font-semibold text-brown mb-4">Visão</h3>
                <p className="text-brown-gray">
                  Ser reconhecida como a imobiliária de referência em Uberaba, inovando constantemente e superando
                  expectativas dos nossos clientes.
                </p>
              </CardContent>
            </Card>

            {/* Valores */}
            <Card className="text-center card-lux animate-fade-up animate-delay-2" style={{ backgroundColor: '#d4a574', color: '#3d2f28', border: '4px solid #816347' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--lux-gold)' }}>
                  <Heart className="h-8 w-8 text-white icon-gold" />
                </div>
                <h3 className="text-xl font-semibold text-brown mb-4">Valores</h3>
                <p className="text-brown-gray">
                  Transparência, ética, compromisso, inovação e relacionamento humano são os pilares que guiam todas as
                  nossas ações.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* História */}
          <div className="mt-16 rounded-lg p-8 shadow-[0_10px_24px_rgba(0,0,0,.06)] animate-fade-up" style={{ backgroundColor: '#d4a574', color: '#3d2f28', border: '4px solid #816347' }}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-brown font-serif mb-6 text-center underline-gold">Nossa História</h3>
              <div className="space-y-4 text-brown-gray leading-8">
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
