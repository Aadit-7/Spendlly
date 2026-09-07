import { AlertTriangle, X } from "lucide-react";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = true,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[60]
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          transition-colors
          duration-300
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                isDanger
                  ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <AlertTriangle size={22} />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {message}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              ml-3
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-lg
              text-slate-400
              transition
              duration-200
              hover:bg-slate-100
              hover:text-slate-700
              dark:text-slate-500
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Actions */}
        <div
          className="
            mt-6
            flex justify-end gap-3
            border-t border-slate-100
            px-6 py-5
            transition-colors
            duration-300
            dark:border-slate-800
          "
        >
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="
              rounded-xl
              border border-slate-200
              bg-white
              px-5 py-2.5
              text-sm font-medium
              text-slate-700
              transition
              duration-200
              hover:bg-slate-50
              active:scale-[0.98]
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:bg-slate-700
            "
          >
            {cancelText}
          </button>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white transition duration-200 active:scale-[0.98] ${
              isDanger
                ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                : "bg-slate-900 hover:bg-slate-800 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
