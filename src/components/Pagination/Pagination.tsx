import { Button } from '@mui/material';
import React from 'react';
import { PaginationProps } from '../../types';

/** Pagination component.
 * Renders number on buttons based on the length of items array and items per page value.
 * */

const Pagination = ({ items, itemsPerPage, currentPage, setCurrentPage }: PaginationProps) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginationLinks = [];

  for (let i = 1; i <= totalPages; i += 1) {
    paginationLinks.push(
      <Button
        key={i}
        aria-current={currentPage === i}
        onClick={() => setCurrentPage(i)}
        className={`button ${currentPage === i ? 'active' : ''}`}
        variant="contained"
      >
        {i}
      </Button>,
    );
  }
  return <div className="pagination">{paginationLinks}</div>;
};

export default Pagination;
