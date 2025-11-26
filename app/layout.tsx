import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import { RevealProvider } from "@/components/reveal-provider"
import { IntroLoader } from "@/components/intro-loader"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Donna Imobiliária - Encontre seu próximo lar",
  description:
    "A Donna Imobiliária oferece os melhores imóveis em Uberaba/MG. Casas, apartamentos, terrenos e lançamentos com qualidade e confiança.",
  generator: "Donna Imobiliária",
  keywords: "imóveis, casas, apartamentos, terrenos, Uberaba, MG, imobiliária",
  authors: [{ name: "Donna Imobiliária" }],
  openGraph: {
    title: "Donna Imobiliária - Encontre seu próximo lar",
    description: "A Donna Imobiliária oferece os melhores imóveis em Uberaba/MG.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donna Imobiliária - Encontre seu próximo lar",
    description: "A Donna Imobiliária oferece os melhores imóveis em Uberaba/MG.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Script
          id="error-suppression"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Suprimir erros de recursos externos que não afetam o funcionamento
              (function() {
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('donnanegociacoes.com.br') ||
                    e.message.includes('service_worker') ||
                    e.message.includes('Cross-Origin-Resource-Policy') ||
                    e.message.includes('fonts.google.com/icons')
                  )) {
                    e.preventDefault();
                    return false;
                  }
                }, true);
                
                // Suprimir erros de postMessage
                const originalPostMessage = window.postMessage;
                window.postMessage = function(message, targetOrigin, transfer) {
                  try {
                    return originalPostMessage.call(this, message, targetOrigin, transfer);
                  } catch(e) {
                    if (e.message && e.message.includes('Unable to post message')) {
                      return;
                    }
                    throw e;
                  }
                };
              })();
            `,
          }}
        />
        {/* Vídeo desativado temporariamente para troca - mantendo fade-in */}
        <IntroLoader 
          minDurationMs={800}
          hideUi={true}
          waitVideoEnd={false}
          oncePerSession={false}
          hideOnEvent="launches-ready"
        />
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){try{w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
}catch(e){console.warn('GTM error:',e);}})(window,document,'script','dataLayer','GTM-NN6WXLBV');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NN6WXLBV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <RevealProvider />
        <div className="page-fade-in">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
