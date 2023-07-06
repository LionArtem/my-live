import React from 'react';

import MyLoader from '../MessageUser/sceleton';
import Form from '../Form/Form';
import Topic from '../MessageUser/MessageUser';
import Pagination from '../Pagination/Pagination';

import { useSelector } from 'react-redux';
import { selectMessage } from '../../redax/slices/messageSlice';
import { selectPagination } from '../../redax/slices/paginationSlice';

export default function Forum() {
  const { messagePage } = useSelector(selectMessage);
  const { isAddPage } = useSelector(selectPagination);
  return (
    <>
      {' '}
      <section>
        {/* {[...new Array(10)].map((_, i) => (
    <MyLoader key={i} />
  ))} */}
        {isAddPage
          ? [...new Array(6)].map((_, i) => <MyLoader key={i} />)
          : messagePage.map((obj, i) => <Topic key={i} text={obj} />)}
      </section>
      <section>{messagePage.length < 10 && <Form />}</section>
      <section>
        <Pagination />
      </section>
    </>
  );
}
