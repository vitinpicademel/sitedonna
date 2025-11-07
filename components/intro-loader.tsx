"use client"

import { useEffect, useState } from "react"

type IntroLoaderProps = {
  minDurationMs?: number
  oncePerSession?: boolean
  videoSrc?: string
  hideOnEvent?: string // nome do evento de DOM que indica que o conteúdo principal está pronto
  hideUi?: boolean // quando true, mostra somente o vídeo (sem logo, sem texto, sem barra)
  waitVideoEnd?: boolean // quando true (padrão se houver videoSrc), só fecha quando o vídeo terminar
}

export function IntroLoader({
  minDurationMs = 1800,
  oncePerSession = false,
  videoSrc,
  hideOnEvent = "launches-ready",
  hideUi = false,
  waitVideoEnd,
}: IntroLoaderProps) {
  const [visible, setVisible] = useState(true)
  const [hiding, setHiding] = useState(false)
  const [timerDone, setTimerDone] = useState(false)
  const [eventDone, setEventDone] = useState(false)
  const shouldWaitVideoEnd = typeof waitVideoEnd === "boolean" ? waitVideoEnd : Boolean(videoSrc)

  useEffect(() => {
    if (oncePerSession && typeof window !== "undefined" && sessionStorage.getItem("intro_shown") === "1") {
      setVisible(false)
      return
    }

    const t = window.setTimeout(() => setTimerDone(true), Math.max(600, minDurationMs))

    const onDone = () => setEventDone(true)
    // Se devemos aguardar o fim do vídeo, não fechamos por evento externo
    if (!shouldWaitVideoEnd) {
      window.addEventListener(hideOnEvent, onDone as EventListener)
    }

    // Failsafe: caso o evento não venha, some após 6s
    const fail = window.setTimeout(() => setEventDone(true), 6000)

    return () => {
      if (!shouldWaitVideoEnd) {
        window.removeEventListener(hideOnEvent, onDone as EventListener)
      }
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
          // Não fazer loop: queremos que o site apareça quando o vídeo terminar
          loop={false}
          onEnded={() => setEventDone(true)}
        />
      ) : null}
      {!hideUi ? (
        <div className="intro-card">
          <img src="/logoprincipal.png" alt="Donna Imobiliária" className="intro-logo" />
          <div className="intro-bar">
            <div className="intro-bar__progress" />
          </div>
          <p className="intro-hint">Carregando experiência...</p>
        </div>
      ) : null}
    </div>
  )
}


