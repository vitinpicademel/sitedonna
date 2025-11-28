import Image from "next/image"

export function HistorySection() {
  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px]">
      {/* Coluna da Esquerda - Imagem */}
      <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto lg:min-h-[700px]">
        <Image
          src="/fachada.jpeg"
          alt="Interior luxuoso da Donna Imobiliária"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Coluna da Direita - Conteúdo de Texto */}
      <div 
        className="w-full lg:w-1/2 flex items-center justify-center"
        style={{ backgroundColor: '#F5F5F1' }}
      >
        <div className="w-full max-w-2xl px-8 py-12 lg:px-16 lg:py-24">
          {/* Título Principal */}
          <h2 
            className="text-4xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: '#3d2f28', fontFamily: 'Playfair Display, serif' }}
          >
            Nossa História
          </h2>

          {/* Divisor Horizontal Dourado */}
          <div 
            className="w-24 h-0.5 mb-8"
            style={{ backgroundColor: '#c89968' }}
          />

          {/* Corpo do Texto em Duas Colunas (apenas desktop) */}
          <div 
            className="text-gray-700 leading-relaxed text-sm lg:text-base text-left"
            style={{ 
              lineHeight: '1.7'
            }}
          >
            <div className="lg:columns-2 lg:gap-12">
            <p className="mb-4 break-inside-avoid">
              A Donna Negociações Imobiliárias nasceu para transformar sonhos em conquistas, com base em confiança,
              profissionalismo e excelência. Fundada em 2023 por especialistas com mais de 12 anos de experiência,
              nossa missão é oferecer um atendimento humano, transparente e personalizado.
            </p>
            <p className="mb-4 break-inside-avoid">
              Mais do que intermediar negócios, ajudamos pessoas a encontrar lares que refletem seus sonhos e
              necessidades, sempre com qualidade, integridade e segurança.
            </p>
            <p className="mb-4 break-inside-avoid">
              Na Donna, acreditamos que cada cliente merece uma experiência tranquila, clara e gratificante, por isso
              trabalhamos para construir relacionamentos duradouros e fazer parte de histórias felizes.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

