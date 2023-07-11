import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import ForumTopics from './components/ForumTopics/ForumTopics';
import Topic from './components/ForumTopics/Topic/Topic';
import MyPage from './components/MyPage/MyPage';
import FormEditUser from './components/FormEditUser/FormEditUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics" element={<ForumTopics />} />
      <Route path="/topic" element={<Topic />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/edit-user" element={<FormEditUser />} />
    </Routes>
  );
}

export default App;
