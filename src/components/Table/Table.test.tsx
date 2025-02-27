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
  "Transaction Id",
  "Transaction Type",
  "Transaction Date",
  "Time",
  "Status",
];

const mockRenderRow = (
  item: Transaction,
  // index: number,
  // isSelected: boolean
) => (
  <>
    <td className="px-6 py-4">{item.amount}</td>
    <td className="px-6 py-4">{item.transactionId}</td>
    <td className="px-6 py-4">{item.transactionType}</td>
    <td className="px-6 py-4">{item.transactionDate}</td>
    <td className="px-6 py-4">{item.time}</td>
    <td className={
      `px-6 py-4 font-semibold rounded-lg ${
        item.status === "Processed" ? "bg-[#EFFDED] text-[#144909]" : "bg-[#FEECEE] text-[#740613]"
      }`
    }>
      {item.status}
    </td>
  </>
);

describe("Table Component", () => {
  test("renders the table with headers and data", () => {
    render(
      <Table<Transaction> headers={mockHeaders} data={mockData} renderRow={mockRenderRow} />
    );

    mockHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    mockData.forEach(item => {
      expect(screen.getByText(item.amount)).toBeInTheDocument();
      expect(screen.getByText(item.transactionType)).toBeInTheDocument();
      expect(screen.getByText(item.transactionDate)).toBeInTheDocument();
      expect(screen.getByText(item.status)).toBeInTheDocument();
    });
  });

  test("handles row selection", () => {
    const handleSelectRow = jest.fn();
    render(
      <Table<Transaction>
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
        onSelectRow={handleSelectRow}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Select first row
    expect(handleSelectRow).toHaveBeenCalledWith(mockData[0], true);

    fireEvent.click(checkboxes[1]); // Unselect first row
    expect(handleSelectRow).toHaveBeenCalledWith(mockData[0], false);
  });

  test("handles 'Select All' functionality", () => {
    const handleSelectAll = jest.fn();
    render(
      <Table<Transaction>
        headers={mockHeaders}
        data={mockData}
        renderRow={mockRenderRow}
        onSelectAll={handleSelectAll}
      />
    );

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(selectAllCheckbox);
    expect(handleSelectAll).toHaveBeenCalledWith(true);

    fireEvent.click(selectAllCheckbox);
    expect(handleSelectAll).toHaveBeenCalledWith(false);
  });

  test("applies correct styles for status", () => {
    render(<Table<Transaction> headers={mockHeaders} data={mockData} renderRow={mockRenderRow} />);

    const processedStatus = screen.getByText((content) => content.includes("Processed"));
    expect(processedStatus).toHaveClass("bg-[#EFFDED]");
    expect(processedStatus).toHaveClass("text-[#144909]");

    const failedStatus = screen.getByText((content) => content.includes("Failed"));
    expect(failedStatus).toHaveClass("bg-[#FEECEE]");
    expect(failedStatus).toHaveClass("text-[#740613]");
  });
});
