import React from "react";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const getPagesArray = () => {
    let res = [];
    for(let i = 0; i < totalPages; i++) {
      res.push(i + 1);
    }
    return res;
  }
  console.log(getPagesArray());

  return (
    <div className="pagination">
      {/* <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button> */}
      {getPagesArray().map(page => 
        <span 
          onClick={() => setCurrentPage(page)}
          key={page} 
          className={currentPage === page ? `page page-current` : `page`}>
          {page}
        </span>  
      )}
    </div>
  );
}

export default Pagination;
