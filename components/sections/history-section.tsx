import Image from "next/image"

export function HistorySection() {
  // Paleta de cores Dark Luxury
  const primaryColor = "#423229" // Marrom Café/Expresso
  const accentColor = "#d4a574" // Dourado quente
  const textColor = "#3d2f28" // Marrom escuro para texto
  const bgColor = "#F5F5F1" // Creme/Off-white para fundo

  return (
    <section 
      className="w-full min-h-[600px] lg:min-h-[800px] px-4 sm:px-8 md:px-12 lg:px-[60px] py-12 sm:py-16 lg:py-20"
      style={{ backgroundColor: bgColor }}
    >
      {/* Container Principal com Max-Width e Centralizado */}
      <div 
        className="w-full mx-auto relative"
        style={{
          maxWidth: '1280px'
        }}
      >
        {/* Container Flex para Imagem e Card de Texto */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
          
          {/* Container da Imagem - 60-65% da largura, alinhada à direita */}
          <div 
            className="w-full lg:w-[63%] relative flex items-center justify-end"
            style={{
              order: 1
            }}
          >
            <div 
              className="relative w-full max-w-full rounded-[24px] overflow-hidden"
              style={{
                aspectRatio: '4 / 5',
                maxHeight: '800px',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25), 0 12px 32px rgba(0, 0, 0, 0.15)',
                marginLeft: 'auto'
              }}
            >
              <Image
                src="/fachada.jpeg"
                alt="Fachada da Donna Negociações Imobiliárias"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 63vw"
              />
            </div>
          </div>

          {/* Card de Texto Flutuante - Sobrepondo a Imagem */}
          <div 
            className="w-full lg:w-[500px] flex items-center my-8 lg:my-0 lg:-ml-[120px]"
            style={{
              order: 2,
              zIndex: 10,
              alignSelf: 'center'
            }}
          >
            <div 
              className="w-full rounded-[20px]"
              style={{
                backgroundColor: bgColor,
                padding: '50px 45px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(212, 165, 116, 0.1)'
              }}
            >
              {/* Título Principal */}
              <h2 
                className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6 lg:mb-8"
                style={{ 
                  color: textColor, 
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.2'
                }}
              >
                Nossa História
              </h2>

              {/* Divisor Horizontal Dourado */}
              <div 
                className="w-24 h-0.5 mb-8 lg:mb-10"
                style={{ backgroundColor: accentColor }}
              />

              {/* Corpo do Texto em Coluna Única - Estilo Editorial Premium */}
              <div 
                className="text-left"
                style={{ 
                  color: textColor,
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '20px',
                  lineHeight: '1.8',
                  letterSpacing: '0.01em'
                }}
              >
                <p className="mb-6 lg:mb-8">
                  A Donna Negociações Imobiliárias nasceu para transformar sonhos em conquistas, com base em confiança,
                  profissionalismo e excelência. Fundada em 2023 por especialistas com mais de 12 anos de experiência,
                  nossa missão é oferecer um atendimento humano, transparente e personalizado.
                </p>
                <p className="mb-6 lg:mb-8">
                  Mais do que intermediar negócios, ajudamos pessoas a encontrar lares que refletem seus sonhos e
                  necessidades, sempre com qualidade, integridade e segurança.
                </p>
                <p className="mb-0">
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
