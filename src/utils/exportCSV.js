import jsPDF from "jspdf";

export const exportExpensesToPDF = (expenses = [], monthlyIncome = 0) => {
  if (!expenses.length) {
    alert("There are no expenses to export.");
    return;
  }

  const pdf = new jsPDF();

  // --------------------------------
  // Basic calculations
  // --------------------------------

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  const numericIncome = Number(monthlyIncome || 0);

  const remainingAmount = numericIncome - totalExpenses;

  const averageExpense = totalExpenses / expenses.length;

  // --------------------------------
  // Formatting helpers
  // --------------------------------

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));

    return `INR ${formattedAmount}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  // --------------------------------
  // PDF Header
  // --------------------------------

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(15, 23, 42);

  pdf.text("SPENDLY", 20, 22);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(100, 116, 139);

  pdf.text("Expense Report", 20, 30);

  // Export date
  pdf.setFontSize(9);

  const exportDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  pdf.text(`Generated on: ${exportDate}`, 190, 22, {
    align: "right",
  });

  // --------------------------------
  // Header divider
  // --------------------------------

  pdf.setDrawColor(226, 232, 240);

  pdf.line(20, 37, 190, 37);

  // --------------------------------
  // Expense Summary
  // --------------------------------

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(15, 23, 42);

  pdf.text("Expense Summary", 20, 50);

  // --------------------------------
  // Summary boxes
  // --------------------------------

  const summaryY = 57;

  const boxWidth = 40;
  const boxHeight = 25;

  const summaryBoxes = [
    {
      x: 20,
      label: "Monthly Income",
      value: formatCurrency(numericIncome),
    },
    {
      x: 63,
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
    },
    {
      x: 106,
      label: "Remaining",
      value: formatCurrency(remainingAmount),
    },
    {
      x: 149,
      label: "Transactions",
      value: String(expenses.length),
    },
  ];

  summaryBoxes.forEach(({ x, label, value }) => {
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(226, 232, 240);

    pdf.roundedRect(x, summaryY, boxWidth, boxHeight, 3, 3, "FD");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);

    pdf.text(label, x + 4, summaryY + 8);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(15, 23, 42);

    pdf.text(value, x + 4, summaryY + 18);
  });

  // --------------------------------
  // Average Expense
  // --------------------------------

  let currentY = 95;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(100, 116, 139);

  pdf.text(`Average expense: ${formatCurrency(averageExpense)}`, 20, currentY);

  // --------------------------------
  // Expense table
  // --------------------------------

  currentY += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(15, 23, 42);

  pdf.text("Expense Details", 20, currentY);

  currentY += 8;

  const tableX = 20;
  const tableWidth = 170;

  const columns = [
    {
      title: "Date",
      x: 20,
      width: 32,
    },
    {
      title: "Category",
      x: 52,
      width: 35,
    },
    {
      title: "Description",
      x: 87,
      width: 58,
    },
    {
      title: "Amount",
      x: 145,
      width: 45,
    },
  ];

  // --------------------------------
  // Table header
  // --------------------------------

  const drawTableHeader = () => {
    pdf.setFillColor(15, 23, 42);

    pdf.rect(tableX, currentY, tableWidth, 10, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);

    columns.forEach((column) => {
      pdf.text(column.title, column.x + 3, currentY + 6.5);
    });

    currentY += 10;
  };

  drawTableHeader();

  // --------------------------------
  // Table rows
  // --------------------------------

  expenses.forEach((expense, index) => {
    // Create new page when required
    if (currentY > 275) {
      pdf.addPage();

      currentY = 20;

      pdf.setFont("helvetica", "bold");

      pdf.setFontSize(16);

      pdf.setTextColor(15, 23, 42);

      pdf.text("SPENDLY - Expense Report", 20, currentY);

      currentY += 10;

      drawTableHeader();
    }

    const rowHeight = 10;

    // Alternate row background
    if (index % 2 === 0) {
      pdf.setFillColor(248, 250, 252);

      pdf.rect(tableX, currentY, tableWidth, rowHeight, "F");
    }

    pdf.setDrawColor(226, 232, 240);

    pdf.line(
      tableX,
      currentY + rowHeight,
      tableX + tableWidth,
      currentY + rowHeight,
    );

    pdf.setFont("helvetica", "normal");

    pdf.setFontSize(8);

    pdf.setTextColor(51, 65, 85);

    // Date
    pdf.text(formatDate(expense.date), columns[0].x + 3, currentY + 6.5);

    // Category
    const category = String(expense.category || "Other");

    pdf.text(category.substring(0, 18), columns[1].x + 3, currentY + 6.5);

    // Description
    const description = String(expense.note || "-");

    pdf.text(description.substring(0, 32), columns[2].x + 3, currentY + 6.5);

    // Amount
    pdf.setFont("helvetica", "bold");

    pdf.text(formatCurrency(expense.amount), columns[3].x + 3, currentY + 6.5);

    currentY += rowHeight;
  });

  // --------------------------------
  // Final Summary
  // --------------------------------

  if (currentY > 250) {
    pdf.addPage();

    currentY = 25;
  }

  currentY += 10;

  pdf.setDrawColor(203, 213, 225);

  pdf.line(110, currentY, 190, currentY);

  currentY += 10;

  // Total Expenses
  pdf.setFont("helvetica", "normal");

  pdf.setFontSize(10);

  pdf.setTextColor(100, 116, 139);

  pdf.text("Total Expenses", 110, currentY);

  pdf.setFont("helvetica", "bold");

  pdf.setTextColor(15, 23, 42);

  pdf.text(formatCurrency(totalExpenses), 190, currentY, {
    align: "right",
  });

  currentY += 10;

  // Remaining Amount
  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(12);

  pdf.setTextColor(15, 23, 42);

  pdf.text("Remaining Amount", 110, currentY);

  pdf.text(formatCurrency(remainingAmount), 190, currentY, {
    align: "right",
  });

  // --------------------------------
  // Footer
  // --------------------------------

  const pageCount = pdf.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    pdf.setPage(page);

    pdf.setFont("helvetica", "normal");

    pdf.setFontSize(8);

    pdf.setTextColor(148, 163, 184);

    pdf.text("Generated by Spendly", 20, 290);

    pdf.text(`Page ${page} of ${pageCount}`, 190, 290, {
      align: "right",
    });
  }

  // --------------------------------
  // Download PDF
  // --------------------------------

  const fileDate = new Date().toISOString().split("T")[0];

  pdf.save(`spendly-expenses-${fileDate}.pdf`);
};
