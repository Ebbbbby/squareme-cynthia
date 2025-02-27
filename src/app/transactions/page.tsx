"use client";

import DateRangePicker from "@/components/DatePicker/DateRangePicker";
import Table from "@/components/Table/table";
import { useHeader } from "@/contexts/HeaderContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchTransactions } from "@/redux/features/transactions/transactionSlice";
import Pagination from "@/components/Pagination/pagination";

const Transaction = () => {
  const { setIsHeaderVisible } = useHeader();
  const dispatch = useAppDispatch();
  const totalPages = 20;
  const [currentPage] = useState(1);

  const { transactions, status, error } = useAppSelector(
    (state) => state.transactions
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsHeaderVisible]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  if (status === "loading") {
    return <div>Loading transactions...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const headers = [
    "Amount",
    "Transaction Id ",
    "Transaction Type ",
    "Transaction Date",
    "Time",
    "Status",
  ];

  return (
    <div className=" w-full p-4 border border-[#E4E4E7] lg:w-[80.5%] ml-auto">
      <div className="flex gap-x-5 items-center py-8 border-b border-[#E4E4E7] lg:hidden">
        <FaArrowLeft />
        <p className="text-sm font-bold">Transactions</p>
      </div>

      <div className="mb-3 py-3 lg:flex lg:py-4 lg:border-b border-[#E4E4E7]">
        <div className="flex justify-between items-center">
          <form>
            <select
              name=""
              id=""
              className="border border-none bg-transparent outline-none text-[16px] font-medium"
            >
              <option value="">All Accounts</option>
              <option value="">Transfer</option>
              <option value="">Withdrawal</option>
              <option value="">Deposit</option>
            </select>
          </form>

          <div className=" inline-flex lg:hidden border border-[#D0D5DD] w-30 gap-1 bg-white p-2 rounded-md cursor-pointer">
            <Image
              className="text-[#344054]"
              src="/assets/upload-cloud.svg"
              alt="Calendar icon"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#344054]">Export</span>
          </div>
        </div>

        <div className="gap-x-1 flex justify-center mt-4 lg:flex items-center lg:gap-x-4 w-full lg:justify-end ml-auto lg:mt-0">
          <span className="text-sm font-medium text-[#71717A]">
            Select Date Range:
          </span>
          <DateRangePicker onDateChange={handleDateChange} />
          <div className=" hidden lg:inline-flex w-20 border border-[#D0D5DD] lg:w-30 gap-1 bg-white p-2 rounded-md cursor-pointer">
            <Image
              className="text-[#344054]"
              src="/assets/upload-cloud.svg"
              alt="Calendar icon"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#344054]">Export</span>
          </div>
        </div>
      </div>
      <h2 className=" block text-xl font-medium text-[#344054]  py-4 lg:hidden ">
        Transactions
      </h2>
      <div className="">
        <Table
          headers={headers}
          data={filteredTransactions}
          renderRow={(user) => (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.transactionId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.transactionType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.transactionDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                    user.status === "Processed"
                      ? "bg-[#EFFDED] text-[#144909]"
                      : "bg-[#FEECEE] text-[#740613]"
                  }`}
                >
                  {user.status}
                </span>
              </td>
            </>
          )}
        />
        <div className="hidden md:block">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={filteredTransactions.length}
          />
        </div>

        <div className="md:hidden space-y-6">
          {transactions.map((item, index) => {
            return (
              <div key={index} className=" p-4 rounded-lg shadow-sm bg-white">
                <div className="flex justify-between items-center mb-2"></div>
                <div className="text-sm  ">
                  <p className="flex justify-between py-1">
                    <span className="font-medium text-gray-600">Amount:</span>
                    <span>{item.amount}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="font-medium text-gray-600">
                      Transaction Type:
                    </span>
                    <span>{item.transactionType}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="font-medium text-gray-600">Date:</span>
                    <span>{item.transactionDate}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-semibold">
                      {item.status}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
