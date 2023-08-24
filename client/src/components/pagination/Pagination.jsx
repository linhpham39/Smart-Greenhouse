import React from "react";
import "./pagination.scss";
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {currentPage > 1 &&
        <span
          className={`page-arrow ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &#60; {/* Left arrow */}
        </span>
      }
      <span className="page-number">{currentPage}</span>
      {currentPage < totalPages &&
        <span
          className={`page-arrow ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &#62; {/* Right arrow */}
        </span>
      }
    </div>
  );
};

export default Pagination;
