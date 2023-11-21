import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import ForumTopics from './components/ForumTopics/ForumTopics';
import Topic from './components/ForumTopics/Topic/Topic';
import MyPage from './components/MyPage/MyPage';
import FormEditUser from './components/FormEditUser/FormEditUser';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './redax/slices/authSlice';
import PageAdmin from './components/Pages/PageAdmin/PageAdmin';
import ListUser from './components/Pages/ListUsers/ListUsers';

import { selectUser, fetchGetUser } from './redax/slices/userSlice';

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector(selectAuth);
  const { admin } = useSelector(selectUser);

  React.useEffect(() => {
    if (token) {
      dispatch(fetchGetUser(token));
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics" element={<ForumTopics />} />
      <Route path="/topic" element={<Topic />} />
      <Route path="/my-page" element={token ? <MyPage /> : <Home />} />
      <Route path="/edit-user" element={token ? <FormEditUser /> : <Home />} />
      <Route path="/admin" element={admin ? <PageAdmin /> : <Home />} />
      <Route path="/list-user" element={<ListUser />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
