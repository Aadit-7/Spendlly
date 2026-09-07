export const exportExpensesToCSV = (expenses) => {
  if (!expenses.length) {
    alert("There are no expenses to export.");
    return;
  }

  const headers = [
    "Date",
    "Category",
    "Description",
    "Amount",
  ];

  const rows = expenses.map((expense) => [
    expense.date,
    expense.category,
    expense.note,
    expense.amount,
  ]);

  const escapeCSVValue = (value) => {
    const stringValue = String(value);

    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.map(escapeCSVValue).join(",")
    )
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    `expenses-${new Date()
      .toISOString()
      .split("T")[0]}.csv`
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};