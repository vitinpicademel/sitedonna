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
    <>
      {/* CSS Customizado para estados de foco premium */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Inputs com estados de foco vibrantes - aplicado a todos inputs dentro da página de contato */
        [data-contact-section] input[data-slot="input"]:focus,
        [data-contact-section] textarea[data-slot="textarea"]:focus {
          background-color: rgba(0, 0, 0, 0.4) !important;
          border: 2px solid #d4a574 !important;
          box-shadow: 
            0 0 0 4px rgba(212, 165, 116, 0.15),
            0 0 20px rgba(212, 165, 116, 0.2) !important;
          outline: none !important;
        }
        
        [data-contact-section] input[data-slot="input"]::placeholder,
        [data-contact-section] textarea[data-slot="textarea"]::placeholder {
          color: rgba(212, 197, 179, 0.5) !important;
        }
        
        /* Botões outline com hover elegante */
        .contact-outline-button:hover {
          background: rgba(212, 165, 116, 0.1) !important;
          border-color: #d4a574 !important;
          box-shadow: 0 4px 16px rgba(212, 165, 116, 0.2) !important;
        }
        
        /* Botões de submit com hover premium */
        [data-contact-section] button[type="submit"]:not(:disabled):hover {
          box-shadow: 0 8px 24px rgba(212, 165, 116, 0.4), 0 0 0 4px rgba(212, 165, 116, 0.1) !important;
        }
        
        /* Correção das abas - garantir altura e espaçamento adequados */
        [data-contact-section] [data-slot="tabs-list"] {
          min-height: 80px !important;
          padding: 12px !important;
          height: auto !important;
        }
        
        [data-contact-section] [data-slot="tabs-trigger"] {
          min-height: 60px !important;
          height: auto !important;
          padding: 16px 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          white-space: normal !important;
          line-height: 1.3 !important;
          overflow: visible !important;
        }
        
        [data-contact-section] [data-slot="tabs-trigger"] svg {
          flex-shrink: 0 !important;
          width: 20px !important;
          height: 20px !important;
        }
        
        [data-contact-section] [data-slot="tabs-trigger"] span {
          display: inline-block !important;
        }
        
        /* Correção do card do formulário - garantir altura dinâmica e padding adequado */
        [data-contact-section] [data-slot="tabs-content"] {
          height: auto !important;
          overflow: visible !important;
          min-height: auto !important;
        }
        
        [data-contact-section] [data-slot="tabs-content"] > div {
          height: auto !important;
          overflow: visible !important;
          min-height: auto !important;
        }
        
        /* Garantir que o formulário não seja cortado */
        [data-contact-section] form {
          overflow: visible !important;
        }
      `}} />
      <div 
        className="min-h-screen"
        data-contact-section
        style={{
          background: `radial-gradient(ellipse at center, #5a4030 0%, #423229 30%, #2a1f1a 70%, #1a1512 100%)`
        }}
      >
        <Header appearance="dark" />
        <main>
          <ContactHero />
          <div className="pt-8 pb-20 lg:pt-10 lg:pb-32">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
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
    </>
  )
}
