"use client"

import { useEffect } from "react"

export function RevealProvider() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, section, article, [data-reveal]")
    ).filter((el) => !el.classList.contains("reveal-ignore") && !el.hasAttribute("data-reveal-ignore"))

    nodes.forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal")
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    )
    nodes.forEach((el, i) => {
      // aplica um pequeno incremento de delay em sequência para efeito cascata
      el.style.transitionDelay = el.style.transitionDelay || `${Math.min(i * 40, 240)}ms`
      io.observe(el)
    })

    // Garante que elementos já visíveis no carregamento recebam 'show'
    const markInitialInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < vh * 0.95 && rect.bottom > 0
        if (inView) el.classList.add("show")
      })
    }
    // roda após a pintura inicial
    requestAnimationFrame(() => markInitialInView())

    return () => io.disconnect()
  }, [])

  return null
}



