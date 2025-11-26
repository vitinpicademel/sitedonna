"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site.config"

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6">
      <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg h-14 w-14 p-0" asChild>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
          <MessageCircle className="h-6 w-6" />
        </a>
      </Button>
    </div>
  )
}
