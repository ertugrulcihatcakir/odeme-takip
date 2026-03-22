import { getCategoryLabel, getCategoryColor } from "@/lib/expense-types";

interface Props {
  categoryTotals: { category: string; total: number }[];
}

export default function CategoryBreakdown({ categoryTotals }: Props) {
  if (categoryTotals.length === 0) return null;

  const max = categoryTotals[0]?.total ?? 1;

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-4">Kategori Dağılımı</h3>
      <div className="space-y-3">
        {categoryTotals.map((item, i) => (
          <div key={item.category} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{getCategoryLabel(item.category)}</span>
              <span className="tabular-nums text-muted-foreground font-medium">
                ₺{item.total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(item.total / max) * 100}%`,
                  backgroundColor: getCategoryColor(item.category),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
