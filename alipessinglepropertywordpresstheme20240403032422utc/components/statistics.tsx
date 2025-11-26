import { Building2, Car, Home, Bed } from "lucide-react"

export default function Statistics() {
  const stats = [
    {
      icon: Building2,
      number: "34,000",
      label: "Square Feet",
    },
    {
      icon: Car,
      number: "600",
      label: "Number Of Parkings",
    },
    {
      icon: Home,
      number: "380",
      label: "Luxury Apartments",
    },
    {
      icon: Bed,
      number: "726",
      label: "Deluxe Bedrooms",
    },
  ]

  return (
    <section className="py-20 bg-[#1a1410] relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url(/placeholder.svg?height=400&width=1920&query=luxury+apartment+building+night)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-[#b8956a] rounded-sm">
                <stat.icon className="w-8 h-8 text-[#b8956a]" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
