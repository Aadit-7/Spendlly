import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

import PageLayout from "../components/layout/PageLayout";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import ConfirmModal from "../components/common/ConfirmModal";

import { expenseCategories } from "../data/intialData";

import {
  addExpense,
  updateExpense,
  deleteExpense,
} from "../store/expenseSlice";

function Expenses() {
  // Safely get the expenses state
  const expenseState = useSelector((state) => state.expenses);

  // Make sure expenses is ALWAYS an array
  const expenses = Array.isArray(expenseState?.expenses)
    ? expenseState.expenses
    : [];

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const [editingExpense, setEditingExpense] = useState(null);

  const [sortField, setSortField] = useState("date");

  const [sortDirection, setSortDirection] = useState("desc");

  // Filter and sort expenses
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (expense) => expense.category === selectedCategory,
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((expense) => {
        const note = expense.note?.toLowerCase() || "";

        const category = expense.category?.toLowerCase() || "";

        return note.includes(query) || category.includes(query);
      });
    }

    // Sorting
    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      // Amount sorting
      if (sortField === "amount") {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;
      }

      // Date sorting
      if (sortField === "date") {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      // Text sorting
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });

    return result;
  }, [expenses, searchQuery, selectedCategory, sortField, sortDirection]);

  // Handle table sorting
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection((previousDirection) =>
        previousDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Open add expense modal
  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  // Open edit expense modal
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  // Open delete confirmation
  const handleDeleteExpense = (id) => {
    setExpenseToDelete(id);
  };

  // Confirm delete
  const confirmDeleteExpense = () => {
    if (expenseToDelete === null) return;

    dispatch(deleteExpense(expenseToDelete));

    toast.success("Expense deleted successfully");

    setExpenseToDelete(null);
  };

  // Add or update expense
  const handleSubmit = (formData) => {
    if (editingExpense) {
      dispatch(
        updateExpense({
          ...formData,
          id: editingExpense.id,
        }),
      );

      toast.success("Expense updated successfully");
    } else {
      dispatch(
        addExpense({
          ...formData,
          id: Date.now(),
        }),
      );

      toast.success("Expense added successfully");
    }

    setIsModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <PageLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Manage your spending
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Expense Management
            </h1>

            <p className="mt-2 text-slate-500">
              View, add, edit and organize all your expenses.
            </p>
          </div>

          <button
            onClick={handleAddExpense}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus size={19} />
            Add Expense
          </button>
        </div>

        {/* Filters */}
        <div className="mt-8">
          <ExpenseFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={expenseCategories}
          />
        </div>

        {/* Results */}
        <div className="mt-6">
          <ExpenseTable
            expenses={filteredExpenses}
            totalExpenses={expenses.length}
            hasActiveFilters={
              searchQuery.trim() !== "" || selectedCategory !== "All"
            }
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            onAddExpense={handleAddExpense}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>

        {/* Add / Edit Modal */}
        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingExpense(null);
          }}
          onSubmit={handleSubmit}
          editingExpense={editingExpense}
          categories={expenseCategories}
        />

        {/* Delete Confirmation */}
        <ConfirmModal
          isOpen={Boolean(expenseToDelete)}
          onClose={() => setExpenseToDelete(null)}
          onConfirm={confirmDeleteExpense}
          title="Delete Expense?"
          message="Are you sure you want to delete this expense? This action cannot be undone."
          confirmText="Delete Expense"
        />
      </div>
    </PageLayout>
  );
}

export default Expenses;
