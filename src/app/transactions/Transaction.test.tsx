import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Transaction from "./page";
import { TransactionProps } from "../../interfaces";

// Create a mock store with a reducer
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

// Create a mock store with a reducer
const store = configureStore({
  reducer: {
    transactions: (state = { transactions: [], status: "idle", error: null }) =>
      state,
  },
});

describe("Transaction Component", () => {
  it("renders loading state", () => {
    store.dispatch({
      type: "transactions/setStatus",
      payload: "loading",
    });

    render(
      <Provider store={store}>
        <Transaction />
      </Provider>
    );
  });

  it("renders transactions when data is available", () => {
    store.dispatch({
      type: "transactions/setTransactions",
      payload: mockTransactions,
    });
    store.dispatch({
      type: "transactions/setStatus",
      payload: "succeeded",
    });

    render(
      <Provider store={store}>
        <Transaction />
      </Provider>
    );
    expect(screen.getByText("Transfer")).toBeInTheDocument();
    expect(screen.getByText("Withdrawal")).toBeInTheDocument();
  });

  it("renders error state", () => {
    store.dispatch({
      type: "transactions/setStatus",
      payload: "failed",
    });
    store.dispatch({
      type: "transactions/setError",
      payload: "Failed to fetch transactions",
    });

    render(
      <Provider store={store}>
        <Transaction />
      </Provider>
    );
  });
});
