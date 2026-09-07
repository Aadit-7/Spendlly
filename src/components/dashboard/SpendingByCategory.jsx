import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";

import { expenseCategories } from "../../data/intialData";

import { formatCurrency } from "../../utils/calculations";

import EmptyState from "../common/EmptyState";

function SpendingByCategory({ expenses = [] }) {
  const categoryTotals = expenses.reduce((accumulator, expense) => {
    const category = expense.category;

    accumulator[category] =
      (accumulator[category] || 0) + Number(expense.amount);

    return accumulator;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([name, value]) => {
    const categoryInfo = expenseCategories.find(
      (category) => category.name === name,
    );

    return {
      name,
      value,
      color: categoryInfo?.color || "#64748b",
    };
  });

  const totalSpent = chartData.reduce((total, item) => total + item.value, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Spending by Category
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Where your money is going
        </p>
      </div>

      {/* Empty State */}

      {chartData.length === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title="No spending data yet"
          description="Add your first expense to see how your spending is distributed across categories."
        />
      ) : (
        <div className="mt-6">
          {/* Chart */}

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg)",
                    border: "1px solid var(--tooltip-border)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{
                    color: "var(--tooltip-text)",
                  }}
                  labelStyle={{
                    color: "var(--tooltip-text)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}

          <div className="mt-4 space-y-3">
            {chartData.map((category) => {
              const percentage =
                totalSpent > 0 ? (category.value / totalSpent) * 100 : 0;

              return (
                <div
                  key={category.name}
                  className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor: category.color,
                      }}
                    />

                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {category.name}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(category.value)}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SpendingByCategory;
