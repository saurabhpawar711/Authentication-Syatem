import React from "react";

import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => onPageChange(i, totalPages)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {currentPage > 1 && (
          <li onClick={() => onPageChange(currentPage - 1, totalPages)}>
            &laquo;
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <li onClick={() => onPageChange(currentPage + 1, totalPages)}>
            &raquo;
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
