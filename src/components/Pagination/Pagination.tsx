// Pagination.tsx

import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import'./Pagination.scss'

type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
      <BootstrapPagination>
        <BootstrapPagination.Prev
          onClick={onPrevPage}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <BootstrapPagination.Item
            key={pageNumber + 1}
            active={pageNumber + 1 === currentPage}
            onClick={() => handlePageClick(pageNumber + 1)}
          >
            {pageNumber + 1}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
  );
};
