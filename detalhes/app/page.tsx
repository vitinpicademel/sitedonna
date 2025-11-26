import Header from "@detalhes/components/header"
import PropertyGallery from "@detalhes/components/property-gallery"
import PropertyDetails from "@detalhes/components/property-details"
import PropertySidebar from "@detalhes/components/property-sidebar"
import ContactSection from "@detalhes/components/contact-section"
import RelatedProperties from "@detalhes/components/related-properties"
import WhatsAppButton from "@detalhes/components/whatsapp-button"
import { Toaster } from "@detalhes/components/ui/toaster"

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <PropertyGallery />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <PropertyDetails />
          </div>
          <div className="lg:col-span-1">
            <PropertySidebar />
          </div>
        </div>

        <ContactSection />
        <RelatedProperties />
      </main>

      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
