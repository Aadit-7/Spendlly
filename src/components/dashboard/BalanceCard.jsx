import { Wallet } from "lucide-react";

import {
  formatCurrency,
  getRemainingBalance,
  getSpendingPercentage,
} from "../../utils/calculations";

function BalanceCard({ income, expenses }) {
  const remainingBalance = getRemainingBalance(income, expenses);

  const spendingPercentage = getSpendingPercentage(income, expenses);

  const progressWidth = Math.min(Math.max(spendingPercentage, 0), 100);

  const hasIncome = Number(income) > 0;

  const isOverBudget = hasIncome && remainingBalance < 0;

  return (
    <div
      className={`rounded-2xl p-6 text-white shadow-lg transition-colors duration-300 ${
        isOverBudget
          ? "bg-red-950 dark:bg-red-950"
          : "bg-slate-900 dark:bg-slate-900"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-300">
            {isOverBudget ? "Budget Exceeded" : "Remaining Balance"}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {formatCurrency(remainingBalance)}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {!hasIncome
              ? "Set your monthly income in Settings"
              : isOverBudget
                ? "Your expenses are higher than your monthly income"
                : "Available to spend this month"}
          </p>
        </div>

        {/* Wallet Icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            isOverBudget
              ? "bg-red-500/20 text-red-200"
              : "bg-white/10 text-white"
          }`}
        >
          <Wallet size={24} />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-slate-300">Monthly budget used</span>

          <span className="font-medium text-white">
            {hasIncome ? `${spendingPercentage.toFixed(1)}%` : "—"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? "bg-red-400" : "bg-white"
            }`}
            style={{
              width: hasIncome ? `${progressWidth}%` : "0%",
            }}
          />
        </div>

        <div className="mt-4 flex flex-col justify-between gap-2 text-sm text-slate-300 sm:flex-row">
          <span>Income: {formatCurrency(income)}</span>

          <span>
            {isOverBudget ? "Over by: " : "Remaining: "}

            {formatCurrency(Math.abs(remainingBalance))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
