"use client"

import { useEffect, useState } from "react"

type IntroLoaderProps = {
  minDurationMs?: number
  oncePerSession?: boolean
  videoSrc?: string
  hideOnEvent?: string // nome do evento de DOM que indica que o conteúdo principal está pronto
}

export function IntroLoader({ minDurationMs = 1800, oncePerSession = false, videoSrc, hideOnEvent = "launches-ready" }: IntroLoaderProps) {
  const [visible, setVisible] = useState(true)
  const [hiding, setHiding] = useState(false)
  const [timerDone, setTimerDone] = useState(false)
  const [eventDone, setEventDone] = useState(false)

  useEffect(() => {
    if (oncePerSession && typeof window !== "undefined" && sessionStorage.getItem("intro_shown") === "1") {
      setVisible(false)
      return
    }

    const t = window.setTimeout(() => setTimerDone(true), Math.max(600, minDurationMs))

    const onDone = () => setEventDone(true)
    window.addEventListener(hideOnEvent, onDone as EventListener)

    // Failsafe: caso o evento não venha, some após 6s
    const fail = window.setTimeout(() => setEventDone(true), 6000)

    return () => {
      window.removeEventListener(hideOnEvent, onDone as EventListener)
      window.clearTimeout(t)
      window.clearTimeout(fail)
    }
  }, [minDurationMs, oncePerSession])

  useEffect(() => {
    if (!visible) return
    if (timerDone && eventDone) {
      setHiding(true)
      const t = window.setTimeout(() => {
        setVisible(false)
        if (oncePerSession) sessionStorage.setItem("intro_shown", "1")
      }, 450)
      return () => window.clearTimeout(t)
    }
  }, [timerDone, eventDone, visible, oncePerSession])

  if (!visible) return null

  return (
    <div className={`intro-overlay ${hiding ? "intro-overlay--hide" : ""}`}>
      {videoSrc ? (
        <video
          className="intro-video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onEnded={() => setEventDone(true)}
        />
      ) : null}
      <div className="intro-card">
        <img src="/logoprincipal.png" alt="Donna Imobiliária" className="intro-logo" />
        <div className="intro-bar">
          <div className="intro-bar__progress" />
        </div>
        <p className="intro-hint">Carregando experiência...</p>
      </div>
    </div>
  )
}



