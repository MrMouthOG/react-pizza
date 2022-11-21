import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export function Pagination({ value, onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={value - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
