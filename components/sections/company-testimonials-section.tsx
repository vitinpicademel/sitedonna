import { Star } from "lucide-react"

const companyTestimonials = [
  {
    id: 1,
    name: "Família Rodrigues",
    content:
      "A Donna nos ajudou a encontrar nossa casa dos sonhos. Profissionalismo e dedicação em cada etapa do processo.",
    rating: 5,
    year: "2023",
  },
  {
    id: 2,
    name: "Empresa TechSolutions",
    content: "Excelente parceria para locação do nosso escritório. Processo rápido e transparente, recomendamos!",
    rating: 5,
    year: "2023",
  },
  {
    id: 3,
    name: "Investidor João Mendes",
    content:
      "Já realizei várias operações com a Donna. Sempre com segurança jurídica e as melhores oportunidades do mercado.",
    rating: 5,
    year: "2024",
  },
]

export function CompanyTestimonialsSection() {
  // Paleta de cores
  const primaryColor = "#423229" // Marrom Café/Expresso
  const accentColor = "#d4a574" // Dourado quente
  const textColor = "#f7f4ed" // Creme/Off-white para texto corrido

  return (
    <section 
      className="py-20 lg:py-24"
      style={{
        background: `radial-gradient(circle at center, ${primaryColor} 0%, ${primaryColor}dd 60%, #2a1f1a 100%)`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-serif font-bold mb-6"
              style={{ 
                color: accentColor,
                fontFamily: 'Playfair Display, serif'
              }}
            >
              Depoimentos
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: textColor }}
            >
              Histórias reais de clientes que confiaram na Donna Imobiliária para realizar seus projetos.
            </p>
          </div>

          {/* Grid dos Depoimentos - Layout limpo sem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 max-w-6xl mx-auto">
            {companyTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col items-center text-center relative py-8"
              >
                {/* Container relativo para posicionar aspas */}
                <div className="relative w-full px-6">
                  {/* Aspas Gigantes de Abertura - Posicionada no topo esquerdo */}
                  <div 
                    className="absolute -top-4 -left-2 text-7xl lg:text-8xl font-serif leading-none"
                    style={{ 
                      color: accentColor,
                      fontFamily: 'Playfair Display, serif',
                      lineHeight: '1',
                      opacity: 0.4
                    }}
                  >
                    "
                  </div>

                  {/* Estrelas de Avaliação - Cor Dourada */}
                  <div className="flex justify-center gap-1 mb-6 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 lg:h-6 lg:w-6" 
                        style={{ 
                          fill: accentColor, 
                          color: accentColor 
                        }} 
                      />
                    ))}
                  </div>

                  {/* Texto do Depoimento - Cor Creme */}
                  <blockquote 
                    className="text-base lg:text-lg leading-relaxed mb-6 italic relative z-10 px-4"
                    style={{ color: textColor }}
                  >
                    {testimonial.content}
                  </blockquote>

                  {/* Aspas Gigantes de Fechamento - Posicionada no canto inferior direito */}
                  <div 
                    className="absolute -bottom-8 -right-2 text-7xl lg:text-8xl font-serif leading-none"
                    style={{ 
                      color: accentColor,
                      fontFamily: 'Playfair Display, serif',
                      lineHeight: '1',
                      opacity: 0.4
                    }}
                  >
                    "
                  </div>
                </div>

                {/* Nome do Autor - Cor Dourada */}
                <p 
                  className="text-lg lg:text-xl font-bold mb-2"
                  style={{ 
                    color: accentColor,
                    fontFamily: 'Playfair Display, serif'
                  }}
                >
                  {testimonial.name}
                </p>

                {/* Ano - Cor Dourada mais suave */}
                <p 
                  className="text-sm lg:text-base opacity-80"
                  style={{ color: accentColor }}
                >
                  {testimonial.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
