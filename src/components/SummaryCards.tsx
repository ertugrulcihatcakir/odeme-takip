import { Wallet, TrendingDown, CalendarDays } from "lucide-react";

interface Props {
  totalAll: number;
  totalThisMonth: number;
  expenseCount: number;
}

export default function SummaryCards({ totalAll, totalThisMonth, expenseCount }: Props) {
  const cards = [
    {
      icon: CalendarDays,
      label: "Bu Ay",
      value: `₺${totalThisMonth.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`,
      accent: "text-accent",
    },
    {
      icon: TrendingDown,
      label: "Toplam Harcama",
      value: `₺${totalAll.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`,
      accent: "text-expense-red",
    },
    {
      icon: Wallet,
      label: "İşlem Sayısı",
      value: expenseCount.toString(),
      accent: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <card.icon className={`w-5 h-5 ${card.accent} mb-2`} />
          <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
          <p className={`text-lg font-bold tabular-nums mt-0.5 ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
