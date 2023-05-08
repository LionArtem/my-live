import React from 'react';

import { Routes, Route } from 'react-router-dom';

//import { useSelector, useDispatch } from 'react-redux';
//import { fetchMessageAll } from './redax/slices/messageSlice';
import //fetchPaginationPage,
//selectPagination,
'./redax/slices/paginationSlice';
import Forum from './components/Forum/Forum';
import Home from './components/Home/Home';
import ForumTopics from './components/ForumTopics/ForumTopics';

function App() {
  //const { pageNumber } = useSelector(selectPagination);
  //const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchMessageAll());
  // }, []);

  // React.useEffect(() => {
  //   dispatch(fetchPaginationPage(pageNumber));
  // }, [pageNumber]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics" element={<ForumTopics />} />
      {/* <Route path="/topics" element={<Forum />} /> */}
    </Routes>
  );
}

export default App;
