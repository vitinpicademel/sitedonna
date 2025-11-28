import Image from "next/image"

const teamMembers = [
  {
    id: 1,
    name: "Diogo Borges",
    role: "CEO",
    image: "/professional-man-portrait.jpeg", // Atualizado para .jpeg
    description:
      "Fundador da Donna Negociações Imobiliária, conduz a empresa com visão estratégica e compromisso com a excelência, tornando a marca sinônimo de sofisticação e confiança no mercado.",
  },
  {
    id: 2,
    name: "Jakeline de Almeida",
    role: "CEO",
    image: "/professional-woman-portrait.jpeg", // Atualizado para .jpeg
    description:
      "Co-fundadora da Donna Negociações Imobiliárias, alia gestão precisa e sensibilidade no atendimento, garantindo experiências imobiliárias marcadas por elegância e resultados.",
  },
  {
    id: 3,
    name: "Francielle Ramos",
    role: "Gerente Geral",
    image: "/professional-woman-portrait-2.jpg", // Atualizado para .jpg
    description:
      "Especialista em imóveis de alto padrão, destaca-se pela atenção aos detalhes e dedicação em oferecer um atendimento personalizado, refletindo o padrão de qualidade da Donna.",
  },
  {
    id: 4,
    name: "Kaká",
    role: "Gerente de Marketing",
    image: "/professional-man-portrait-2.png",
    description:
      "Responsável pela comunicação e inovação da Donna Negociações Imobiliária, une criatividade e tecnologia para fortalecer a marca e inspirar novas conexões.",
  },
]

export function TeamSection() {
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
              Nossa Equipe
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: textColor }}
            >
              Profissionais qualificados e apaixonados pelo que fazem, prontos para transformar seus sonhos em realidade.
            </p>
          </div>

          {/* Grid dos Membros da Equipe - Layout limpo sem cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center text-center"
              >
                {/* Foto Redonda */}
                <div 
                  className="relative w-32 h-32 lg:w-40 lg:h-40 mb-6 rounded-full overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 2px ${accentColor}, 0 0 0 6px transparent`
                  }}
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: member.id === 2 || member.id === 3 ? 'center 25%' : 'center center'
                    }}
                    unoptimized={true}
                    priority={member.id <= 2}
                  />
                </div>

                {/* Nome - Cor Dourada */}
                <h3 
                  className="text-xl lg:text-2xl font-serif font-bold mb-2"
                  style={{ 
                    color: accentColor,
                    fontFamily: 'Playfair Display, serif'
                  }}
                >
                  {member.name}
                </h3>

                {/* Cargo - Cor Dourada */}
                <p 
                  className="text-base lg:text-lg font-medium mb-4"
                  style={{ color: accentColor }}
                >
                  {member.role}
                </p>

                {/* Descrição - Cor Creme */}
                <p 
                  className="text-sm lg:text-base leading-relaxed max-w-xs mx-auto"
                  style={{ color: textColor }}
                >
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
