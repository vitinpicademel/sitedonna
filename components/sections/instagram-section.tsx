import Link from "next/link"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site.config"

const instagramPosts = [
  { id: 1, image: "/modern-apartment.png" },
  { id: 2, image: "/luxury-house-exterior.jpg" },
  { id: 3, image: "/beautiful-kitchen-design.jpg" },
  { id: 4, image: "/cozy-living-room.png" },
  { id: 5, image: "/modern-bathroom.png" },
  { id: 6, image: "/lush-garden-landscape.png" },
  { id: 7, image: "/office-space-design.jpg" },
  { id: 8, image: "/balcony-view.png" },
]

export function InstagramSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-donna-navy font-serif mb-4">Siga no Instagram</h2>
          <p className="text-gray-600 mb-6">Acompanhe nossos lançamentos e novidades nas redes sociais</p>
          <Button className="bg-donna-gold hover:bg-donna-gold-dark" asChild>
            <Link href={site.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              @donnaimobiliaria
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            >
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${post.image}')` }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
