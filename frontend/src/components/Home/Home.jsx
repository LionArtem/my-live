import React from 'react';

import { useSelector } from 'react-redux';
import { selectAuth } from '../../redax/slices/authSlice';

import Header from '../Header/Header';
import Authorization from '../Authorization/Authorization';
import AuthorizedUser from '../AuthorizedUser/AuthorizedUser';
import MenuApp from './MenuApp/MenuApp';

export default function Home() {
  const { auth } = useSelector(selectAuth);

  return (
    <div className="page">
      <header className="">
        <Header />
      </header>
      <main>
        <section>{auth ? <AuthorizedUser /> : <Authorization />}</section>
        <section>
          <MenuApp />
        </section>
      </main>
      <footer>
        <p>ArtemGreen</p>
      </footer>
    </div>
  );
}
