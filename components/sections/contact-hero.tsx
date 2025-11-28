export function ContactHero() {
  const accentColor = "#d4a574" // Dourado quente
  const textColor = "#f7f4ed" // Creme/Off-white
  const textMuted = "#d4c5b3" // Texto secundário

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif"
            style={{
              color: accentColor,
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            Fale <span style={{ color: accentColor }}>Conosco</span>
          </h1>
          <p 
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto"
            style={{ 
              color: textMuted,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.01em'
            }}
          >
            Estamos aqui para ajudar você a realizar seus sonhos. Entre em contato e descubra como podemos transformar
            sua vida.
          </p>
        </div>
      </div>
    </section>
  )
}
