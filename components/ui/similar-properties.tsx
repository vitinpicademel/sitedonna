import { PropertyCard } from "@/components/ui/property-card"
import type { Property } from "@/lib/types"
import propertiesData from "@/data/properties.json"

interface SimilarPropertiesProps {
  currentProperty: Property
}

export function SimilarProperties({ currentProperty }: SimilarPropertiesProps) {
  const similarProperties = propertiesData
    .filter(
      (property) =>
        property.id !== currentProperty.id &&
        (property.type === currentProperty.type ||
          property.address.neighborhood === currentProperty.address.neighborhood),
    )
    .slice(0, 3)

  if (similarProperties.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-donna-navy font-serif mb-6">Imóveis similares</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
