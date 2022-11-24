import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  value: number;
  onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ value, onChangePage }) => {
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
    />
  );
}

export default Pagination;
