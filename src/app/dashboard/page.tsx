"use client";
import BarChart from "@/components/Barchart/barChart";
import { useHeader } from "@/contexts/HeaderContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchBankDetails } from "@/redux/features/dashboard/bankDetailsSlice";
import React, { useEffect } from "react";
import { TbCopy } from "react-icons/tb";

const Dashboard = () => {
  const { setIsHeaderVisible } = useHeader();
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.bankDetails);

  useEffect(() => {
    setIsHeaderVisible(true);
  }, [setIsHeaderVisible]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBankDetails());
    }
  }, [status, dispatch]);
  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  return (
    <div className="w-full py-4 p-3 lg:w-[80.5%] border ml-auto lg:py-7 px-6">
      <div className="border-b border-[#E4E4E7] mb-6 w-full lg:mb-10">
        <div className="inline-block">
          <p className="text-[16px] font-semibold text-center">
            Online Payments
          </p>
          <div className="border-b-2 border-blue-500 h-4 w-36"></div>
        </div>
      </div>
      <div className=" w-full border border-[#E4E4E7] lg:w-[325px] h-[115px] bg-white rounded-md py-4 px-6">
        {data && (
          <div className="">
            <p className="text-[11px] font-medium uppercase text-[#8F8E8E] leading-6">
              Account Details
            </p>
            <p className="text-[11px] font-medium text-black uppercase  leading-6">
              {data?.bankName}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-[20px] font-semibold text-black  leading-6">
                {data?.accountNumber}
              </p>
              <div className="flex gap-2 text-[#9F56D4] bg-[#9F56D433] rounded-lg p-2">
                <TbCopy className=" text-[#9F56D4]" />
                <span className="text-xs  text-[#9F56D4]">Copy</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 border border-[#E4E4E7] lg:mt-10 lg:p-6 rounded-md">
        <div className="hidden lg:flex justify-between w-full">
          <div className="flex justify-center items-center gap-x-4">
            <p className="text-sm text-[#71717A]">Showing data for </p>
            <form>
              <select
                name="period"
                id="period"
                className="p-2 pr-8 rounded-md text-sm text-[#71717A] border border-[#DADAE7]"
              >
                <option value="daily">Last 7 Days</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </form>
          </div>
          <div className="flex gap-x-4 text-sm items-center justify-center cursor-pointer">
            <p className="p-2">Today</p>
            <p className="bg-[#00C6FB0F] p-2 px-3 rounded-lg">Last 7 days</p>
            <p className=" p-2">Last 30 days</p>
          </div>
        </div>
        <div className="border border-[#E4E4E7] w-full p-0 lg:border rounded-md bg-white lg:mt-8 lg:p-6 ">
          <div className="flex justify-between p-4 items-center lg:justify-normal lg:p-0 gap-x-2">
            <p className=" text-[17px]p-2 text-[#424242] lg:text-sm font-bold">
              Revenue
            </p>
            <p className=" hidden lg:block text-sm text-[#6DC27F]">
              +0.00% <span className="text-black text-sm"> vs Last 7 days</span>
            </p>
            <form className=" lg:hidden">
              <select
                name="period"
                id="period"
                className="p-2 pr-8 rounded-full text-center text-sm text-[#71717A] border border-[#DADAE7]"
              >
                <option value="daily">Weekly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </form>
          </div>
          <div className="flex items-center justify-between ">
            <div className=" hidden lg:flex items-center gap-x-2 ">
              <p className=" text-[28px] font-bold">$0.00</p>
              <span className="text-xs">in total value</span>
            </div>
          </div>
          <div className="h-full ">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
