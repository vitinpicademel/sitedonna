export function MissionSection() {
  // Cor dourado/bronze mutedo para ícones e divisores (tom suave e terroso)
  const accentColor = "#d4a574"
  
  // Ícones SVG outline na cor dourado/bronze mutedo
  const CompassIcon = () => (
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={accentColor} strokeWidth="1.5" fill="none"/>
      <path d="M12 6v6l4 2" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="12" cy="12" r="2" stroke={accentColor} strokeWidth="1.5" fill="none"/>
    </svg>
  )

  const EyeIcon = () => (
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const HeartIcon = () => (
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const pillars = [
    {
      icon: <CompassIcon />,
      title: "Missão",
      description: "Oferecer soluções imobiliárias personalizadas, conectando pessoas aos seus lares ideais com transparência, agilidade e excelência no atendimento."
    },
    {
      icon: <EyeIcon />,
      title: "Visão",
      description: "Ser reconhecida como a imobiliária de referência em Uberaba, inovando constantemente e superando expectativas dos nossos clientes."
    },
    {
      icon: <HeartIcon />,
      title: "Valores",
      description: "Transparência, ética, compromisso, inovação e relacionamento humano são os pilares que guiam todas as nossas ações."
    }
  ]

  return (
    <section 
      className="py-20 lg:py-24"
      style={{ backgroundColor: '#3d2f28' }} // Marrom escuro/café sólido e rico
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-serif font-bold mb-6"
              style={{ 
                color: '#ffffff', // Branco puro para máximo contraste
                fontFamily: 'Playfair Display, serif'
              }}
            >
              Nossa Essência
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#f8f5f1' }} // Off-white para facilitar leitura
            >
              Construímos relacionamentos duradouros baseados na confiança, transparência e no compromisso de realizar sonhos.
            </p>
          </div>

          {/* Grid dos Pilares - 3 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center px-8 py-12 lg:px-12 lg:py-16 ${
                  index < pillars.length - 1 ? 'lg:border-r-[1px]' : ''
                }`}
                style={{
                  borderRightColor: index < pillars.length - 1 ? accentColor : 'transparent'
                }}
              >
                {/* Ícone SVG Outline */}
                <div className="mb-8 flex items-center justify-center">
                  {pillar.icon}
                </div>

                {/* Título do Pilar */}
                <h3 
                  className="text-2xl lg:text-3xl font-serif font-bold mb-6"
                  style={{ 
                    color: '#ffffff', // Branco puro para máximo contraste
                    fontFamily: 'Playfair Display, serif'
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Texto Descritivo */}
                <p 
                  className="text-base lg:text-lg leading-relaxed max-w-sm mx-auto"
                  style={{ color: '#f8f5f1' }} // Off-white para facilitar leitura
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
