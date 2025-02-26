import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./table";
type Transaction = {
  id: string;
  amount: string;
  transactionId: string;
  transactionType: string;
  transactionDate: string;
  time: string;
  status: string;
};

const mockData: Transaction[] = [
  {
    id: "1",
    amount: "₦3,644",
    transactionId: "TR_8401857902",
    transactionType: "Transfer",
    transactionDate: "Feb 12, 2025",
    time: "10:30AM",
    status: "Processed",
  },
  {
    id: "2",
    amount: "₦3,471",
    transactionId: "TR_8401857902",
    transactionType: "Withdrawal",
    transactionDate: "Jan 10, 2025",
    time: "10:30AM",
    status: "Failed",
  },
];

const mockHeaders = [
  "Amount",
  "Transaction Id ",
  "Transaction Type ",
  "Transaction Date",
  "Time",
  "Status",
];

const mockRenderRow = (
  item: Transaction
  // index: number,
  // isSelected: boolean
) => (
  <>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.amount}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.transactionId}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.transactionType}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.transactionDate}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {item.time}
    </td>
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm font-semibold rounded-lg ${
        item.status === "Processed"
          ? "bg-[#EFFDED] text-[#144909]"
          : "bg-[#FEECEE] text-[#740613]"
      }`}
    >
      {item.status}
    </td>
  </>
);

describe("Table Content", () => {
  it("renders the table with the correct data", () => {
    render(
      <Table<Transaction>
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
      />
    );

    mockHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });


    mockData.forEach((item) => {
      expect(screen.getByText(item.amount)).toBeInTheDocument();
      expect(screen.getByText(item.transactionId)).toBeInTheDocument();
      expect(screen.getByText(item.transactionType)).toBeInTheDocument();
      expect(screen.getByText(item.transactionDate)).toBeInTheDocument();
      expect(screen.getByText(item.time)).toBeInTheDocument();
      expect(screen.getByText(item.status)).toBeInTheDocument();
    });
  });

  const processedStatus = screen.getByText("Processed");
  expect(processedStatus).toHaveClass("bg-[#EFFDED]");
  expect(processedStatus).toHaveClass("text-[#144909]");

  const failedStatus = screen.getByText("Failed");
  expect(failedStatus).toHaveClass("bg-[#FEECEE]");
  expect(failedStatus).toHaveClass("text-[#740613]");
});

it("renders the correct table row structure", () => {
  render(
    <Table<Transaction>
      headers={mockHeaders}
      data={mockData}
      renderRow={mockRenderRow}
    />
  );

  // Check if each row has the correct structure
  mockData.forEach((user) => {
    const row = screen.getByText(user.amount).closest("tr");
    expect(row).toBeInTheDocument();

    // Check if all cells are rendered in the row
    expect(row).toHaveTextContent(user.amount);
    expect(row).toHaveTextContent(user.transactionId);
    expect(row).toHaveTextContent(user.transactionType);
    expect(row).toHaveTextContent(user.transactionDate);
    expect(row).toHaveTextContent(user.time);
    expect(row).toHaveTextContent(user.status);
  });
});

it("handles 'Select All' functionality", () => {
  const handleSelectAll = jest.fn();

  render(
    <Table
      headers={mockHeaders}
      data={mockData}
      renderRow={mockRenderRow}
      onSelectAll={handleSelectAll}
    />
  );

  const selectAllCheckbox = screen.getByRole("checkbox", {
    name: /select all/i,
  });
  fireEvent.click(selectAllCheckbox);

  // Check if "Select All" is called with `true`
  expect(handleSelectAll).toHaveBeenCalledWith(true);

  // Check if all rows are selected
  const rowCheckboxes = screen.getAllByRole("checkbox", {
    name: /select row/i,
  });
  rowCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
  });

  // Uncheck "Select All"
  fireEvent.click(selectAllCheckbox);

  // Check if "Select All" is called with `false`
  expect(handleSelectAll).toHaveBeenCalledWith(false);

  // Check if all rows are unselected
  rowCheckboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});

it("handles individual row selection", () => {
  const handleSelectRow = jest.fn();

  render(
    <Table
      headers={mockHeaders}
      data={mockData}
      renderRow={mockRenderRow}
      onSelectRow={handleSelectRow}
    />
  );

  const rowCheckboxes = screen.getAllByRole("checkbox", {
    name: /select row/i,
  });

  // Select the first row
  fireEvent.click(rowCheckboxes[0]);

  // Check if `onSelectRow` is called with the correct item and `true`
  expect(handleSelectRow).toHaveBeenCalledWith(mockData[0], true);

  // Unselect the first row
  fireEvent.click(rowCheckboxes[0]);

  // Check if `onSelectRow` is called with the correct item and `false`
  expect(handleSelectRow).toHaveBeenCalledWith(mockData[0], false);
});

it("applies the correct styles to selected rows", () => {
  render(
    <Table headers={mockHeaders} data={mockData} renderRow={mockRenderRow} />
  );

  const rowCheckboxes = screen.getAllByRole("checkbox", {
    name: /select row/i,
  });

  // Select the first row
  fireEvent.click(rowCheckboxes[0]);

  // Check if the first row has the selected style
  const firstRow = screen.getByText("₦3,644").closest("tr");
  expect(firstRow).toHaveClass("bg-blue-50");

  // Unselect the first row
  fireEvent.click(rowCheckboxes[0]);

  // Check if the first row no longer has the selected style
  expect(firstRow).not.toHaveClass("bg-blue-50");
});
