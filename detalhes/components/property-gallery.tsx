"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, Camera } from "lucide-react"

type Media = { url: string; alt?: string }

export default function PropertyGallery({
  images: input,
  status,
}: {
  images?: Media[]
  status?: string
}) {
  const images = useMemo<Media[]>(() => (Array.isArray(input) && input.length ? input : [{ url: "/placeholder.jpg" }]), [input])
  const [currentImage, setCurrentImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const scrollBy = (dir: 1 | -1) => {
    // no-op: mantido para compatibilidade; setamos índice diretamente pelos botões
    if (dir === -1) prevImage()
    else nextImage()
  }
  // indices para layout 3-up (esquerda, centro, direita)
  const total = images.length
  const leftIdx = (currentImage - 1 + total) % total
  const rightIdx = (currentImage + 1) % total

  const Slide = ({ idx, variant }: { idx: number; variant: "left" | "center" | "right" }) => (
    <div
      onClick={() => {
        if (variant !== "center") setCurrentImage(idx)
        else setIsLightboxOpen(true)
      }}
      className={
        variant === "center"
          ? "relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl transition-all duration-300 w-[70vw] md:w-[58vw] lg:w-[48vw] aspect-[16/9]"
          : "relative rounded-2xl overflow-hidden ring-1 ring-white/10 opacity-80 hover:opacity-100 transition-all duration-300 w-[40vw] md:w-[32vw] lg:w-[28vw] aspect-[16/9] scale-[0.94]"
      }
    >
      <Image src={images[idx]?.url || "/placeholder.jpg"} alt={images[idx]?.alt || `Foto ${idx + 1}`} fill className="object-cover" />
      {/* máscara sutil nas laterais para as bordas arredondadas */}
      {variant !== "center" && <div className="absolute inset-0 bg-black/15" />}
    </div>
  )

  return (
    <div className="relative py-2">
      {/* badges no topo-esquerdo */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <span className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-1 text-xs font-bold rounded-md">
          {(status || "Venda").toString().toUpperCase()}
        </span>
        <span className="glass-effect text-[var(--foreground)] px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2">
          <Camera className="w-4 h-4" /> {images.length} FOTOS
        </span>
      </div>

      {/* faixa com 3 imagens (esq/centro/dir) */}
      <div className="flex items-center justify-center gap-6 px-4">
        <Slide idx={leftIdx} variant="left" />
        <Slide idx={currentImage} variant="center" />
        <Slide idx={rightIdx} variant="right" />
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scrollBy(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[var(--primary)] rounded-full flex items-center justify-center hover:brightness-110 transition-all shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--primary-foreground)]" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[var(--primary)] rounded-full flex items-center justify-center hover:brightness-110 transition-all shadow-lg"
            aria-label="Próxima"
          >
            <ChevronRight className="w-6 h-6 text-[var(--primary-foreground)]" />
          </button>
        </>
      )}

      {/* indicadores (bolinhas) */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={
              i === currentImage
                ? "w-2.5 h-2.5 rounded-full bg-[var(--primary)]"
                : "w-2 h-2 rounded-full bg-white/30"
            }
          />
        ))}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center hover:brightness-110 transition-all duration-300 hover:rotate-90"
          >
            <X className="w-6 h-6 text-[var(--primary-foreground)]" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-8 w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center hover:brightness-110 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-7 h-7 text-[var(--primary-foreground)]" />
          </button>

          <div className="relative w-[90vw] h-[90vh] animate-scale-in bg-black">
            <Image
              src={images[currentImage]?.url || "/placeholder.jpg"}
              alt={images[currentImage]?.alt || "Property image fullscreen"}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-8 w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center hover:brightness-110 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-7 h-7 text-[var(--primary-foreground)]" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F5F5F5] text-lg font-medium">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
