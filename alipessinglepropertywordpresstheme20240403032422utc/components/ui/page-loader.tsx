"use client"

import Image from "next/image"

export function PageLoader({ label = "Carregando imóveis..." }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative mb-6">
        <div className="h-24 w-24 rounded-full border-4 border-amber-400/40 border-t-amber-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/logoprincipal.png" alt="Donna Imobiliária" width={56} height={56} className="opacity-90" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-700">{label}</p>
    </div>
  )
}


