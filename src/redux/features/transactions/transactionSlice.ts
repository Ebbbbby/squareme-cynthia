import { TransactionProps } from "@/interfaces";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mockApiService } from "../../../services/TransactionApi/MockTransactionApi";
export interface TransactionsState {
  transactions: TransactionProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    return await mockApiService.getTransactions();
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<TransactionProps[]>) => {
          state.status = "succeeded";
          state.transactions = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

export default transactionSlice.reducer;
