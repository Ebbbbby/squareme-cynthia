import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import barChartReducer, {
  fetchBarChartData,
} from "@/redux/features/dashboard/barChartSlice";
import BarChart from "./barchart";
import { jest } from "@jest/globals";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const setupStore = (preloadedState: any) =>
  configureStore({
    reducer: { barChart: barChartReducer },
    preloadedState: {
      barChart: {
        data: {
          labels: ["Jan", "Feb", "Mar"],
          datasets: [{ data: [10, 20, 30] }],
        },
        status: "succeeded",
        error: null,
        ...preloadedState?.barChart,
      },
    },
  });

jest.mock("react-chartjs-2", () => ({
  Bar: () => <div data-testid="mock-bar-chart" />,
}));

describe("BarChart Component", () => {
  test("renders loading state initially", () => {
    const store = setupStore({
      barChart: { data: {}, status: "loading", error: null },
    });

    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message on failed API call", () => {
    const store = setupStore({
      barChart: { data: {}, status: "failed", error: "Failed to fetch" },
    });

    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );

    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  test("renders bar chart when data is available", async () => {
    const mockData = {
      labels: ["Jan", "Feb", "Mar"],
      datasets: [
        { label: "Revenue", data: [200, 300, 400], backgroundColor: "blue" },
      ],
    };

    const store = setupStore({
      barChart: { data: mockData, status: "succeeded", error: null },
    });

    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("mock-bar-chart")).toBeInTheDocument();
    });
  });

  test("dispatches fetchBarChartData on mount when status is idle", async () => {
    const store = setupStore({
      barChart: { data: {}, status: "idle", error: null },
    });
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(fetchBarChartData());
    });
  });
});
