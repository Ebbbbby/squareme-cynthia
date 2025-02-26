import { DashboardChartProps } from "@/interfaces";

const barChartData: DashboardChartProps = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Monthly Data",
      data: [ 300, 450, 350, 300, 150, 200, 150, 200, 150, 200, 250, 100],
      backgroundColor: "#FFC145",
      borderColor: "#FFC145",
      borderWidth: 1,
      barThickness: 20,
    },
  ],
};

export const mockApiService = {
  getBarChartData: async (): Promise<typeof barChartData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(barChartData);
      }, 500);
    });
  },
};