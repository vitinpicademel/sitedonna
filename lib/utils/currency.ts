export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatArea(area: number): string {
  return `${area}m²`
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\+55\s?)(\d{2})\s?(\d{4,5})-?(\d{4})/, "$1($2) $3-$4")
}
