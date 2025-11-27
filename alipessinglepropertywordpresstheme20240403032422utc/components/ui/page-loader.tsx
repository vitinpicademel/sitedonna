"use client"

import Image from "next/image"

export function PageLoader({ label = "Carregando imóveis..." }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#3d2f28]">
      <div className="relative mb-6">
        <div className="h-24 w-24 rounded-full border-4 border-[#c89968]/40 border-t-[#c89968] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/logoprincipal.png" alt="Donna Imobiliária" width={56} height={56} className="opacity-90" />
        </div>
      </div>
      <p className="text-sm font-medium text-white/90">{label}</p>
    </div>
  )
}


