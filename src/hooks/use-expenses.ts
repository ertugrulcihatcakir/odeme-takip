import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { Tables } from "@/integrations/supabase/types";

type ExpenseRow = Tables<"expenses">;

export interface Expense {
  id: string;
  amount: number;
  name: string;
  category: string;
  note: string;
  date: string;
}

function rowToExpense(row: ExpenseRow): Expense {
  return {
    id: row.id,
    amount: Number(row.amount),
    name: row.name,
    category: row.category,
    note: row.note ?? "",
    date: row.created_at,
  };
}

export function useExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    if (!user) { setExpenses([]); setLoading(false); return; }
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });
    setExpenses((data ?? []).map(rowToExpense));
    setLoading(false);
  };

  useEffect(() => { fetchExpenses(); }, [user]);

  const addExpense = async (expense: Omit<Expense, "id" | "date">) => {
    if (!user) return;
    const { data, error } = await supabase.from("expenses").insert({
      user_id: user.id,
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      note: expense.note,
    }).select().single();
    if (data && !error) {
      setExpenses((prev) => [rowToExpense(data), ...prev]);
    }
  };

  const deleteExpense = async (id: string) => {
    await supabase.from("expenses").delete().eq("id", id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalThisMonth = () => {
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const totalAll = () => expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = () => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => { map[e.category] = (map[e.category] || 0) + e.amount; });
    return Object.entries(map)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  };

  return { expenses, loading, addExpense, deleteExpense, totalThisMonth, totalAll, categoryTotals };
}
