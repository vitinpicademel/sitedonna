"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

const images = ["/luxury-house-pool-night.jpg", "/modern-kitchen-yellow-wall.jpg", "/luxury-living-room-brick-wall.jpg"]

export default function PropertyGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden group animate-fade-in shadow-2xl shadow-[#E5A93D]/20">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt="Property image"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-[#E5A93D] text-[#0E0E0E] px-4 py-1 text-sm font-bold rounded-md animate-pulse-glow">
            VENDA
          </span>
          <span className="glass-effect text-[#F5F5F5] px-4 py-1 text-sm font-medium rounded-md">30 FOTOS</span>
        </div>

        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-[#E5A93D] hover:text-[#0E0E0E] transition-all duration-300 z-10 group/zoom"
        >
          <ZoomIn className="w-5 h-5 group-hover/zoom:scale-110 transition-transform" />
        </button>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#E5A93D] rounded-full flex items-center justify-center hover:bg-[#F1C75B] transition-all duration-300 hover:scale-110 shadow-lg z-10"
        >
          <ChevronLeft className="w-6 h-6 text-[#0E0E0E]" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#E5A93D] rounded-full flex items-center justify-center hover:bg-[#F1C75B] transition-all duration-300 hover:scale-110 shadow-lg z-10"
        >
          <ChevronRight className="w-6 h-6 text-[#0E0E0E]" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                idx === currentImage
                  ? "border-[#E5A93D] scale-110 shadow-lg shadow-[#E5A93D]/50"
                  : "border-[#2C2C2C] hover:border-[#F1C75B] opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img || "/placeholder.svg"} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-[#E5A93D] rounded-full flex items-center justify-center hover:bg-[#F1C75B] transition-all duration-300 hover:rotate-90"
          >
            <X className="w-6 h-6 text-[#0E0E0E]" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-8 w-14 h-14 bg-[#E5A93D] rounded-full flex items-center justify-center hover:bg-[#F1C75B] transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-7 h-7 text-[#0E0E0E]" />
          </button>

          <div className="relative w-[90vw] h-[90vh] animate-scale-in">
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt="Property image fullscreen"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-8 w-14 h-14 bg-[#E5A93D] rounded-full flex items-center justify-center hover:bg-[#F1C75B] transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-7 h-7 text-[#0E0E0E]" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F5F5F5] text-lg font-medium">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
