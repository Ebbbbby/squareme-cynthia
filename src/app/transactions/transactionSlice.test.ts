import "@testing-library/jest-dom";
import transactionReducer, {
  fetchTransactions,
  TransactionsState,
} from "../../redux/features/transactions/transactionSlice";
import { TransactionProps } from "../../interfaces";

jest.mock("../../services/TransactionApi/MockTransactionApi", () => ({
  mockApiService: {
    getTransactions: jest.fn(),
  },
}));

describe("transactionSlice", () => {
  const initialState: TransactionsState = {
    transactions: [],
    status: "idle",
    error: null,
  };
  it("should handle initial state", () => {
    expect(transactionReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle fetchTransactions.pending", () => {
    const action = fetchTransactions.pending("pending");
    const state = transactionReducer(initialState, action);
    expect(state.status).toEqual("loading");
  });

  it("should handle fetchTransactions.fulfilled", () => {
    const mockTransactions: TransactionProps[] = [
      {
        id: "1",
        amount: "₦3,644",
        transactionId: "TR_8401857902",
        transactionType: "Transfer",
        transactionDate: "Feb 12, 2025",
        time: "10:30AM",
        status: "Processed",
      },
    ];

    const action = fetchTransactions.fulfilled(mockTransactions, "fulfilled");
    const state = transactionReducer(initialState, action);

    expect(state.status).toEqual("succeeded");
    expect(state.transactions).toEqual(mockTransactions);
  });

  it("should handle fetchTransactions.rejected", () => {
    const error = new Error("Failed to fetch transactions");
    const action = fetchTransactions.rejected(error, "rejected");
    const state = transactionReducer(initialState, action);

    expect(state.status).toEqual("failed");
    expect(state.error).toEqual("Failed to fetch transactions");
  });
});
