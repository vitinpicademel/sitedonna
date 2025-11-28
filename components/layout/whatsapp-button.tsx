"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { site } from "@/lib/site.config"

export function WhatsAppButton() {
  // Estados do componente
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [isTriggerVisible, setIsTriggerVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  })

  // Paleta de cores Dark Luxury
  const colors = {
    primary: "#423229", // Marrom Café/Expresso
    primaryDark: "#3d2f28", // Marrom mais escuro
    accent: "#d4a574", // Dourado quente
    accentGold: "#d4af37", // Dourado brilhante
    text: "#f7f4ed", // Creme/Off-white
    textMuted: "#d4c5b3", // Texto secundário
    forestGreen: "#1a4d2e", // Verde floresta profundo
    forestGreenLight: "#2d6a47", // Verde floresta claro
  }

  // Extrair número do WhatsApp da configuração
  const whatsappNumber = site.whatsapp.split('https://wa.me/')[1]?.split('?')[0] || "5534984436877"

  // Timer para mostrar o botão após 5 segundos
  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setIsButtonVisible(true)
    }, 5000) // 5 segundos

    return () => clearTimeout(buttonTimer)
  }, [])

  // Timer para mostrar a mensagem gatilho após 20 segundos
  useEffect(() => {
    const triggerTimer = setTimeout(() => {
      setIsTriggerVisible(true)
    }, 20000) // 20 segundos

    return () => clearTimeout(triggerTimer)
  }, [])

  // Função para abrir o modal e ocultar o gatilho
  const handleOpenModal = () => {
    setIsModalOpen(true)
    setIsTriggerVisible(false) // Ocultar mensagem gatilho ao abrir modal
  }

  // Validar formulário
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email
  }

  // Lidar com submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Criar mensagem personalizada
      const message = `Olá! Meu nome é ${formData.name} e gostaria de conversar sobre imóveis.`

      // Construir URL do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, "_blank")

      // Fechar modal e resetar formulário
      setIsModalOpen(false)
      setFormData({ name: "", email: "" })
      setErrors({ name: "", email: "" })
    }
  }

  // Fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ name: "", email: "" })
    setErrors({ name: "", email: "" })
  }

  return (
    <>
      {/* CSS Customizado - Dark Luxury Design System */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Animações elegantes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
            visibility: hidden;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .whatsapp-button-enter {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .whatsapp-trigger-enter {
          animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .whatsapp-modal-enter {
          animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Efeito de pulso suave */
        .whatsapp-button-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Estilos para inputs do modal */
        .whatsapp-modal-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .whatsapp-modal-input::placeholder {
          color: rgba(212, 197, 179, 0.5);
        }

        .whatsapp-modal-input:focus {
          outline: none !important;
          border-color: ${colors.accentGold} !important;
          box-shadow: 
            0 0 0 4px rgba(212, 175, 55, 0.15),
            0 0 20px rgba(212, 175, 55, 0.2) !important;
          background-color: rgba(0, 0, 0, 0.4) !important;
        }

        /* Botão de submit com hover elegante */
        .whatsapp-modal-submit:hover {
          box-shadow: 
            0 8px 24px rgba(212, 175, 55, 0.4),
            0 0 0 4px rgba(212, 175, 55, 0.1) !important;
          transform: translateY(-2px);
        }

        /* Mensagem gatilho com triângulo */
        .whatsapp-trigger-arrow {
          position: absolute;
          bottom: -8px;
          right: 25px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 8px solid #c39666;
        }

        /* Botão de fechar do gatilho */
        #wa-trigger-close {
          position: absolute;
          top: 8px;
          right: 8px;
          color: #c39666;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s ease;
          font-size: 20px;
          line-height: 1;
          font-weight: 300;
          z-index: 10;
        }

        #wa-trigger-close:hover {
          opacity: 1;
        }

        /* Isolamento de estilos para evitar conflitos */
        .whatsapp-widget-container {
          font-family: 'Poppins', 'Inter', sans-serif;
        }
      `}} />
      
      {/* Container Principal do Widget */}
      <div className="whatsapp-widget-container">
        {/* Botão Flutuante do WhatsApp */}
        <div
          className="fixed bottom-6 right-6"
          style={{
            zIndex: 10001,
            opacity: isButtonVisible ? 1 : 0,
            visibility: isButtonVisible ? 'visible' : 'hidden',
            pointerEvents: isButtonVisible ? 'auto' : 'none',
          }}
        >
          <div className={isButtonVisible ? 'whatsapp-button-enter' : ''}>
            <button
              onClick={handleOpenModal}
              className="group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
              style={{
                background: `linear-gradient(135deg, #25d366 0%, #20ba5a 100%)`,
                boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
              }}
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle className="h-7 w-7 text-white" />
              
              {/* Efeito de pulso */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ backgroundColor: "#25d366" }}
              />
            </button>
          </div>
        </div>

        {/* Mensagem Gatilho (Trigger) */}
        {isButtonVisible && (
          <div
            className="fixed bottom-28 right-6"
            style={{
              zIndex: 10000,
              opacity: isTriggerVisible ? 1 : 0,
              visibility: isTriggerVisible ? 'visible' : 'hidden',
              pointerEvents: isTriggerVisible ? 'auto' : 'none',
              maxWidth: '280px',
            }}
          >
            <div 
              className={isTriggerVisible ? 'whatsapp-trigger-enter' : ''}
              onClick={handleOpenModal}
            >
              <div
                id="wa-trigger-message"
                className="relative rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, #3a2c24 0%, #2a1f1a 100%)`,
                  border: `1px solid #c39666`,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(195, 150, 102, 0.2)`,
                  padding: '12px 30px 12px 15px',
                }}
              >
                {/* Botão de fechar */}
                <span
                  id="wa-trigger-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsTriggerVisible(false)
                  }}
                  style={{
                    color: '#c39666',
                  }}
                >
                  &times;
                </span>

                {/* Texto da mensagem */}
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{
                    color: '#c39666',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Psiu! Descubra a oportunidade exclusiva que separamos para você. 👀
                </p>

                {/* Triângulo apontando para baixo */}
                <div className="wa-triangle-down whatsapp-trigger-arrow" />
              </div>
            </div>
          </div>
        )}

        {/* Modal de Formulário */}
        {isModalOpen && (
          <>
            {/* Overlay Escuro com Blur */}
            <div
              className="fixed inset-0 transition-opacity duration-300"
              style={{
                zIndex: 10002,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onClick={handleCloseModal}
            />

            {/* Modal */}
            <div
              className="fixed inset-0 flex items-center justify-center p-4"
              style={{ zIndex: 10003 }}
              onClick={handleCloseModal}
            >
              <div
                className="relative w-full max-w-md rounded-3xl overflow-hidden whatsapp-modal-enter"
                style={{
                  background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${colors.accentGold}`,
                  boxShadow: `
                    0 24px 64px rgba(0, 0, 0, 0.6),
                    0 0 0 1px rgba(212, 175, 55, 0.2) inset,
                    0 0 40px rgba(212, 175, 55, 0.1)
                  `,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botão Fechar */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 hover:bg-black/30"
                  style={{ color: colors.textMuted }}
                  aria-label="Fechar modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Conteúdo do Modal */}
                <div className="p-8 lg:p-10">
                  {/* Título */}
                  <h3
                    className="text-3xl font-serif font-bold mb-3"
                    style={{
                      color: colors.accentGold,
                      fontFamily: 'Playfair Display, serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Vamos conversar?
                  </h3>
                  <p
                    className="text-base mb-8"
                    style={{
                      color: colors.textMuted,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    Preencha seus dados e inicie uma conversa no WhatsApp
                  </p>

                  {/* Formulário */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nome */}
                    <div className="space-y-2">
                      <label
                        htmlFor="lead-name"
                        className="text-sm font-medium block"
                        style={{
                          color: colors.text,
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      >
                        Nome Completo
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: "" })
                        }}
                        placeholder="Seu nome completo"
                        className="whatsapp-modal-input w-full h-14 px-4 rounded-xl transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          border: errors.name
                            ? '2px solid #ef4444'
                            : `1px solid rgba(212, 175, 55, 0.2)`,
                          color: colors.text,
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                        }}
                      />
                      {errors.name && (
                        <p className="text-sm" style={{ color: '#ef4444' }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Campo E-mail */}
                    <div className="space-y-2">
                      <label
                        htmlFor="lead-email"
                        className="text-sm font-medium block"
                        style={{
                          color: colors.text,
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      >
                        E-mail
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (errors.email) setErrors({ ...errors, email: "" })
                        }}
                        placeholder="seu@email.com"
                        className="whatsapp-modal-input w-full h-14 px-4 rounded-xl transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          border: errors.email
                            ? '2px solid #ef4444'
                            : `1px solid rgba(212, 175, 55, 0.2)`,
                          color: colors.text,
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                        }}
                      />
                      {errors.email && (
                        <p className="text-sm" style={{ color: '#ef4444' }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Botão de Envio */}
                    <button
                      type="submit"
                      className="whatsapp-modal-submit w-full h-14 rounded-xl font-serif font-semibold text-lg transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.accentGold} 0%, ${colors.accent} 100%)`,
                        color: colors.primaryDark,
                        border: 'none',
                        fontFamily: 'Playfair Display, serif',
                        boxShadow: '0 4px 16px rgba(212, 175, 55, 0.25)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      <MessageCircle className="inline-block mr-2 h-5 w-5" />
                      Iniciar Conversa no WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}