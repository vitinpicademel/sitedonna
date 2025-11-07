import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { Suspense } from "react"
import { PageLoader } from "@/components/ui/page-loader"
import { RevealProvider } from "@/components/reveal-provider"
import { IntroLoader } from "@/components/intro-loader"

export const metadata: Metadata = {
  title: "Donna Negociações Imobiliárias",
  description: "Transformando cada chave em novas possibilidades",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Vendor CSS do tema */}
        <link rel="stylesheet" href="/alipes/assets/vendors/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/alipes/assets/vendors/alipes-icons/style.css" />
        <link rel="stylesheet" href="/alipes/assets/vendors/flaticons/css/flaticon.css" />
        {/* Modo escuro do Alipes */}
        <link rel="stylesheet" href="/alipes/assets/css/modes/alipes-dark.css" />

        {/* Vendor JS básico do tema (carrosséis/animações do template) */}
        <script defer src="/alipes/assets/vendors/bootstrap/js/bootstrap.min.js"></script>
        <script defer src="/alipes/assets/js/alipes-theme.js"></script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <IntroLoader oncePerSession={false} minDurationMs={1600} videoSrc="/alipes/animacao.mov" hideOnEvent="app-ready" hideUi />
        <Suspense fallback={<PageLoader label="Carregando lançamentos..." />}>
          <CustomCursor />
          <RevealProvider />
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
