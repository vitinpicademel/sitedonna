import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Condo } from "@/lib/types"
import { formatCurrency, formatArea } from "@/lib/utils/currency"

interface CondoCardProps {
  condo: Condo
}

export function CondoCard({ condo }: CondoCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={condo.media[0]?.url || "/placeholder.svg?height=200&width=300"}
          alt={condo.media[0]?.alt || condo.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{condo.title}</h3>

          {condo.areaRange && (
            <p className="text-sm text-muted-foreground">
              De {formatArea(condo.areaRange.min)} a {formatArea(condo.areaRange.max)}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div>
              {condo.priceFrom ? (
                <p className="text-lg font-bold text-donna-navy">A partir de {formatCurrency(condo.priceFrom)}</p>
              ) : (
                <p className="text-lg font-semibold text-donna-navy">Consulte valores</p>
              )}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`#`}>Ver</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
