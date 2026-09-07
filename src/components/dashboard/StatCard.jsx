function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${iconClassName}`}
          >
            <Icon size={21} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
