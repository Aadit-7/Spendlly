import { Users, Sparkles } from "lucide-react";

function MultiUserSettings() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors duration-300 dark:bg-amber-500/10 dark:text-amber-400">
          <Users size={21} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Multi-User Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage expenses separately for different users.
          </p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-950/40">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-colors duration-300 dark:bg-slate-800 dark:text-slate-300 dark:shadow-none">
          <Sparkles size={20} />
        </div>

        <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">
          Coming Soon
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Multiple user profiles and separate expense tracking will be available
          in a future update.
        </p>
      </div>
    </div>
  );
}

export default MultiUserSettings;
