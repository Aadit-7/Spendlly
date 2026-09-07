import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  editingExpense,
  categories = [],
}) {
  const getInitialFormData = () => ({
    date: new Date().toISOString().split("T")[0],
    category: categories[0]?.name || "",
    note: "",
    amount: "",
  });

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    if (!isOpen) return;

    if (editingExpense) {
      setFormData({
        date: editingExpense.date || "",
        category: editingExpense.category || "",
        note: editingExpense.note || "",
        amount: editingExpense.amount ?? "",
      });
    } else {
      setFormData(getInitialFormData());
    }
  }, [editingExpense, isOpen, categories]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(formData.amount);

    if (
      !formData.date ||
      !formData.category ||
      !formData.note.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return;
    }

    onSubmit({
      ...formData,
      note: formData.note.trim(),
      amount,
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-slate-950/50 p-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-modal-title"
    >
      <div
        className="
          w-full max-w-lg rounded-2xl
          bg-white shadow-2xl
          dark:bg-slate-900
          dark:shadow-black/40
          transition-colors duration-300
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-100
            px-6 py-5
            dark:border-slate-800
          "
        >
          <div>
            <h2
              id="expense-modal-title"
              className="
                text-xl font-semibold text-slate-900
                dark:text-slate-100
              "
            >
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>

            <p
              className="
                mt-1 text-sm text-slate-500
                dark:text-slate-400
              "
            >
              {editingExpense
                ? "Update your expense details."
                : "Add a new expense to your tracker."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900

              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Date */}
          <div>
            <label
              htmlFor="expense-date"
              className="
                mb-2 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Date
            </label>

            <input
              id="expense-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="
                w-full rounded-xl
                border border-slate-200
                bg-white
                px-4 py-3
                text-sm text-slate-900
                outline-none
                transition

                focus:border-slate-400

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:focus:border-slate-500
              "
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="expense-category"
              className="
                mb-2 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Category
            </label>

            <select
              id="expense-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="
                w-full rounded-xl
                border border-slate-200
                bg-white
                px-4 py-3
                text-sm text-slate-900
                outline-none
                transition

                focus:border-slate-400

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:focus:border-slate-500
              "
            >
              {categories.length === 0 ? (
                <option value="">No categories available</option>
              ) : (
                categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="expense-note"
              className="
                mb-2 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Description
            </label>

            <textarea
              id="expense-note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              required
              placeholder="What was this expense for?"
              className="
                w-full resize-none rounded-xl
                border border-slate-200
                bg-white
                px-4 py-3
                text-sm text-slate-900
                outline-none
                transition

                placeholder:text-slate-400
                focus:border-slate-400

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="expense-amount"
              className="
                mb-2 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Amount
            </label>

            <input
              id="expense-amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              placeholder="0.00"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-white
                px-4 py-3
                text-sm text-slate-900
                outline-none
                transition

                placeholder:text-slate-400
                focus:border-slate-400

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-medium
                text-slate-700
                transition

                hover:bg-slate-50

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-300
                dark:hover:bg-slate-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={categories.length === 0}
              className="
                rounded-xl
                bg-slate-900
                px-5 py-3
                text-sm font-medium
                text-white
                transition

                hover:bg-slate-800

                dark:bg-blue-600
                dark:hover:bg-blue-500

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {editingExpense ? "Save Changes" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;
