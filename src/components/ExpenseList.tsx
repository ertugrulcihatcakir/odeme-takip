import { Expense } from "@/hooks/use-expenses";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-4xl mb-3">📝</p>
        <p className="font-medium">Henüz harcama yok</p>
        <p className="text-sm mt-1">İlk harcamanı ekleyerek başla!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense, i) => (
        <div
          key={expense.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-card hover:shadow-md transition-shadow duration-200 group"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{expense.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">{getCategoryLabel(expense.category)}</span>
              {expense.note && (
                <span className="text-xs text-muted-foreground truncate">— {expense.note}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {format(new Date(expense.date), "d MMM yyyy, HH:mm", { locale: tr })}
            </p>
          </div>
          <span className="font-semibold text-expense-red tabular-nums whitespace-nowrap">
            -₺{expense.amount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
          </span>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-1.5 rounded-md opacity-40 hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all active:scale-90"
            aria-label="Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
