import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ConfirmModal from "../components/common/ConfirmModal";
import PageLayout from "../components/layout/PageLayout";
import IncomeSettings from "../components/settings/IncomeSettings";
import CategorySettings from "../components/settings/CategorySettings";
import DataManagement from "../components/settings/DataManagement";
import MultiUserSettings from "../components/settings/MultiUserSettings";
import { expenseCategories } from "../data/intialData";
import { toast } from "react-toastify";
import { setMonthlyIncome, clearExpenses } from "../store/expenseSlice";
import { exportExpensesToPDF } from "../utils/exportCSV";

function Settings() {
  const { expenses = [], monthlyIncome = 0 } = useSelector(
    (state) => state.expenses || {},
  );

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const dispatch = useDispatch();

  // --------------------------------
  // Save monthly income
  // --------------------------------

  const handleSaveIncome = (income) => {
    dispatch(setMonthlyIncome(income));

    toast.success("Monthly income updated successfully");
  };

  // --------------------------------
  // Clear expenses
  // --------------------------------

  const handleClearExpenses = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearExpenses = () => {
    dispatch(clearExpenses());

    toast.success("All expenses cleared successfully");

    setIsClearModalOpen(false);
  };

  // --------------------------------
  // Export expenses
  // --------------------------------

  const handleExport = () => {
    if (!expenses.length) {
      toast.info("There are no expenses to export.");

      return;
    }

    // Pass BOTH expenses and monthly income
    exportExpensesToPDF(expenses, monthlyIncome);

    toast.success("Expenses exported as PDF successfully");
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50 p-5 transition-colors duration-300 sm:p-8 dark:bg-slate-950">
        {/* Header */}

        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Customize your tracker
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your income, categories, and expense data.
          </p>
        </div>

        {/* Settings Sections */}

        <div className="mt-8 space-y-6">
          <IncomeSettings
            monthlyIncome={monthlyIncome}
            onSave={handleSaveIncome}
          />

          <CategorySettings categories={expenseCategories} />

          <DataManagement
            expenses={expenses}
            onExport={handleExport}
            onClear={handleClearExpenses}
          />

          <MultiUserSettings />
        </div>

        {/* Clear Confirmation Modal */}

        <ConfirmModal
          isOpen={isClearModalOpen}
          onClose={() => setIsClearModalOpen(false)}
          onConfirm={confirmClearExpenses}
          title="Clear All Expenses?"
          message="This will permanently delete all your expense records. This action cannot be undone."
          confirmText="Clear Everything"
        />
      </div>
    </PageLayout>
  );
}

export default Settings;
