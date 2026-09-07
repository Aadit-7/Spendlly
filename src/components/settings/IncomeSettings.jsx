import { useEffect, useState } from "react";
import { IndianRupee, Save } from "lucide-react";

function IncomeSettings({ monthlyIncome = 0, onSave }) {
  const [income, setIncome] = useState(monthlyIncome);

  useEffect(() => {
    setIncome(monthlyIncome ?? 0);
  }, [monthlyIncome]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (income === "" || Number(income) < 0) {
      return;
    }

    onSave(Number(income));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors duration-300 dark:bg-green-500/10 dark:text-green-400">
          <IndianRupee size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Monthly Income
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Set the amount you earn each month.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <IndianRupee
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            type="number"
            min="0"
            step="0.01"
            value={income}
            onChange={(event) => setIncome(event.target.value)}
            placeholder="Enter monthly income"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition-colors
              duration-200
              placeholder:text-slate-400
              focus:border-slate-400
              dark:border-slate-700
              dark:bg-slate-950
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
            "
          />
        </div>

        <button
          type="submit"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-900
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            duration-200
            hover:bg-slate-800
            active:scale-[0.98]
            dark:bg-blue-500
            dark:hover:bg-blue-600
          "
        >
          <Save size={18} />
          Save Income
        </button>
      </form>
    </div>
  );
}

export default IncomeSettings;
