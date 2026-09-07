import { createSlice } from "@reduxjs/toolkit";
import { initialExpenses, initialMonthlyIncome } from "../data/intialData.js";

const initialState = {
  expenses: initialExpenses,
  monthlyIncome: initialMonthlyIncome,
};

const expenseSlice = createSlice({
  name: "expenses",

  initialState,

  reducers: {
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },

    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id,
      );

      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },

    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
    },

    clearExpenses: (state) => {
      state.expenses = [];
    },

    setMonthlyIncome: (state, action) => {
      state.monthlyIncome = Number(action.payload);
    },
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  clearExpenses,
  setMonthlyIncome,
} = expenseSlice.actions;

export default expenseSlice.reducer;
