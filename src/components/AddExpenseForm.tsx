import { useState } from "react";
import { CATEGORIES } from "@/lib/expense-types";
import { Expense } from "@/hooks/use-expenses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Props {
  onAdd: (expense: Omit<Expense, "id" | "date">) => void;
}

export default function AddExpenseForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("yemek");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0 || !name.trim()) return;

    onAdd({
      amount: parsed,
      name: name.trim(),
      category,
      note: note.trim(),
    });

    setAmount("");
    setName("");
    setNote("");
  };

  const getCatEmoji = (val: string) =>
    CATEGORIES.find((c) => c.value === val)?.label.split(" ")[0] ?? "";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <Input
          placeholder="Harcama adı (ör: Market alışverişi)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-12 bg-card font-medium"
          required
        />
        <div className="relative w-36">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₺</span>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-8 text-lg font-semibold h-12 bg-card"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 active:scale-95 ${
              category === cat.value
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Not ekle..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 h-11 bg-card"
        />
        <Button type="submit" size="lg" className="h-11 px-6 active:scale-95 transition-transform">
          <Plus className="w-5 h-5 mr-1" />
          Ekle
        </Button>
      </div>
    </form>
  );
}
