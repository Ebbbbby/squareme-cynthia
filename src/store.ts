import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./redux/features/transactions/transactionSlice";
import barChartReducer from "./redux/features/dashboard/barChartSlice";
import bankDetailsReducer from "./redux/features/dashboard/bankDetailsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    barChart: barChartReducer,
    bankDetails: bankDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
