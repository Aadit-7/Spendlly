import { ArrowUpRight, ReceiptText } from "lucide-react";

import { getCategoryIcon } from "../../utils/cateoryIcons";

import { formatCurrency, formatDate } from "../../utils/calculations";

import EmptyState from "../common/EmptyState";

function RecentTransactions({ expenses = [] }) {
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 transition-colors duration-300 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your latest expenses
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-400">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Empty State */}

      {recentExpenses.length === 0 ? (
        <EmptyState
          icon={ReceiptText}
          title="No transactions yet"
          description="Your latest expenses will appear here once you start tracking your spending."
        />
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {recentExpenses.map((expense) => {
            const Icon = getCategoryIcon(expense.category);

            return (
              <div
                key={expense.id}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors duration-200 hover:bg-slate-50 sm:px-6 dark:hover:bg-slate-800/70"
              >
                {/* Left Side */}

                <div className="flex min-w-0 items-center gap-4">
                  {/* Category Icon */}

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-300">
                    <Icon size={18} />
                  </div>

                  {/* Transaction Details */}

                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900 dark:text-slate-100">
                      {expense.note}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(expense.date)}
                      </span>

                      <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />

                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {expense.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount */}

                <p className="shrink-0 font-semibold text-slate-900 dark:text-slate-100">
                  -{formatCurrency(expense.amount)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentTransactions;
