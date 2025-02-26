"use client";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,

} from "chart.js";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchBarChartData } from "@/redux/features/dashboard/barChartSlice";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,

);

const BarChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.barChart);
   useEffect(() => {
     if (status === "idle") {
       dispatch(fetchBarChartData());
     }
   }, [status, dispatch]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };
  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  return (
    <div className="max-w-full  h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );

};

export default BarChart;
