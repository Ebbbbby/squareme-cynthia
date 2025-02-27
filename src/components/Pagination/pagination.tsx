"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage = 10,
}) => {
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    pageNumbers.push(1);
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pageNumbers.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2">
      <div className="text-sm text-gray-600 mb-2 sm:mb-0">
        Showing {startResult} to {endResult} of {totalResults} results
      </div>

      <div className="flex items-center space-x-1">
        <button
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Previous page"
        >
          <span aria-hidden="true">&lt;</span>
        </button>

        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ) : (
              <span className="px-2 text-gray-500">...</span>
            )}
          </React.Fragment>
        ))}

        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          aria-label="Next page"
        >
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
