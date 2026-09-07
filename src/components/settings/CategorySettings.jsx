import { Tag } from "lucide-react";

function CategorySettings({ categories = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors duration-300 dark:bg-purple-500/10 dark:text-purple-400">
          <Tag size={21} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Expense Categories
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Categories currently available for your expenses.
          </p>
        </div>
      </div>

      {/* Categories */}
      {categories.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-950/50">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            No categories available
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
            Expense categories will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-100
                bg-white
                p-4
                transition-all
                duration-200
                hover:border-slate-200
                hover:bg-slate-50
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-slate-700
                dark:hover:bg-slate-800/70
              "
            >
              {/* Category Color */}
              <div
                className="h-3 w-3 shrink-0 rounded-full shadow-sm"
                style={{
                  backgroundColor: category.color,
                }}
              />

              {/* Category Information */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                  {category.name}
                </p>

                {category.description && (
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySettings;
