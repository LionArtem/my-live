import React from 'react';

import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Authorization from '../Authorization/Authorization';
import AuthorizedUser from '../AuthorizedUser/AuthorizedUser';

export default function Home() {
  console.log(localStorage.getItem('token'));
  return (
    <div className="page">
      <header className="">
        <Header />
      </header>
      <main>
        <section>
          {localStorage.getItem('token') ? (
            <AuthorizedUser />
          ) : (
            <Authorization />
          )}
        </section>
        <section>
          <ul>
            <li>
              <Link to="/topics">
                <h2>Форум</h2>
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <p>ArtemGreen</p>
      </footer>
    </div>
  );
}
