import { useAuth } from "@/hooks/use-auth";
import { useExpenses } from "@/hooks/use-expenses";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import SummaryCards from "@/components/SummaryCards";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import AuthPage from "@/components/AuthPage";
import { Receipt, LogOut } from "lucide-react";

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { expenses, loading, addExpense, deleteExpense, totalThisMonth, totalAll, categoryTotals } =
    useExpenses();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <Receipt className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground leading-tight">Harcama Takip</h1>
            <p className="text-xs text-muted-foreground">Paranın nereye gittiğini gör</p>
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors active:scale-95"
            aria-label="Çıkış yap"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <SummaryCards
            totalAll={totalAll()}
            totalThisMonth={totalThisMonth()}
            expenseCount={expenses.length}
          />
        </section>

        {/* Add Expense */}
        <section className="bg-card rounded-xl p-5 shadow-sm mb-6 animate-fade-in" style={{ animationDelay: "120ms" }}>
          <h2 className="text-sm font-semibold text-foreground mb-3">Yeni Harcama</h2>
          <AddExpenseForm onAdd={addExpense} />
        </section>

        {/* Category Breakdown */}
        <section className="mb-6 animate-fade-in" style={{ animationDelay: "180ms" }}>
          <CategoryBreakdown categoryTotals={categoryTotals()} />
        </section>

        {/* Expense List */}
        <section className="animate-fade-in" style={{ animationDelay: "240ms" }}>
          <h2 className="text-sm font-semibold text-foreground mb-3">Son Harcamalar</h2>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground animate-pulse">Yükleniyor...</div>
          ) : (
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
