import { Download, Trash2, Database } from "lucide-react";

function DataManagement({ expenses = [], onExport, onClear }) {
  const hasExpenses = expenses.length > 0;

  const handleClear = () => {
    if (!hasExpenses) {
      return;
    }

    onClear();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 dark:bg-blue-500/10 dark:text-blue-400">
          <Database size={21} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Data Management
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Export or permanently remove your expense data.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Export */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">
                Export Expenses
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Download all{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {expenses.length}
                </span>{" "}
                {expenses.length === 1 ? "expense" : "expenses"} as a CSV file.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Download size={19} />
            </div>
          </div>

          <button
            onClick={onExport}
            disabled={!hasExpenses}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              duration-200
              hover:bg-slate-50
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:bg-slate-700
            "
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        {/* Clear */}
        <div className="rounded-xl border border-red-100 bg-red-50/40 p-5 transition-colors duration-300 dark:border-red-500/20 dark:bg-red-500/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-red-700 dark:text-red-400">
                Clear All Expenses
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Permanently delete all expense records. This action cannot be
                undone.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <Trash2 size={19} />
            </div>
          </div>

          <button
            onClick={handleClear}
            disabled={!hasExpenses}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              duration-200
              hover:bg-red-700
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-red-500
              dark:hover:bg-red-600
            "
          >
            <Trash2 size={17} />
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataManagement;
