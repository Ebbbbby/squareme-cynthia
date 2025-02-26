import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BankDetailsProps } from "@/interfaces";
import { mockApiService } from "@/services/DashboardApi/BankDetailsApi";

interface BankDetailsState {
  data: BankDetailsProps | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BankDetailsState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchBankDetails = createAsyncThunk(
  "bankDetails/fetchBankDetails",
  async () => {
    const response = await mockApiService.getBankDetails();
    return response;
  }
);

const bankDetailsSlice = createSlice({
  name: "bankDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch bank details";
      });
  },
});

export default bankDetailsSlice.reducer;
