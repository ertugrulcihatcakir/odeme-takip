export interface Expense {
  id: string;
  amount: number;
  name: string;
  category: string;
  note: string;
  date: string; // ISO string
}

export const CATEGORIES = [
  { value: "yemek", label: "🍕 Yemek", color: "hsl(28, 80%, 56%)" },
  { value: "ulasim", label: "🚌 Ulaşım", color: "hsl(210, 50%, 50%)" },
  { value: "alisveris", label: "🛍️ Alışveriş", color: "hsl(320, 50%, 55%)" },
  { value: "eglence", label: "🎬 Eğlence", color: "hsl(270, 50%, 55%)" },
  { value: "fatura", label: "📄 Fatura", color: "hsl(45, 70%, 50%)" },
  { value: "saglik", label: "💊 Sağlık", color: "hsl(152, 44%, 42%)" },
  { value: "egitim", label: "📚 Eğitim", color: "hsl(200, 60%, 45%)" },
  { value: "diger", label: "📦 Diğer", color: "hsl(0, 0%, 50%)" },
] as const;

export function getCategoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function getCategoryColor(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.color ?? "hsl(0,0%,50%)";
}
