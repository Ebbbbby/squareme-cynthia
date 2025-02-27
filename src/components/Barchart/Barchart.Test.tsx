import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { jest } from "@jest/globals";
import BarChart from "./barChart";
import barChartReducer, {
  BarChartState,
} from "@/redux/features/dashboard/barChartSlice";

interface RootState {
  barChart: BarChartState;
}

jest.mock("react-chartjs-2", () => ({
  Bar: () => <canvas data-testid="bar-chart" />,
}));

jest.mock("chart.js", () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
}));

const setupStore = (preloadedState: RootState) =>
  configureStore({
    reducer: {
      barChart: barChartReducer,
    },
    preloadedState,
  });

describe("BarChart Component", () => {
  test("renders loading state initially", () => {
    const store = setupStore({
      barChart: {
        data: { labels: [], datasets: [] },
        status: "loading",
        error: null,
      },
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
      barChart: {
        data: { labels: [], datasets: [] },
        status: "failed",
        error: "Failed to fetch",
      },
    });

    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  test("renders bar chart when data is available", async () => {
    const mockData = {
      labels: ["Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Revenue",
          data: [200, 300, 400],
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 1,
          barThickness: 20,
        },
      ],
    };

    const store = setupStore({
      barChart: {
        data: mockData,
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });
  });

  test("dispatches fetchBarChartData on mount when status is idle", async () => {
    const store = setupStore({
      barChart: {
        data: { labels: [], datasets: [] },
        status: "idle",
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );
  });
});
