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
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const shouldWaitVideoEnd = typeof waitVideoEnd === "boolean" ? waitVideoEnd : Boolean(videoSrc)

  useEffect(() => {
    // Esconde o body até o vídeo carregar/fechar
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden"
    }

    if (oncePerSession && typeof window !== "undefined" && sessionStorage.getItem("intro_shown") === "1") {
      setVisible(false)
      if (typeof document !== "undefined") {
        document.body.style.overflow = ""
      }
      return
    }

    // Timer mínimo - aguarda pelo menos o tempo mínimo antes de permitir fechar
    const t = window.setTimeout(() => setTimerDone(true), Math.max(600, minDurationMs))

    const onDone = () => setEventDone(true)
    // Se devemos aguardar o fim do vídeo, não fechamos por evento externo
    if (!shouldWaitVideoEnd) {
      window.addEventListener(hideOnEvent, onDone as EventListener)
    }

    // Failsafe: caso o evento não venha, some após 30s (tempo máximo para vídeo terminar)
    // Se waitVideoEnd é true, ainda assim fecha após 30s para não travar o site
    const fail = window.setTimeout(() => {
      console.log("Failsafe ativado - fechando após timeout máximo")
      setEventDone(true)
    }, 30000)

    return () => {
      if (!shouldWaitVideoEnd) {
        window.removeEventListener(hideOnEvent, onDone as EventListener)
      }
      window.clearTimeout(t)
      window.clearTimeout(fail)
    }
  }, [minDurationMs, oncePerSession, shouldWaitVideoEnd, hideOnEvent])

  useEffect(() => {
    if (!visible) return
    
    // Se houver erro no vídeo, aguarda um pouco antes de fechar (mas só se o timer mínimo já passou)
    if (videoError && timerDone) {
      const errorTimeout = setTimeout(() => {
        console.log("Erro no vídeo detectado, fechando após timeout...")
        setEventDone(true)
      }, 2000)
      return () => clearTimeout(errorTimeout)
    }
    
    // Só fecha se o timer mínimo passou E (o vídeo terminou OU houve erro e já esperou)
    if (timerDone && eventDone) {
      console.log("Fechando intro loader...", { timerDone, eventDone, shouldWaitVideoEnd, videoError, videoLoaded })
      
      setHiding(true)
      const t = window.setTimeout(() => {
        console.log("Intro loader removido do DOM")
        setVisible(false)
        if (oncePerSession) sessionStorage.setItem("intro_shown", "1")
        // Restaura o scroll do body
        if (typeof document !== "undefined") {
          document.body.style.overflow = ""
        }
      }, 450)
      return () => window.clearTimeout(t)
    }
  }, [timerDone, eventDone, visible, oncePerSession, videoError, shouldWaitVideoEnd, videoLoaded])

  if (!visible) return null

  return (
    <div 
      className={`intro-overlay ${hiding ? "intro-overlay--hide" : ""}`}
      style={{ 
        zIndex: 99999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%"
      }}
    >
      {videoSrc ? (
        <video
          className="intro-video"
          autoPlay
          muted
          playsInline
          preload="auto"
          loop={false}
          style={{
            width: "60%",
            maxWidth: "800px",
            height: "auto",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
          }}
          onLoadedData={() => {
            console.log("Vídeo carregado com sucesso")
            setVideoLoaded(true)
          }}
          onCanPlay={() => {
            console.log("Vídeo pronto para reproduzir")
            setVideoLoaded(true)
          }}
          onError={(e) => {
            console.error("Erro ao carregar vídeo:", e)
            setVideoError(true)
          }}
          onLoadStart={() => {
            console.log("Iniciando carregamento do vídeo...")
          }}
          onEnded={(e) => {
            console.log("Vídeo terminou (onEnded), fechando intro...", e)
            // Força o fechamento imediatamente
            setEventDone(true)
            setTimerDone(true) // Garante que timerDone também está true
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget
            // Fallback: se o vídeo chegou ao fim (com pequena margem para garantir)
            if (video.duration > 0 && video.currentTime >= video.duration - 0.2) {
              console.log("Vídeo chegou ao fim (onTimeUpdate), fechando...", {
                currentTime: video.currentTime,
                duration: video.duration
              })
              setEventDone(true)
              setTimerDone(true) // Garante que timerDone também está true
            }
          }}
        >
          {/* Suporta múltiplos formatos para melhor compatibilidade */}
          {videoSrc.endsWith(".mov") ? (
            <>
              <source src={videoSrc.replace(/\.mov$/i, ".mp4")} type="video/mp4" />
              <source src={videoSrc} type="video/quicktime" />
              <source src={videoSrc} type="video/x-quicktime" />
            </>
          ) : videoSrc.endsWith(".mp4") ? (
            <source src={videoSrc} type="video/mp4" />
          ) : (
            <source src={videoSrc} type="video/mp4" />
          )}
        </video>
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
