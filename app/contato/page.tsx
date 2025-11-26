import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { ContactHero } from "@/components/sections/contact-hero"
import { ContactForms } from "@/components/sections/contact-forms"
import { ContactInfo } from "@/components/sections/contact-info"

export const metadata = {
  title: "Contato - Donna Imobiliária",
  description: "Entre em contato com a Donna Imobiliária. Estamos prontos para ajudar você a realizar seus sonhos.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactHero />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ContactForms />
              </div>
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
