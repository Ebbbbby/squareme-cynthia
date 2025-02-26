"use client";

import React, { useState } from "react";
type TableProps<T> = {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number, isSelected: boolean) => React.ReactNode;
  onSelectAll?: (isSelected: boolean) => void;
  onSelectRow?: (item: T, isSelected: boolean) => void;
};

const Table = <T,>({
  headers,
  data,
  renderRow,
  onSelectAll,
  onSelectRow,
}: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Set<T>>(new Set());


  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.checked;
    if (isSelected) {
      setSelectedRows(new Set(data));
    } else {
      setSelectedRows(new Set());
    }
    onSelectAll?.(isSelected);
  };

  const handleSelectRow = (item: T, e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.checked;
    const newSelectedRows = new Set(selectedRows);
    if (isSelected) {
      newSelectedRows.add(item);
    } else {
      newSelectedRows.delete(item);
    }
    setSelectedRows(newSelectedRows);
    onSelectRow?.(item, isSelected);
  };

  return (
    <div className=" border border-none overflow-x-auto w-full lg:border border-[#EDEDF] mt-8 rounded-lg">
      <table className=" bg-white border border-gray-200 w-full md:table hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={selectedRows.size === data.length && data.length > 0}
                onChange={handleSelectAll}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
            </th>

            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => {
            const isSelected = selectedRows.has(item);
            return (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition-colors ${
                  isSelected ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleSelectRow(item, e)}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                </td>
                {renderRow(item, index, isSelected)}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Table */}

    </div>
  );
};

export default Table;
