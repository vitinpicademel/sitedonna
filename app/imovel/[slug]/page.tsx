import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { PropertyGallery } from "@/components/ui/property-gallery"
import { PropertyDetails } from "@/components/ui/property-details"
import { PropertyContact } from "@/components/ui/property-contact"
import { SimilarProperties } from "@/components/ui/similar-properties"
import type { Property } from "@/lib/types"
import propertiesData from "@/data/properties.json"

interface PropertyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return propertiesData.map((property) => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const property = propertiesData.find((p) => p.slug === params.slug)

  if (!property) {
    return {
      title: "Imóvel não encontrado - Donna Imobiliária",
    }
  }

  return {
    title: `${property.title} - Donna Imobiliária`,
    description:
      property.description || `${property.title} em ${property.address.neighborhood}, ${property.address.city}`,
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = propertiesData.find((p) => p.slug === params.slug) as Property

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.media} title={property.title} />
              <PropertyDetails property={property} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PropertyContact property={property} />
            </div>
          </div>

          {/* Similar Properties */}
          <div className="mt-16">
            <SimilarProperties currentProperty={property} />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
