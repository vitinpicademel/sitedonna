export default function BuildingIcons() {
  const buildings = [
    // 1) Casas
    { name: "Casas", icon: "M10,50 L10,25 L30,10 L50,25 L50,50 M20,30 L20,40 M30,30 L30,40 M40,30 L40,40" },
    // 2) Apartamentos
    {
      name: "Apartamentos",
      icon: "M20,50 L20,20 L30,10 L40,20 L40,50 M25,30 L25,35 M35,30 L35,35 M25,40 L25,45 M35,40 L35,45",
    },
    // 3) Condomínio Fechado (novo ícone: portão/guarita com arco e cercas laterais)
    {
      name: "Condomínio Fechado",
      icon: "M15,50 L15,30 L30,18 L45,30 L45,50 M20,50 L20,38 M40,50 L40,38 M26,38 L34,38 M26,44 L34,44",
    },
    // 4) Comercial
    {
      name: "Comercial",
      icon: "M15,50 L15,15 L45,15 L45,50 M20,20 L25,20 M30,20 L35,20 M40,20 L45,20 M20,30 L25,30 M30,30 L35,30 M40,30 L45,30 M20,40 L25,40 M30,40 L35,40 M40,40 L45,40",
    },
  ]

  return (
    <section className="py-16 bg-[#2a1f15]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 justify-items-center">
          {buildings.map((building, index) => (
            <div key={index} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-20 h-20 flex items-center justify-center transition-transform group-hover:scale-110">
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-[#c89968]">
                  <path
                    d={building.icon}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-white text-xs font-bold tracking-wider text-center">{building.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
