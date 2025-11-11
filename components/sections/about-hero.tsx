export function AboutHero() {
  return (
    <section className="pt-16 pb-10 md:pb-12 bg-lux-hero text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-serif animate-fade-up">
            <span className="text-offwhite">Sobre a</span>{' '}
            <span className="title-gold">Donna Negociações Imobiliárias</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#f1e8e0] leading-9 animate-fade-in animate-delay-1">
            Realizamos sonhos e construímos histórias com transparência, dedicação e experiência no que fazemos.
          </p>
          <div className="w-full max-w-3xl mx-auto opacity-75 mt-4 animate-fade-in animate-delay-2">
            <div className="divider-gold" />
          </div>
        </div>
      </div>
    </section>
  )
}
