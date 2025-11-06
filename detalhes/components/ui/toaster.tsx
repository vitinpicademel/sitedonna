"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@detalhes/components/ui/toast"
import { useToast } from "@detalhes/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="glass-effect border-[#E5A93D]">
          <div className="grid gap-1">
            {title && <ToastTitle className="text-[#F5F5F5]">{title}</ToastTitle>}
            {description && <ToastDescription className="text-[#B3B3B3]">{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
