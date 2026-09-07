import { Search } from "lucide-react";

function ExpenseFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = [],
}) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-slate-400
            dark:text-slate-500
          "
        />

        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="
            w-full rounded-xl

            border border-slate-200
            bg-white

            py-3 pl-12 pr-4

            text-sm
            text-slate-900

            outline-none
            transition

            placeholder:text-slate-400

            focus:border-slate-400

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-100
            dark:placeholder:text-slate-500
            dark:focus:border-slate-500
          "
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {/* All Category */}
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          className={`
            rounded-full
            px-4 py-2
            text-sm font-medium
            transition

            ${
              selectedCategory === "All"
                ? `
                  bg-slate-900
                  text-white

                  hover:bg-slate-800

                  dark:bg-blue-600
                  dark:text-white
                  dark:hover:bg-blue-500
                `
                : `
                  border border-slate-200
                  bg-white
                  text-slate-600

                  hover:bg-slate-50

                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                `
            }
          `}
        >
          All
        </button>

        {/* Expense Categories */}
        {categories.map((category) => (
          <button
            type="button"
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`
              rounded-full
              px-4 py-2
              text-sm font-medium
              transition

              ${
                selectedCategory === category.name
                  ? `
                    bg-slate-900
                    text-white

                    hover:bg-slate-800

                    dark:bg-blue-600
                    dark:text-white
                    dark:hover:bg-blue-500
                  `
                  : `
                    border border-slate-200
                    bg-white
                    text-slate-600

                    hover:bg-slate-50

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-slate-300
                    dark:hover:bg-slate-800
                  `
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExpenseFilters;
