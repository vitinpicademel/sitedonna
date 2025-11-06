import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Launch } from "@/lib/types"
import { formatCurrency, formatArea } from "@/lib/utils/currency"

interface LaunchCardProps {
  launch: Launch
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const rawUrl = launch.media[0]?.url
  const imageSrc = rawUrl
    ? (rawUrl.startsWith("/") ? rawUrl : `/api/imoview/image?url=${encodeURIComponent(rawUrl)}`)
    : "/placeholder.svg?height=600&width=600"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
        <Image
          src={imageSrc}
          alt={launch.media[0]?.alt || launch.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{launch.title}</h3>
            {launch.address && <p className="text-sm text-muted-foreground">{launch.address}</p>}
          </div>

          {launch.areaRange && (
            <p className="text-sm text-muted-foreground">
              De {formatArea(launch.areaRange.min)} a {formatArea(launch.areaRange.max)}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div>
              {launch.priceFrom ? (
                <p className="text-lg font-bold text-donna-navy">A partir de {formatCurrency(launch.priceFrom)}</p>
              ) : (
                <p className="text-lg font-semibold text-donna-navy">Consulte valores</p>
              )}
            </div>
            <Button className="bg-donna-gold hover:bg-donna-gold-dark" size="sm" asChild>
              <Link href={`/lancamento/${launch.slug}`}>Conheça</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
