import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { LaunchDetails } from "@/components/ui/launch-details"
import type { Launch } from "@/lib/types"
import launchesData from "@/data/launches.json"

interface LaunchPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return launchesData.map((launch) => ({
    slug: launch.slug,
  }))
}

export async function generateMetadata({ params }: LaunchPageProps) {
  const launch = launchesData.find((l) => l.slug === params.slug)

  if (!launch) {
    return {
      title: "Lançamento não encontrado - Donna Imobiliária",
    }
  }

  return {
    title: `${launch.title} - Donna Imobiliária`,
    description: launch.description || `${launch.title} - Novo lançamento em ${launch.address}`,
  }
}

export default function LaunchPage({ params }: LaunchPageProps) {
  const launch = launchesData.find((l) => l.slug === params.slug) as Launch

  if (!launch) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <LaunchDetails launch={launch} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
