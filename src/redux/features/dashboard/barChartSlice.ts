import { DashboardChartProps } from "@/interfaces";
import { mockApiService } from "@/services/DashboardApi/DashboardChartApi";
import { createSlice, createAsyncThunk,  } from "@reduxjs/toolkit";

export interface BarChartState {
  data: DashboardChartProps;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BarChartState = {
  data: {
    labels: [],
    datasets: [],
  },
  status: 'idle',
  error: null,
};

export const fetchBarChartData = createAsyncThunk(
  'barChart/fetchBarChartData',
  async () => {
    const response = await mockApiService.getBarChartData();
    return response;
  }
);

const barChartSlice = createSlice({
  name: 'barChart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBarChartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBarChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBarChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch bar chart data';
      });
  },
});

export default barChartSlice.reducer;