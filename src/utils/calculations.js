export const getTotalSpent = (expenses = []) => {
  return expenses.reduce((total, expense) => {
    return total + Number(expense.amount || 0);
  }, 0);
};

export const getRemainingBalance = (income = 0, expenses = []) => {
  const totalSpent = getTotalSpent(expenses);

  return Number(income || 0) - totalSpent;
};

export const getSpendingPercentage = (income = 0, expenses = []) => {
  const numericIncome = Number(income || 0);

  if (numericIncome <= 0) {
    return 0;
  }

  const totalSpent = getTotalSpent(expenses);

  return Math.min((totalSpent / numericIncome) * 100, 100);
};

export const getTopCategory = (expenses = []) => {
  if (!expenses.length) {
    return {
      category: "No expenses",
      amount: 0,
    };
  }

  const categoryTotals = expenses.reduce((accumulator, expense) => {
    const category = expense.category;

    accumulator[category] =
      (accumulator[category] || 0) + Number(expense.amount || 0);

    return accumulator;
  }, {});

  const [category, amount] = Object.entries(categoryTotals).reduce(
    (highest, current) => {
      return current[1] > highest[1] ? current : highest;
    },
  );

  return {
    category,
    amount,
  };
};

export const getDailyAverage = (expenses = []) => {
  if (!expenses.length) {
    return 0;
  }

  const uniqueDates = [...new Set(expenses.map((expense) => expense.date))];

  const totalSpent = getTotalSpent(expenses);

  return totalSpent / uniqueDates.length;
};

/*
 * Format amount as Indian Rupees
 *
 * Example:
 * ₹48.50
 * ₹1,450.00
 */
export const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
};

export const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};
