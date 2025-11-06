import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    id: 1,
    name: "Diogo Borges",
    role: "CEO",
    image: "/professional-man-suit.jpg",
    description:
      "Fundador da Donna Negociações Imobiliária, conduz a empresa com visão estratégica e compromisso com a excelência, tornando a marca sinônimo de sofisticação e confiança no mercado.",
  },
  {
    id: 2,
    name: "Jakeline de Almeida",
    role: "CEO",
    image: "/professional-woman-real-estate.jpg",
    description:
      "Co-fundadora da Donna Negociações Imobiliária, alia gestão precisa e sensibilidade no atendimento, garantindo experiências imobiliárias marcadas por elegância e resultados.",
  },
  {
    id: 3,
    name: "Francielle Ramos",
    role: "Gerente Geral",
    image: "/professional-woman-consultant.jpg",
    description:
      "Especialista em imóveis de alto padrão, destaca-se pela atenção aos detalhes e dedicação em oferecer um atendimento personalizado, refletindo o padrão de qualidade da Donna.",
  },
  {
    id: 4,
    name: "Kaká",
    role: "Gerente de Marketing",
    image: "/professional-man-coordinator.jpg",
    description:
      "Responsável pela comunicação e inovação da Donna Negociações Imobiliária, une criatividade e tecnologia para fortalecer a marca e inspirar novas conexões.",
  },
]

export function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-donna-navy font-serif mb-4">Nossa Equipe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Profissionais qualificados e apaixonados pelo que fazem, prontos para transformar seus sonhos em realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-donna-navy mb-1">{member.name}</h3>
                <p className="text-donna-gold font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
