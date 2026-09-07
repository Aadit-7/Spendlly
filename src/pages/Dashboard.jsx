import { useSelector } from "react-redux";

import { ArrowDownRight, TrendingUp, Tag, CalendarDays } from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import BalanceCard from "../components/dashboard/BalanceCard";
import StatCard from "../components/dashboard/StatCard";
import SpendingByCategory from "../components/dashboard/SpendingByCategory";
import DailySpendingChart from "../components/dashboard/DailySpendingChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import {
  formatCurrency,
  getTotalSpent,
  getTopCategory,
  getDailyAverage,
} from "../utils/calculations";

function Dashboard() {
  const { expenses = [], monthlyIncome = 0 } = useSelector(
    (state) => state.expenses || {},
  );

  const totalSpent = getTotalSpent(expenses);

  const topCategory = getTopCategory(expenses);

  const dailyAverage = getDailyAverage(expenses);

  const currentDate = new Date();

  const hour = currentDate.getHours();

  const getGreeting = () => {
    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 17) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  const currentMonth = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50 p-5 transition-colors duration-300 sm:p-8 dark:bg-slate-950">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {currentMonth}
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {getGreeting()} 👋
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Here is an overview of your spending this month.
          </p>
        </div>

        {/* Balance Card */}
        <BalanceCard income={monthlyIncome} expenses={expenses} />

        {/* Statistics */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Spent"
            value={formatCurrency(totalSpent)}
            subtitle="This month"
            icon={ArrowDownRight}
            iconClassName="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          />

          <StatCard
            title="Monthly Income"
            value={formatCurrency(monthlyIncome)}
            subtitle="Your monthly budget"
            icon={TrendingUp}
            iconClassName="bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
          />

          <StatCard
            title="Top Category"
            value={topCategory.category}
            subtitle={formatCurrency(topCategory.amount)}
            icon={Tag}
            iconClassName="bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
          />

          <StatCard
            title="Daily Average"
            value={formatCurrency(dailyAverage)}
            subtitle="Based on active days"
            icon={CalendarDays}
            iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <SpendingByCategory expenses={expenses} />

          <DailySpendingChart expenses={expenses} />
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <RecentTransactions expenses={expenses} />
        </div>
      </div>
    </PageLayout>
  );
}

export default Dashboard;
