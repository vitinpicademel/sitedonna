import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
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
        <IntroLoader oncePerSession={false} minDurationMs={1600} videoSrc="/alipes/animacao.mov" hideOnEvent="app-ready" hideUi />
        <RevealProvider />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
