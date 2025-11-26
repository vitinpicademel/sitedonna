import type { Metadata } from "next"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import "@alipes/app/globals.css"
import { CustomCursor } from "@alipes/components/custom-cursor"
import { RevealProvider } from "@/components/reveal-provider"
import { PageLoader } from "@/components/ui/page-loader"

export const metadata: Metadata = {
  title: "Nova Home (Alipes)",
  description: "Home nova integrada ao tema Alipes",
}

export default function HomeNovoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense fallback={<PageLoader label="Carregando lançamentos..." />}>
        <CustomCursor />
        <RevealProvider />
        {children}
        <Analytics />
      </Suspense>
    </>
  )
}


