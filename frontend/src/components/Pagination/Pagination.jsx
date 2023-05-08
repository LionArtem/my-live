import React from 'react';

import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

import { selectPagination, setPageNumber } from '../../redax/slices/paginationSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Pagination() {
  const dispatch = useDispatch();
  const { pageNumber, numberOfAllPages } = useSelector(selectPagination);

  const onChangePage = (number) => {
    dispatch(setPageNumber(number));
  };

  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={numberOfAllPages}
        forcePage={pageNumber - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
