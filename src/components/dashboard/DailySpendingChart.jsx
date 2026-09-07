import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { formatCurrency } from "../../utils/calculations";

function DailySpendingChart({ expenses = [] }) {
  const isDarkMode =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const chartColors = {
    text: isDarkMode ? "#94a3b8" : "#64748b",
    grid: isDarkMode ? "#334155" : "#e2e8f0",
    tooltipBg: isDarkMode ? "#1e293b" : "#ffffff",
    tooltipBorder: isDarkMode ? "#334155" : "#e2e8f0",
    tooltipText: isDarkMode ? "#f8fafc" : "#0f172a",
  };

  const dailyTotals = expenses.reduce((accumulator, expense) => {
    const date = expense.date;

    accumulator[date] = (accumulator[date] || 0) + Number(expense.amount || 0);

    return accumulator;
  }, {});

  const chartData = Object.entries(dailyTotals)
    .map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),

      amount,

      originalDate: date,
    }))
    .sort((a, b) => new Date(a.originalDate) - new Date(b.originalDate));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Daily Spending
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your spending activity over time
        </p>
      </div>

      {/* Empty State */}

      {chartData.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
          No spending data available
        </div>
      ) : (
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              {/* Gradient */}

              <defs>
                <linearGradient
                  id="spendingGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grid */}

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={chartColors.grid}
              />

              {/* X Axis */}

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: chartColors.text,
                }}
              />

              {/* Y Axis */}

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: chartColors.text,
                }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />

              {/* Tooltip */}

              <Tooltip
                formatter={(value) => [formatCurrency(value), "Spent"]}
                contentStyle={{
                  backgroundColor: chartColors.tooltipBg,
                  border: `1px solid ${chartColors.tooltipBorder}`,
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
                }}
                labelStyle={{
                  color: chartColors.tooltipText,
                  fontWeight: 600,
                }}
                itemStyle={{
                  color: chartColors.tooltipText,
                }}
                cursor={{
                  stroke: chartColors.grid,
                  strokeWidth: 1,
                }}
              />

              {/* Area */}

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#spendingGradient)"
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#ffffff",
                  fill: "#3b82f6",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default DailySpendingChart;
