import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white font-serif mb-4 underline-gold">Depoimentos</h2>
          <p className="text-[#e6d6c8] max-w-2xl mx-auto">
            Histórias reais de clientes que confiaram na Donna Imobiliária para realizar seus projetos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {companyTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-lux animate-fade-up" style={{ backgroundColor: '#d4a574', color: '#3d2f28', border: '4px solid #816347' }}>
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" style={{ fill: "var(--lux-gold)", color: "var(--lux-gold)" }} />
                  ))}
                </div>
                <blockquote className="text-brown-gray mb-4 italic leading-7">"{testimonial.content}"</blockquote>
                <div className="text-center">
                  <p className="font-semibold text-brown">{testimonial.name}</p>
                  <p className="text-sm text-[#666]">{testimonial.year}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
