import {
  ArrowDownUp,
  Pencil,
  Trash2,
  SearchX,
  ReceiptText,
} from "lucide-react";

import { formatCurrency, formatDate } from "../../utils/calculations";

import { getCategoryIcon } from "../../utils/cateoryIcons";

import EmptyState from "../common/EmptyState";

function ExpenseTable({
  expenses = [],
  totalExpenses = 0,
  hasActiveFilters = false,
  onEdit,
  onDelete,
  onAddExpense,
  sortField,
  sortDirection,
  onSort,
}) {
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return (
        <ArrowDownUp size={14} className="text-slate-400 dark:text-slate-500" />
      );
    }

    return (
      <span className="text-xs text-slate-900 dark:text-slate-100">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const headers = [
    {
      label: "Date",
      field: "date",
    },
    {
      label: "Category",
      field: "category",
    },
    {
      label: "Note",
      field: "note",
    },
    {
      label: "Amount",
      field: "amount",
    },
  ];

  /*
   * Empty State
   */
  if (expenses.length === 0) {
    const hasNoExpenses = totalExpenses === 0;

    return (
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm

          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {hasNoExpenses ? (
          <EmptyState
            icon={ReceiptText}
            title="No expenses yet"
            description="Start tracking your spending by adding your first expense."
            actionLabel="Add Expense"
            onAction={onAddExpense}
          />
        ) : (
          <EmptyState
            icon={SearchX}
            title="No matching expenses"
            description={
              hasActiveFilters
                ? "Try changing your search or category filters."
                : "No expenses found."
            }
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr
              className="
                border-b border-slate-200
                bg-slate-50

                dark:border-slate-800
                dark:bg-slate-800/70
              "
            >
              {headers.map((header) => (
                <th key={header.field} className="px-6 py-4 text-left">
                  <button
                    type="button"
                    onClick={() => onSort(header.field)}
                    className="
                      flex items-center gap-2
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-500
                      transition

                      hover:text-slate-900

                      dark:text-slate-400
                      dark:hover:text-slate-100
                    "
                  >
                    {header.label}

                    {getSortIcon(header.field)}
                  </button>
                </th>
              ))}

              <th
                className="
                  px-6 py-4
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody
            className="
              divide-y divide-slate-100

              dark:divide-slate-800
            "
          >
            {expenses.map((expense) => {
              const Icon = getCategoryIcon(expense.category);

              return (
                <tr
                  key={expense.id}
                  className="
                    transition
                    hover:bg-slate-50

                    dark:hover:bg-slate-800/60
                  "
                >
                  {/* Date */}
                  <td
                    className="
                      whitespace-nowrap
                      px-6 py-4
                      text-sm
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    {formatDate(expense.date)}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-9 w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-100
                          text-slate-600

                          dark:bg-slate-800
                          dark:text-slate-300
                        "
                      >
                        {Icon && <Icon size={16} />}
                      </div>

                      <span
                        className="
                          text-sm
                          font-medium
                          text-slate-700

                          dark:text-slate-200
                        "
                      >
                        {expense.category}
                      </span>
                    </div>
                  </td>

                  {/* Note */}
                  <td
                    className="
                      min-w-56
                      px-6 py-4
                      text-sm
                      text-slate-700

                      dark:text-slate-300
                    "
                  >
                    {expense.note}
                  </td>

                  {/* Amount */}
                  <td
                    className="
                      whitespace-nowrap
                      px-6 py-4
                      text-sm
                      font-semibold
                      text-slate-900

                      dark:text-slate-100
                    "
                  >
                    {formatCurrency(expense.amount)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(expense)}
                        className="
                          flex h-9 w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-500
                          transition

                          hover:bg-slate-100
                          hover:text-slate-900

                          dark:text-slate-400
                          dark:hover:bg-slate-800
                          dark:hover:text-slate-100
                        "
                        title="Edit expense"
                        aria-label={`Edit ${expense.note}`}
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(expense.id)}
                        className="
                          flex h-9 w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-500
                          transition

                          hover:bg-red-50
                          hover:text-red-600

                          dark:text-slate-400
                          dark:hover:bg-red-500/10
                          dark:hover:text-red-400
                        "
                        title="Delete expense"
                        aria-label={`Delete ${expense.note}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
