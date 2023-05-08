import React from 'react';

import Header from '../Header/Header';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
      <div className="page">
        <header className="">
          <Header />
        </header>
        <main>
          <ul>
            <li>
              <Link to="/topics">
                <h2>Форум</h2>
              </Link>
            </li>
          </ul>
        </main>
        <footer>
          <p>ArtemGreen</p>
        </footer>
      </div>
  );
}
